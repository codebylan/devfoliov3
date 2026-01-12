'use client';

import { createContext, useContext, useState } from 'react';
import BookingWidget from '../components/sections/BookingWidget';

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openBookingModal = () => {
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
  };

  return (
    <BookingContext.Provider value={{ openBookingModal, closeBookingModal }}>
      {children}
      <BookingWidget isOpen={isModalOpen} onClose={closeBookingModal} />
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
