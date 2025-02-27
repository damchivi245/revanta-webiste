import { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const centerDefault = { lat: 10.762622, lng: 106.660172 }; // Mặc định (TP.HCM)

export default function LocationMap() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_API_KEY",
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Lỗi khi lấy vị trí:", error);
        }
      );
    }
  }, []);

  if (!isLoaded) return <p>Đang tải bản đồ...</p>;

  return (
    <div>
      <h2 className="mb-2 text-lg font-bold">Vị trí của bạn:</h2>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={location || centerDefault}
        zoom={15}
      >
        {location && <Marker position={location} />}
      </GoogleMap>
    </div>
  );
}
