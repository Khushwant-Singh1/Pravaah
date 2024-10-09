import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, LayerGroup, LayersControl, useMap } from 'react-leaflet';

// Custom component to fly the map to a new position on city change
const FlyToPosition = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 12);  // Adjust the zoom level here if needed
    }
  }, [position, map]);

  return null;
};

const MapBox = ({ position }) => {
  return (
    <MapContainer center={position} zoom={12} style={{ height: '360px', width: '50%', borderRadius: '15px' }} scrollWheelZoom={false}>
      <FlyToPosition position={position} />
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OpenStreetMap">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satellite">
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.Overlay checked name="Monitoring Stations">
          <LayerGroup>
            <Marker position={position}>
              <Popup>{/* Popup content can be dynamic based on the city */}</Popup>
            </Marker>
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export default MapBox;
