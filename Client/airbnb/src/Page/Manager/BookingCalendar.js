import React from 'react';
import { Badge, Calendar, Divider } from 'antd';
import { useState } from 'react';
import { localStorageService } from '../../services/localStorageService';
import { userService } from '../../services/userService';
import { useEffect } from 'react';

const BookingCalendar = () => {
  const [idUser,setIdUser] = useState(localStorageService.get('USER')?.userDTO.id)
  const [dateBooking,setDateBooking] = useState([])
  useEffect(() => { 
    userService.getDateBooking(idUser).then((res) => {
            console.log(res);
            setDateBooking(res.data)
          })
          .catch((err) => {
            console.log(err);
          });
    },[])

  const dateFullCellRender = (date) => {
    const bookings = dateBooking.map((room) => {
      const roomBookingsOnDate = room.dayBookings?.filter((booking) => {
        const startDate = new Date(booking?.startDate);
        startDate.setDate(startDate.getDate() - 1);
        const endDate = new Date(booking?.endDate);
        const selectedDate = new Date(date);
        return selectedDate >= startDate && selectedDate <= endDate;
      });

      return {
        roomNumber: room?.name,
        bookings: roomBookingsOnDate,
      };
    });

    const bookingList = bookings.map((room) => {
      if (room.bookings.length > 0) {
        return (
          <div key={room.roomNumber}>
            <Badge status='success' text={`Room ${room.roomNumber}`} style={{ borderBottom: "1.5px solid lightgray", width: "100%"}} />
          </div>
        );
      }

      return null;
    });

    return (
      <div>
        {bookingList}
      </div>
    );
  };

  return (
    <div>
      <Calendar dateCellRender={dateFullCellRender} />
    </div>
  );
};

export default BookingCalendar;