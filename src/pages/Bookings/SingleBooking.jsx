import React from "react";
import { useParams } from "react-router-dom";

const SingleBooking = () => {
  const { id } = useParams();
  return <div>single booking : {id}</div>;
};

export default SingleBooking;
