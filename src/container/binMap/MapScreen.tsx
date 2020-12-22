import React, { useContext, useEffect, useState } from "react";
import { GeneralLayout } from "../../layouts";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { divIcon } from 'leaflet';
import NewBinModal, { BinTypes } from "./NewBinModal"
import { LatLngLiteral } from "leaflet";
import { UserContext } from "../../provider/UserProvider";
const initialPosition: LatLngLiteral = { lat: 41.3200327, lng: 19.8200031 };

function MyComponent({ setClickedMarkerLocation }: any) {
  const map = useMapEvents({
    drag: () => {
      // console.log(map.getCenter())
      console.log(map.getCenter().lat, map.getCenter().lng)
    },
    click: (e) => {
      setClickedMarkerLocation({
        lat: e.latlng.lat, lng: e.latlng.lng
      })
      console.log(map.getBounds().getNorth(), map.getBounds().getEast())
    },
    locationfound: (location) => {
      console.log('location found:', location)
    },
  })
  return null
}

function MapScreen() {

  const { binList, setBinList } = useContext(UserContext)

  const [clickedMarkerLocation, setClickedMarkerLocation] = useState<any>(null);

  useEffect(() => {
    getList();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(binList);
  }, [binList]);

  function getList() {
    setBinList(JSON.parse(localStorage.getItem("bin-list") as string) as BinTypes[]);
  }

  function handleNewBin(bin: BinTypes) {
    // const { binId, height, lat, length, lng, width, } = bin;

    setBinList([...binList, bin]);

    localStorage.setItem("bin-list", JSON.stringify([...binList, bin]));
  }

  return (
    <GeneralLayout
      title={"Bins Location"}
      subTitle={"Each marker represent a bin."}
    >
      <>
        <MapContainer
          className="flex-grow"
          center={initialPosition}
          zoom={15}
          scrollWheelZoom={false}
        >
          <MyComponent setClickedMarkerLocation={setClickedMarkerLocation} />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            binList && binList.map((bin, index) =>
              <Marker
                key={index}
                position={{ lat: bin.lat, lng: bin.lng }}
                icon={
                  divIcon({
                    html: `
                  <svg width="18" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.774 2.535A8.598 8.598 0 008.654 0C6.343 0 4.17.9 2.534 2.535A8.598 8.598 0 000 8.655c0 2.31.9 4.484 2.535 6.119l4.598 4.598c.405.405.945.628 1.521.628s1.117-.223 1.522-.628l4.598-4.598a8.597 8.597 0 002.534-6.12c0-2.311-.9-4.485-2.534-6.12zm-6.12 8.044A1.927 1.927 0 016.73 8.654c0-1.06.863-1.924 1.924-1.924s1.925.863 1.925 1.924a1.927 1.927 0 01-1.925 1.925z" fill="#FF4949"/><path d="M14.774 2.535A8.598 8.598 0 008.654 0v6.73c1.061 0 1.925.863 1.925 1.924a1.927 1.927 0 01-1.925 1.925V20c.576 0 1.117-.223 1.522-.628l4.598-4.598a8.597 8.597 0 002.534-6.12c0-2.311-.9-4.485-2.534-6.12z" fill="#F30051"/></svg>
                `
                  })
                }
              />
            )
          }
          {
            clickedMarkerLocation && <Marker
              position={clickedMarkerLocation}
              icon={
                divIcon({
                  html: `
              <svg width="18" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.774 2.535A8.598 8.598 0 008.654 0C6.343 0 4.17.9 2.534 2.535A8.598 8.598 0 000 8.655c0 2.31.9 4.484 2.535 6.119l4.598 4.598c.405.405.945.628 1.521.628s1.117-.223 1.522-.628l4.598-4.598a8.597 8.597 0 002.534-6.12c0-2.311-.9-4.485-2.534-6.12zm-6.12 8.044A1.927 1.927 0 016.73 8.654c0-1.06.863-1.924 1.924-1.924s1.925.863 1.925 1.924a1.927 1.927 0 01-1.925 1.925z" fill="#FF4949"/><path d="M14.774 2.535A8.598 8.598 0 008.654 0v6.73c1.061 0 1.925.863 1.925 1.924a1.927 1.927 0 01-1.925 1.925V20c.576 0 1.117-.223 1.522-.628l4.598-4.598a8.597 8.597 0 002.534-6.12c0-2.311-.9-4.485-2.534-6.12z" fill="#F30051"/></svg>
            `
                })
              }
            />
          }
        </MapContainer>

        {clickedMarkerLocation && <div
          className="bg-white shadow"
          style={{
            position: "absolute",
            zIndex: 1100,
            top: 10,
            right: 15,
            padding: 10,
            borderRadius: 5,
            display: "flex",
            flexDirection: 'column',
          }}>
          <span className="mb-2">lat : {clickedMarkerLocation.lat}</span>
          <span>lng : {clickedMarkerLocation.lng}</span>
        </div>}

        <NewBinModal handleNewBin={handleNewBin} />
      </>
    </GeneralLayout>
  );
}

export default MapScreen;
