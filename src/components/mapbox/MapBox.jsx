import mapbox from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { useEffect, useRef, useState } from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

mapbox.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

function MapBox() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const directions = useRef(null);

  const [lng, setLng] = useState(2.3522219);
  const [lat, setLat] = useState(48.856614);
  const [zoom, setZoom] = useState(7);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapbox.Map({
      locale: "fr-FR",
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      projection: "globe",
      zoom,
    });

    // map.on("load", () => {
    directions.current = new MapboxDirections({
      accessToken: mapbox.accessToken,
      language: "fr-FR",
      unit: "metric",
      interactive: false,
      controls: {
        inputs: false,
        instructions: false,
        profileSwitcher: false,
      },
    });
    //     .setOrigin([2.3522219, 48.856614])
    //     .setDestination([4.83754, 45.74806]);

    //     map.addControl(directions);
    // });
  }, []);

  useEffect(() => {
    if (!map.current) return;

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    if (!directions.current) return;

    map.current.on("load", () => {
      directions.current.setOrigin([2.3522219, 48.856614]);
      directions.current.setDestination([4.83754, 45.74806]);

      map.current.addControl(directions.current);
    });
  }, []);

  return (
    <>
      <div className="Sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="MapBox"></div>
    </>
  );
}

export default MapBox;
