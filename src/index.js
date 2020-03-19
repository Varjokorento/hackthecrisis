import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { getCurrentPosition } from "./components/utils";
import Map from "./components/Map";
import TopBar from "./components/TopBar";
import Grid from "@material-ui/core/Grid";
import * as serviceWorker from "./serviceWorker";

const KEY = process.env.API_KEY || "";

const App = () => {
  const [position, setPosition] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [confirmBoxOpen, setConfirmBoxOpen] = useState(false);
  const [mark, setMark] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const geoLocate = async () => {
      try {
        const { coords } = await getCurrentPosition();
        const { latitude, longitude } = coords;
        setPosition([...position, { lat: latitude, lon: longitude }]);
      } catch (error) {
        console.log(error);
      }
    };

    geoLocate();
  }, [position]);

  const placeMarker = position => {
    setMarkers([
      ...markers,
      { user: 0, lat: position[0].lat, lon: position[0].lon }
    ]);
    closeConfirmBox();
  };

  const getLocation = e => {
    openConfirmBox(e.latlng);
  };

  const openConfirmBox = loc => {
    setMark([...mark, { lat: loc.lat, lon: loc.lng }]);
    setConfirmBoxOpen(true);
  };

  const closeConfirmBox = () => {
    setConfirmBoxOpen(false);
    setMark([]);
  };

  const setAddressValue = address => {
    setAddress(address);
  };

  const setCityValue = city => {
    setCity(city);
  };

  const placeMarkerSearch = e => {
    e.preventDefault();
    fetch(
      `http://open.mapquestapi.com/geocoding/v1/address?key=${KEY}&location=${address},${city}`
    )
      .then(response => response.json())
      .then(data => {
        if (data.results[0].locations[0].adminArea5 !== "") {
          setMarkers([
            ...markers,
            {
              user: 0,
              lat: data.results[0].locations[0].latLng.lat,
              lon: data.results[0].locations[0].latLng.lng
            }
          ]);
        }
      });
  };

  return (
    <div className="root">
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <TopBar
            address={address}
            city={city}
            setAddress={setAddressValue}
            setCity={setCityValue}
            placeMarkerSearch={placeMarkerSearch}
          />
        </Grid>
        <Grid item xs={12}>
          <Map
            confirmIsOpen={confirmBoxOpen}
            openConfirmBox={openConfirmBox}
            closeConfirmBox={closeConfirmBox}
            marklocation={mark}
            getLocation={getLocation}
            position={position}
            placeMarker={placeMarker}
            markers={markers}
          />
        </Grid>
      </Grid>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
