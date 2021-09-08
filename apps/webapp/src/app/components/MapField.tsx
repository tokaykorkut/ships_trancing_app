import React , { useEffect , useRef, useState} from "react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LocationDto } from "@oceanvoyapp/dtos";
import {Point} from '@turf/turf';
interface MapFieldProps {
  vessels: {
    oilVesselsToDestination: LocationDto[];
    idleOilVessels: LocationDto[];
  } | undefined;
}

const MapField = ({vessels}: MapFieldProps) => {
  // this is where the map instance will be stored after initialization
  const [map, setMap] = useState<mapboxgl.Map>();

  // React ref to store a reference to the DOM node that will be used
  // as a required parameter `container` when initializing the mapbox-gl
  // will contain `null` by default
  const mapNode = useRef(null);
console.log(vessels)
  const [lng, setLng] = useState(28.979530);
  const [lat, setLat] = useState(41.015137);
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    const node = mapNode.current;

    if (typeof window === "undefined" || node === null) return;

      const mapBoxMap = new mapboxgl.Map({
      container: node,
      accessToken:'pk.eyJ1IjoidHRiZXJhdCIsImEiOiJja3QybXdkbG4wbGoyMm9tbGc4bGs3bTBvIn0.R0dnBMLXTYGE-pxFUHe6iw',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
      });

      // save the map object to React.useState
      setMap(mapBoxMap);


      if(vessels?.oilVesselsToDestination && vessels?.oilVesselsToDestination.length>0){
        vessels?.oilVesselsToDestination.forEach((item)=> {
          // create the popup
          const popup = new mapboxgl.Popup({ offset: 50 }).setText(
            `
            Name= ${item.NAME}
            IMO= ${item.IMO}
            TYPE= ${item.TYPE}
            DEST= ${item.DEST}
            ETA= ${item.ETA}
            `
            );
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
            return new mapboxgl.Marker({ "color": "#F01414" }).setLngLat(item.pointCoor.geometry.coordinates).setPopup(popup).addTo(mapBoxMap)
        })
      }

      if(vessels?.idleOilVessels && vessels?.idleOilVessels.length>0){
        vessels?.idleOilVessels.forEach((item)=> {
           // create the popup
           const popup = new mapboxgl.Popup({ offset: 50 }).setText(
            `
            Name= ${item.NAME}
            IMO= ${item.IMO}
            TYPE= ${item.TYPE}
            DEST= idle
            ETA= ${item.ETA}
            `
            );
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
            return new mapboxgl.Marker({ "color": "#7ED731" }).setLngLat(item.pointCoor.geometry.coordinates).setPopup(popup).addTo(mapBoxMap)
        })
      }

      return () => {
        mapBoxMap.remove();
      };

    },[lat, lng, zoom, vessels]);

    return (
    <>
      <div ref={mapNode} style={{ width: "100%", height: "800px" }}/>
    </>
    );

}

export default MapField;
