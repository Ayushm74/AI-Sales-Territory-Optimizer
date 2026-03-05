import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function TerritoryMap({ territories }) {
  return (
    <MapContainer
      center={[37.0902, -95.7129]}
      zoom={4}
      style={{ height: "400px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {territories.map((t, i) => (
        <Marker key={i} position={[t.lat, t.lng]}>
          <Popup>
            {t.region} <br />
            Rep: {t.sales_rep}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}