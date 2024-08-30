import React from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, LayerGroup, LayersControl } from 'react-leaflet';

// const MapBox = ({position , customIcon}) => {
//   return (
//     <MapContainer center={position} zoom={12} style={{ height: '500px', width: '50%' , borderRadius: '15px'}} scrollWheelZoom={false}>
//       <LayersControl position="topright">
//         <LayersControl.BaseLayer checked name="OpenStreetMap">
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//         </LayersControl.BaseLayer>
//         <LayersControl.BaseLayer name="Satellite">
//           <TileLayer
//             url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
//           />
//         </LayersControl.BaseLayer>

//         <LayersControl.Overlay checked name="Monitoring Stations">
//           <LayerGroup>
//             <Marker position={position} icon={customIcon}>
//               <Popup>Varanasi - Monitoring Station<br />DO: 6.5 mg/L<br />BOD: 3.0 mg/L</Popup>
//             </Marker>
//             {/* Add more markers here */}
//           </LayerGroup>
//         </LayersControl.Overlay>
//       </LayersControl>
//     </MapContainer>
//   )
// }


const MapBox = () => {
  return (
    <div className='bg-black w-1/2 '>
    </div>
  )
}

export default MapBox
