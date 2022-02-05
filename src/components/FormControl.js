import React, { useState } from "react";
import FormBox from "./formbox/FormBox";
import MapBox from "./mapbox/MapBox";
import { useGlobalContext } from "../context/context";

const FormControl = () => {
  const { mapStatus } = useGlobalContext();

  return (
    <div className="form_control container">
      <FormBox />
      {mapStatus && <MapBox />}
    </div>
  );
};

export default FormControl;
