import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const Map = React.memo(({ events }) => {
    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {events.map((event) => (
                event._embedded?.venues?.map((venue) => (
                    venue.location && ( // Check if venue.location exists
                        <Marker
                            key={venue.id}
                            position={[venue.location.latitude, venue.location.longitude]}
                        >
                            <Popup>
                                <strong>{event.name}</strong>
                                <br />
                                {venue.name}
                            </Popup>
                        </Marker>
                    )
                ))
            ))}
        </MapContainer>
    );
});

export default Map;