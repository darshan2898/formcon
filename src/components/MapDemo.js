import React from "react";
import GoogleMapReact from "google-map-react";

import KEY from "../apiKey";

const MapDemo = () => {
  const cords = {
    lat: 59.95,
    lng: 30.33,
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: KEY }}
        defaultCenter={cords}
        defaultZoom={11}
      >
        {/* <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          /> */}
      </GoogleMapReact>
    </div>
  );
};

export default MapDemo;
