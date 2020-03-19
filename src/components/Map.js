import React from "react";
import { Map, Polyline, CircleMarker, TileLayer } from "react-leaflet";
import ConfirmBox from "./ConfirmBox";

export default function MapLayer(props) {
  const {
    position,
    markers,
    getLocation,
    placeMarker,
    closeConfirmBox,
    marklocation
  } = props;
  return position.length > 0 ? (
    <div>
      <Map
        center={[position[0].lat, position[0].lon]}
        zoom={13}
        onClick={getLocation}
      >
        {markers.map((mark, index) => (
          <CircleMarker key={index} center={[mark.lat, mark.lon]} color="red" />
        ))}
        <Polyline positions={markers} color="red" />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
      <ConfirmBox
        open={props.confirmIsOpen}
        handleClose={closeConfirmBox}
        placeMarker={placeMarker}
        marklocation={marklocation}
      />
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
