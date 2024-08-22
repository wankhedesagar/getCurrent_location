import React, { useState } from "react";

const CurrentPosition = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [userAddress, setUserAddress] = useState();

  const [GPSLatitude, setGPSLatitude] = useState();
  const [GPSLongitude, setGPSLongitude] = useState();

  const geo = navigator.geolocation;

  //Get User Current Location
  geo.getCurrentPosition(userCoords);
  function userCoords(position) {
    let userLatitude = position.coords.latitude;
    let useLongitude = position.coords.longitude;
    // console.log("latitude", userLatitude);
    // console.log("longitude", useLongitude);
    setLatitude(userLatitude);
    setLongitude(useLongitude);
  }

  const getUserAddress = async () => {
    let url = `https://api.opencagedata.com/geocode/v1/json?key=6a198316edd64fda86a9eb55432645af&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`;
    const loc = await fetch(url);
    const data = await loc.json();
    console.log("user address", data);
    // console.log("User City: ", data.results[0].components.city === undefined ? data.results[0].components.state_district : "");
    setUserAddress(data.results[0].formatted);
  };

  const handleGetUserAddress = () => {
    getUserAddress();
  };


    //Get User GPS Current Location
    geo.watchPosition(userGPSCoords);
    function userGPSCoords(position) {
      let userGPSLatitude = position.coords.latitude;
      let useGPSLongitude = position.coords.longitude;
      console.log("latitude", userGPSLatitude);
      console.log("longitude", useGPSLongitude);
      setGPSLatitude(userGPSLatitude);
      setGPSLongitude(useGPSLongitude);
    }
  

  return (
    <div className="container">
      <div className="Current_location">
        <h1>Current Location</h1>
        <h2>latitude- {latitude}</h2>
        <h2>longitude- {longitude}</h2>
        <p>user Address- {userAddress}</p>
        <button onClick={handleGetUserAddress}>Get user Address</button>
      </div>
      <div className="gpsTracker">
        <h1>GPS Tracking</h1>
        <h2>Latitude:- {GPSLatitude}</h2>
          <h2>Longitude:- {GPSLongitude}</h2>
      </div>
    </div>
  );
};
export default CurrentPosition;
