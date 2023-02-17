import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MapLink from "../../components/MapLink";
import PlaceGallery from "../../components/PlaceGallery";
import BookingWidget from "./BookingWidget";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/singlePlace/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      <MapLink>{place.address}</MapLink>
      <PlaceGallery place={place} />
      <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          {/********** description **********/}
          <div className="my-4">
            <h2 className="font-semibold tex2">Description</h2>
            {place.description}
          </div>
          <b>Check-in : </b>
          {place.checkIn} <br />
          <b>Check-out : </b>
          {place.checkOut} <br />
          <b>Max number of Guests : </b>
          {place.maxGuests} <br />
        </div>
        {/********** Booking page **********/}
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold tex2">Extra Info</h2>
        </div>
        <div className="mt-2 mb-4 text-small text-gray-700 leading-5">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
