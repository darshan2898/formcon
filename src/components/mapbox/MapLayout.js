import React from "react";
import UsersListBar from "./UsersListBar";

const MapLayout = () => {
  return (
    <div className="map_layout">
      <div className="map_container">
        <div className="map">
          <UsersListBar />
          <iframe src="https://maps.google.com/maps?width=100%25&amp;height=100%25&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
        </div>
      </div>
    </div>
  );
};

export default MapLayout;
