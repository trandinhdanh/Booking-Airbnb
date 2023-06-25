import React from 'react';
import { Badge, Calendar } from 'antd';
import moment from 'moment';

const BookingCalendar = () => {
  const roomBookings = [
    {
      roomNumber: 101,
      bookings: [
        {
          start: moment('2023-06-27T10:30:00'),
          end: moment('2023-06-30T12:30:00'),
        },
        {
          start: moment('2023-06-03T09:00:00'),
          end: moment('2023-06-04T11:00:00'),
        },
      ],
    },
    {
      roomNumber: 102,
      bookings: [
        {
          start: moment('2023-06-23T14:00:00'),
          end: moment('2023-06-27T16:00:00'),
        },
      ],
    },
  ];

  const dateFullCellRender = (date) => {
    const bookings = roomBookings.map((room) => {
      const roomBookingsOnDate = room.bookings.filter((booking) => {
        const startDate = booking.start.clone().subtract(1, 'day').toDate();
        const endDate = booking.end.toDate();
        const selectedDate = date.toDate();
        return selectedDate >= startDate && selectedDate <= endDate;
      });

      return {
        roomNumber: room.roomNumber,
        bookings: roomBookingsOnDate,
      };
    });

    const bookingList = bookings.map((room) => {
      if (room.bookings.length > 0) {
        return (
          <div key={room.roomNumber}>
            <Badge status='success' text={`Room ${room.roomNumber}`} />
            <ul>
              {room.bookings.map((booking,index) => (
                <li key={booking.start.toString()}>
                  {booking.start.format('h:mm a')} - {booking.end.format('h:mm a')}
                </li>
              ))}
            </ul>
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