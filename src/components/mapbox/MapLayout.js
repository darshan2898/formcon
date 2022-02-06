import React from "react";
import UsersListBar from "./UsersListBar";
import GoogleMapReact from "google-map-react";
import { ImLocation } from "react-icons/im";
import { useGlobalContext } from "../../context/context";

import KEY from "../../apiKey";

const MapLayout = () => {
  const { isAddress } = useGlobalContext();

  const baseCords = {
    lat: 19.07609,
    lng: 72.877426,
  };

  return (
    <div className="map_layout">
      <div className="map_container">
        <div className="map">
          <UsersListBar />
          <div className="i_map">
            <GoogleMapReact
              bootstrapURLKeys={{ key: KEY }}
              defaultCenter={baseCords}
              center={{
                lat: isAddress
                  ? Number(isAddress.geo.lat)
                  : Number(baseCords.lat),
                lng: isAddress
                  ? Number(isAddress.geo.lng)
                  : Number(baseCords.lng),
              }}
              defaultZoom={1}
              margin={[50, 50, 50, 50]}
              onChange={(e) => {
                if (isAddress) {
                  e.center.lat = Number(isAddress.geo.lat);
                  e.center.lng = Number(isAddress.geo.lng);
                } else {
                  return;
                }
              }}
            >
              <div
                className="marker"
                lat={
                  isAddress ? Number(isAddress.geo.lat) : Number(baseCords.lat)
                }
                lng={
                  isAddress ? Number(isAddress.geo.lng) : Number(baseCords.lng)
                }
              >
                <ImLocation />
              </div>
            </GoogleMapReact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapLayout;
