package com.techpower.airbnb.service.impl;

import com.techpower.airbnb.constant.Order;
import com.techpower.airbnb.constant.PaymentMethod;
import com.techpower.airbnb.converter.OrderConverter;
import com.techpower.airbnb.dto.OrderDTO;
import com.techpower.airbnb.entity.OrderEntity;
import com.techpower.airbnb.entity.RoomEntity;
import com.techpower.airbnb.entity.StatisticalEntity;
import com.techpower.airbnb.entity.UserEntity;
import com.techpower.airbnb.repository.OrderRepository;
import com.techpower.airbnb.repository.RoomRepository;
import com.techpower.airbnb.repository.StatisticalRepository;
import com.techpower.airbnb.repository.UserRepository;
import com.techpower.airbnb.service.EmailSender;
import com.techpower.airbnb.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Service
public class OrderService implements IOrderService {

    @Value("${email.admin}")
    private String emailAdmin;

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderConverter orderConverter;
    @Autowired
    private EmailSender emailSender;
    @Autowired
    private StatisticalRepository statisticalRepository;

    @Override
    public OrderDTO createOrder(OrderDTO orderDTO, long idRoom) {
        if (orderDTO.getNumGuests() > roomRepository.findOneById(idRoom).getMaxGuests()) {
            return null;
        }
        orderDTO.setStatus(Order.BOOKED.toString());
        int numDate = countDate(orderDTO.getReceivedDate(), orderDTO.getCheckoutDate());
        RoomEntity roomEntity = roomRepository.findOneById(idRoom);
        double totalPrice = numDate * roomEntity.getPrice();
        OrderEntity orderEntity = orderConverter.mapperTOEntity(
                orderDTO,
                userRepository.findOneById(orderDTO.getIdUser()),
                roomEntity);
        orderEntity.setTotalPrice(totalPrice);
        orderEntity.setPaymentMethod(PaymentMethod.CASH);

        OrderDTO result = orderConverter.apply(orderRepository.save(orderEntity));

        if (result != null) {
            String to = userRepository.findOneById(orderDTO.getIdUser()).getEmail();
            emailSender.send(to, buildHtml(
                    userRepository.findOneById(orderDTO.getIdUser()).getName(),
                    result,
                    roomEntity.getName(),
                    roomEntity.getAddress().getFullAddress()
            ), "XÁC NHẬN ĐẶT PHÒNG");
        }

        return result;
    }

    private int countDate(LocalDate start, LocalDate end) {
        long daysBetween = ChronoUnit.DAYS.between(start, end);
        return Math.abs((int) daysBetween);
    }

    @Override
    public OrderDTO updateStatus(Order orderStatus, long idOrder) {
        OrderEntity orderEntity = orderRepository.findOneById(idOrder);
        switch (orderStatus) {
            case CANCEL, CONFIRM:
                if (orderEntity.getStatus().equals(Order.BOOKED)) {
                    orderEntity.setStatus(orderStatus);
                }
                break;
            case CHECK_IN:
                if (orderEntity.getStatus().equals(Order.CONFIRM)) {
                    orderEntity.setStatus(orderStatus);
                }
                break;
            case CHECK_OUT:
                if (orderEntity.getStatus().equals(Order.CHECK_IN)) {
                    orderEntity.setStatus(orderStatus);
                    //xử lí thống kê
                    UserEntity userEntityAdmin = userRepository.findOneByEmail(emailAdmin);
                    UserEntity userEntitySeller = orderEntity.getRoom().getUser();
                    if (statisticalRepository.findOneByUserAndYearAndMonth(
                            userEntityAdmin, LocalDate.now().getYear(), LocalDate.now().getMonthValue()) == null) {
                        statisticalRepository.save(new StatisticalEntity(userEntityAdmin));
                    }
                    if (statisticalRepository.findOneByUserAndYearAndMonth(
                            userEntitySeller, LocalDate.now().getYear(), LocalDate.now().getMonthValue()) == null) {
                        statisticalRepository.save(new StatisticalEntity(userEntitySeller));
                    }
                    StatisticalEntity statisticalAdmin = statisticalRepository.findOneByUserAndYearAndMonth(
                            userEntityAdmin, LocalDate.now().getYear(), LocalDate.now().getMonthValue()
                    );
                    StatisticalEntity statisticalSeller = statisticalRepository.findOneByUserAndYearAndMonth(
                            userEntitySeller, LocalDate.now().getYear(), LocalDate.now().getMonthValue()
                    );
                    statisticalAdmin.setReallyReceived(statisticalAdmin.getReallyReceived() + (orderEntity.getTotalPrice() * 0.1));
                    statisticalAdmin.setTotalRevenue(statisticalAdmin.getTotalRevenue() + (orderEntity.getTotalPrice() * 0.1));
                    statisticalSeller.setReallyReceived(statisticalSeller.getReallyReceived() + (orderEntity.getTotalPrice() * 0.9));
                    statisticalSeller.setTotalRevenue(statisticalSeller.getTotalRevenue() + orderEntity.getTotalPrice());
                }
                break;
            default:
                break;
        }
        return orderConverter.apply(orderRepository.save(orderEntity));
    }

