import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";

const LocationMarker = ({ setCoordinates, setAddress }) => {
  const [position, setPosition] = useState(null);

  const reverseGeocode = async (lat, lng) => {
    try {

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );

      const data = await res.json();

      if (data.display_name) {
        setAddress(data.display_name);
      }

    } catch (err) {
      console.log("Geocode error", err);
    }
  };

  useMapEvents({
    async click(e) {

      const { lat, lng } = e.latlng;

      setPosition([lat, lng]);

      setCoordinates({
        type: "Point",
        coordinates: [lng, lat] // Mongo format
      });

      await reverseGeocode(lat, lng);
    }
  });

  return position ? <Marker position={position} /> : null;
};

const LocationPicker = ({ setCoordinates, setAddress }) => {

  return (
    <MapContainer
      center={[19.076, 72.8777]}
      zoom={12}
      style={{ height: "300px", width: "100%" }}
      className="rounded-lg"
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker
        setCoordinates={setCoordinates}
        setAddress={setAddress}
      />
    </MapContainer>
  );
};

export default LocationPicker;