import React, { useState, useEffect } from 'react';
import { addMonths, format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isBefore, isSameDay, addDays } from 'date-fns';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../../styles/Calendar.css';

// Initialize Stripe
const stripePromise = loadStripe('pk_live_51RCR9CFR5LRldyqLbwbAg9b1Oq9ad2qIQNBk3cbReJGX2TSdseC124jqRfjD3rfhdH3b4HLqICPmXMNZ6gjuF7fr00j6bP5uaX');

const PaymentForm = ({ amount, onSuccess, onCancel }) => {
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: {
          number: elements.getElement(CardNumberElement),
          exp_month: elements.getElement(CardExpiryElement),
          exp_year: elements.getElement(CardExpiryElement),
          cvc: elements.getElement(CardCvcElement),
        },
      });

      if (error) {
        setError(error.message);
        setProcessing(false);
        return;
      }

      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: amount,
        }),
      });

      const result = await response.json();

      if (result.error) {
        setError(result.error);
        setProcessing(false);
        return;
      }

      const { error: confirmError } = await stripe.confirmCardPayment(
        result.clientSecret
      );

      if (confirmError) {
        setError(confirmError.message);
        setProcessing(false);
        return;
      }

      onSuccess();
    } catch (err) {
      setError('An unexpected error occurred.');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="form-row">
        <label>Numer karty</label>
        <div className="stripe-element-wrapper">
          <CardNumberElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>

      <div className="form-row">
        <label>Data ważności</label>
        <div className="stripe-element-wrapper">
          <CardExpiryElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>

      <div className="form-row">
        <label>Kod CVC</label>
        <div className="stripe-element-wrapper">
          <CardCvcElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="submit-button"
      >
        {processing ? 'Przetwarzanie...' : `Zapłać ${amount} zł`}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="cancel-button"
      >
        Anuluj
      </button>
    </form>
  );
};

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

  const handlePaymentSuccess = () => {
    setReservedDates(prev => [...prev, selectedDate]);
    setShowPaymentModal(false);
    setSelectedDate(null);
    alert('Płatność zakończona pomyślnie! Termin został zarezerwowany.');
  };

  return (
    <div className="calendar-container" style={{ position: 'relative' }}>
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
            <Elements stripe={stripePromise}>
              <PaymentForm 
                amount={100}
                onSuccess={handlePaymentSuccess}
                onCancel={() => setShowPaymentModal(false)}
              />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
