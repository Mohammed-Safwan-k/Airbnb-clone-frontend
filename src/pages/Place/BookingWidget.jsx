import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../components/UserContext";
import ReactDOM from "react-dom";

const BookingWidget = ({ place }) => {
  const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const [isPaypal, setIsPaypal] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  let numberOfNights = 0;
  if ((checkIn, checkOut)) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: numberOfNights * place.price,
          },
        },
      ],
    });
  };
  const onApprove = async (data, actions) => {
    const response = await axios.post("/booking", {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      email,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
    return actions.order.capture();
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} / per Night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check In : </label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check Out : </label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of Guests : </label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Full Name : </label>
            <input
              type="text"
              placeholder="Your Full Name"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Phone Number : </label>
            <input
              type="tel"
              placeholder="Your Mobile number"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
            <label>Email : </label>
            <input
              type="text"
              placeholder="Your Email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>
        )}
      </div>
      {isPaypal ? (
        <PayPalButton
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
        />
      ) : (
        <button onClick={() => setIsPaypal(true)} className="primary mt-4">
          Book This Place{" "}
          {numberOfNights > 0 && (
            <span> for ${numberOfNights * place.price}</span>
          )}
        </button>
      )}
    </div>
  );
};

export default BookingWidget;