    @Override
    public void updatePaymentMethod(PaymentMethod paymentMethod, long idOrder) {
        OrderEntity orderEntity = orderRepository.findOneById(idOrder);
        orderEntity.setPaymentMethod(paymentMethod);
        orderRepository.save(orderEntity);
    }

    @Override
    public void freeUpdateStatus(Order order, long idOrder) {
        OrderEntity orderEntity = orderRepository.findOneById(idOrder);
        orderEntity.setStatus(order);
        orderRepository.save(orderEntity);
    }

    private String buildHtml(String name, OrderDTO orderDTO, String nameRoom, String addressRoom) {
        return "<div style=\"text-align: center; margin: 0 auto; max-width: 600px; padding: 20px; border: 1px solid #ccc; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">\n" +
                "  <img src=\"https://res.cloudinary.com/drn7nawnc/image/upload/v1687899742/unnamed_gssfpv.png\" alt=\"Logo\" style=\"max-width: 50%;\">\n" +
                "  <h2 style=\"font-size: 24px; margin-bottom: 10px;\">Hi " + name + ",</h2>" +
                "<p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you for trusting our service, below is the information about your order </p>" +
                "<table style=\"width:100%; margin-bottom: 20px; border-collapse: collapse;\">\n" +
                "  <tr>\n" +
                "    <th style=\"text-align: left; border: 1px solid #ccc; color: darkblue; padding: 8px;\">Your destination</th>\n" +
                "    <td style=\"border: 1px solid #ccc; padding: 8px;\">" + nameRoom + "</td>\n" +
                "  </tr>\n" +
                "  <tr>\n" +
                "    <th style=\"text-align: left; border: 1px solid #ccc; color: darkblue; padding: 8px;\">Address</th>\n" +
                "    <td style=\"border: 1px solid #ccc; padding: 8px;\">" + addressRoom + "</td>\n" +
                "  </tr>\n" +
                "  <tr>\n" +
                "    <th style=\"text-align: left; border: 1px solid #ccc; color: darkblue; padding: 8px;\">Received Date</th>\n" +
                "    <td style=\"border: 1px solid #ccc; padding: 8px;\">" + orderDTO.getReceivedDate() + "</td>\n" +
                "  </tr>\n" +
                "  <tr>\n" +
                "    <th style=\"text-align: left; border: 1px solid #ccc; color: darkblue; padding: 8px;\">Checkout Date</th>\n" +
                "    <td style=\"border: 1px solid #ccc; padding: 8px;\">" + orderDTO.getCheckoutDate() + "</td>\n" +
                "  </tr>\n" +
                "  <tr>\n" +
                "    <th style=\"text-align: left; border: 1px solid #ccc; color: darkblue; padding: 8px;\">Num Guests</th>\n" +
                "    <td style=\"border: 1px solid #ccc; padding: 8px;\">" + orderDTO.getNumGuests() + " people" + "</td>\n" +
                "  </tr>\n" +
                "  <tr>\n" +
                "    <th style=\"text-align: left; border: 1px solid #ccc; color: darkblue; padding: 8px;\">Total Price</th>\n" +
                "    <td style=\"border: 1px solid #ccc; padding: 8px;\">" + orderDTO.getTotalPrice() + " VND" + "</td>\n" +
                "  </tr>\n" +
                "</table>" +
                "<p style=\"font-size: 16px; margin-bottom: 20px;\">Thank you and have a great trip</p>" +
                "</div>";
    }


}
