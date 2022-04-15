import React from "react";
import { FaSpinner } from "react-icons/fa";
import { LOCATION_FETCHING } from "./Constants/main";
import "./Loader.scss";

export default function Loader() {
  return (
    <div>
      <h1 className="header">{LOCATION_FETCHING}</h1>
      <FaSpinner icon="spinner" size={56} className="spinner" />
    </div>
  );
}
