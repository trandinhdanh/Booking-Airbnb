import React from 'react';
import { Badge, Calendar } from 'antd';

const BookingCalendar = () => {
  const roomBookings = [
    {
      roomNumber: 101,
      bookings: [
        {
          start: '2023-06-27T10:30:00',
          end: '2023-06-30T12:30:00',
        },
        {
          start: '2023-06-03T09:00:00',
          end: '2023-06-04T11:00:00',
        },
      ],
    },
    {
      roomNumber: 102,
      bookings: [
        {
          start: '2023-06-25T14:00:00',
          end: '2023-06-27T16:00:00',
        },
      ],
    },
  ];

  const dateFullCellRender = (date) => {
    const bookings = roomBookings.map((room) => {
      const roomBookingsOnDate = room.bookings.filter((booking) => {
        const startDate = new Date(booking.start);
        startDate.setDate(startDate.getDate() - 1);
        const endDate = new Date(booking.end);
        const selectedDate = new Date(date);
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