import React, { useState, useEffect } from 'react';
import { addMonths, format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isBefore, isSameDay, addDays } from 'date-fns';
import { loadStripe } from '@stripe/stripe-js';
import '../../styles/Calendar.css';

// Initialize Stripe
const stripePromise = loadStripe('YOUR_PUBLISHABLE_KEY'); // Replace with your Stripe publishable key

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [reservedDates, setReservedDates] = useState([
    // przykładowe zarezerwowane daty
    new Date(2025, 3, 10), // Zarezerwowane na 10 kwietnia
    new Date(2025, 3, 20),
    new Date(2025, 3, 24),
    new Date(2025, 3, 27),
    new Date(2025, 3, 29), // Zarezerwowane na 20 kwietnia
  ]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMonthChange = (direction) => {
    setCurrentMonth((prevMonth) => addMonths(prevMonth, direction));
  };

  const getDaysInMonth = (month) => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    return eachDayOfInterval({ start, end });
  };

  const isDateReserved = (date) => {
    return reservedDates.some((reservedDate) =>
      isSameDay(reservedDate, date)
    );
  };

  const isCurrentMonth = (date) => {
    return isSameMonth(date, currentMonth);
  };

  const isToday = (date) => {
    return isSameDay(date, new Date());
  };

  const isDateAvailableForBooking = (date) => {
    const today = new Date();
    const twoDaysFromNow = addDays(today, 2);
    return !isBefore(date, twoDaysFromNow) && !isDateReserved(date);
  };

  const handleDateClick = (date) => {
    if (isDateAvailableForBooking(date)) {
      setSelectedDate(date);
      setShowPaymentModal(true);
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // Create a payment intent on your server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 10000, // Amount in cents (100zł = 10000 cents)
          date: selectedDate.toISOString(),
        }),
      });

      const { clientSecret } = await response.json();

      // Initialize Stripe
      const stripe = await stripePromise;

      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements: {
          clientSecret,
        },
        confirmParams: {
          return_url: window.location.origin + '/payment-success',
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      // If payment is successful, add the date to reserved dates
      if (paymentIntent.status === 'succeeded') {
        setReservedDates(prev => [...prev, selectedDate]);
        setShowPaymentModal(false);
        setSelectedDate(null);
        alert('Płatność zakończona pomyślnie! Termin został zarezerwowany.');
      }
    } catch (error) {
      alert(`Wystąpił błąd podczas przetwarzania płatności: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => handleMonthChange(-1)}>&lt;</button>
        <h3>{format(currentMonth, 'MMMM yyyy')}</h3>
        <button onClick={() => handleMonthChange(1)}>&gt;</button>
      </div>

      <div className="calendar-body">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="calendar-day">{day}</div>
        ))}
        {getDaysInMonth(currentMonth).map((date) => (
          <div
            key={date}
            className={`calendar-day ${
              isCurrentMonth(date) ? 'current-month' : 'other-month'
            } ${isDateReserved(date) ? 'reserved' : ''} ${
              isDateAvailableForBooking(date) ? 'available' : ''
            } ${isToday(date) ? 'today' : ''}`}
            onClick={() => handleDateClick(date)}
          >
            {format(date, 'd')}
          </div>
        ))}
      </div>

      <div className="calendar-legend">
        <div>
          <span className="reserved"></span> Zarezerwowany
        </div>
        <div>
          <span className="available"></span> Wolny
        </div>
        <div>
          <span className="today-legend"></span> Obecny dzień
        </div>
      </div>

      <div className="reservation-info">
        Możliwość rezerwacji terminu po wpłacie zaliczki wynoszącej 100zł.
        Rezerwacje dostępne są z minimum 2-dniowym wyprzedzeniem.
      </div>

      {showPaymentModal && (
        <div className="payment-modal">
          <div className="payment-modal-content">
            <h3>Potwierdzenie rezerwacji</h3>
            <p>Data: {format(selectedDate, 'dd/MM/yyyy')}</p>
            <p>Kwota do zapłaty: 100zł</p>
            <div className="payment-buttons">
              <button 
                onClick={handlePayment} 
                className="pay-button"
                disabled={isProcessing}
              >
                {isProcessing ? 'Przetwarzanie...' : 'Zapłać'}
              </button>
              <button 
                onClick={() => setShowPaymentModal(false)} 
                className="cancel-button"
                disabled={isProcessing}
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
