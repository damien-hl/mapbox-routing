import mapbox from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { useEffect, useRef } from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

mapbox.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

function MapBox() {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapbox.Map({
      locale: "fr-FR",
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [2.3522219, 48.856614],
      zoom: 7,
      projection: "globe",
    });

    map.on("load", () => {
      const directions = new MapboxDirections({
        accessToken: mapbox.accessToken,
        language: "fr-FR",
        unit: "metric",
        interactive: false,
        controls: {
          inputs: false,
          instructions: false,
          profileSwitcher: false,
        },
      })
        .setOrigin([2.3522219, 48.856614])
        .setDestination([4.83754, 45.74806]);

      map.addControl(directions);
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} className="MapBox"></div>;
}

export default MapBox;
