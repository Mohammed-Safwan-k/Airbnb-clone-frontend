import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";

const Account = () => {
  const { ready, user } = useContext(UserContext);

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div>
      <nav>
        <Link to={"/account/bookings"}>My Bookings</Link>
        <Link to={"/account/places"}>My Accommodations</Link>
      </nav>
    </div>
  );
};

export default Account;
