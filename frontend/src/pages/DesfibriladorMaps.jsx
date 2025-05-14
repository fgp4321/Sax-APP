import Navbar from "@/components/Navbar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Importar los iconos correctamente
import icon from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import shadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: shadow,
});

const desfibriladores = [
  { id: 1, nombre: "Polideportivo Municipal", coords: [38.5403, -0.8195] },
  { id: 2, nombre: "Centro de Salud", coords: [38.5391, -0.8187] },
  { id: 3, nombre: "Plaza Mayor", coords: [38.5395, -0.8202] },
];

export default function DesfibriladorMaps() {
  return (
    <div className="h-screen w-full flex flex-col">
      <Navbar />
      <div className="flex-grow z-0">
        <MapContainer center={[38.5400, -0.8190]} zoom={15} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {desfibriladores.map((punto) => (
            <Marker key={punto.id} position={punto.coords}>
              <Popup>{punto.nombre}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
