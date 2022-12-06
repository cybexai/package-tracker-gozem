import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  GoogleMap,
  useJsApiLoader,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";

const containerStyle = {
  width: "500px",
  height: "450px",
};

function CustomMapContainer({ data, currentLocation }) {
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const markers = [
    {
      name: "Package Source",
      position: data?.package?.from_location
    },
    {
      name: "Destination",
      position: data?.package?.to_location
    },
    {
      name: "Current Location",
      position: currentLocation
    },
  ];

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBc_Tc8TDDfw3itIs_d6exscyzQrYV3vPA",
  });

  return (
    <Box>
      {isLoaded && markers.length ? (
        <GoogleMap
          onLoad={handleOnLoad}
          onClick={() => setActiveMarker(null)}
          mapContainerStyle={containerStyle}
          zoom={15}
        >
          {markers.map(({ name, position }) => (
            <Marker
              key={name}
              position={position}
              onClick={() => handleActiveMarker(name)}
            >
              {activeMarker === name ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div>{name}</div>
                </InfoWindow>
              ) : null}
            </Marker>
          ))}
        </GoogleMap>
      ) : (
        <></>
      )}
    </Box>
  );
}

CustomMapContainer.propTypes = {};

export default CustomMapContainer;
