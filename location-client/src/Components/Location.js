//Shows location for given IP address
import React, { useState } from "react";
import { getLocation } from "./LocationServices";
import { GoLocation } from "react-icons/go";
import { FaMapPin } from "react-icons/fa";
import TextInput from "./FormInput";
import Button from "./Button";
import "./location.scss";
import {
  LOCATION_BUTTON,
  LOCATION_HEADER,
  LOCATION_IP,
  LOCATION_LATITUDE,
  LOCATION_LONGITUDE,
  LOCATION_VALID_ERROR,
} from "./Constants/main";
import Loader from "./Loader";

export default function MyLocation() {
  const [inputVal, setInputVal] = useState();
  const [geoInfo, setGeoInfo] = useState();
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const ValidateIPaddress = (ip) => {
    let regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (regex.test(ip)) {
      return true;
    }

    return false;
  };

  const handleClick = async (e) => {
    e.preventDefault(); // to prevent rerender after submit
    //validate ip format
    try {
      setLoading(true);
      let isIpValid = ValidateIPaddress(inputVal);
      if (isIpValid) {
        //Call api to get data
        setShowError(false);
        const geoInfo = await getLocation(inputVal);
        setLoading(false);
        setGeoInfo(geoInfo);
      } else {
        setLoading(false);
        setShowError(true); //to show error if ip is invalid
      }
    } catch (error) {
      //TODO make a reusabable toast in future
      setLoading(false);
      alert(error);
    }
  };
  const handleChange = (inputValue) => {
    setInputVal(inputValue);
    setGeoInfo();
    setShowError(false);
  };
  if (loading) return <Loader />;
  return (
    <div className="location">
      <div className="location__Container">
        <GoLocation size={70} />
        <h1 className="location__Header">{LOCATION_HEADER}</h1>
        <form className="location__form" onSubmit={handleClick}>
          <label>
            {LOCATION_IP}:
            <TextInput
              type="text"
              name="ip"
              onChange={handleChange}
              data-testid="textInput"
            ></TextInput>
            {showError && (
              <p data-testid="invalidError" className="location__form__error">
                {LOCATION_VALID_ERROR}
              </p>
            )}
          </label>

          <Button
            type="submit"
            data-testid="findLocationBtn"
            size="md"
            variant="info"
          >
            {LOCATION_BUTTON}
          </Button>
        </form>
      </div>
      {geoInfo && (
        <div data-testid="locationBlock">
          <FaMapPin size={28} />
          <h3>
            {LOCATION_LATITUDE}: {geoInfo.location.latitude}
          </h3>
          <h3>
            {LOCATION_LONGITUDE}: {geoInfo.location.longitude}
          </h3>
        </div>
      )}
    </div>
  );
}
