import { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { Table } from "react-bootstrap";
import api from '../api/client'
export default function PipelineMapper() {
  const [coords, setCoords] = useState([]);
  const [elevations, setElevations] = useState([]);

  const handleCreated = async (e) => {
    const layer = e.layer;
    let latlngs = layer.getLatLngs();

    // Handle nested arrays (e.g., polygons)
    if (Array.isArray(latlngs[0])) latlngs = latlngs[0];

    const coordinates = latlngs.map((p) => ({ lat: p.lat, lng: p.lng }));

    // Update table data
    setCoords(coordinates);
    console.log("Drawn coordinates:", coordinates);

    // Fetch elevation data from backend
    try {
      const res = await api.post("/elevation", { coordinates });
      setElevations(res.data);
      console.log("Elevation data:", res.data);
    } catch (err) {
      console.error("Elevation fetch error:", err);
      alert("Could not fetch elevation data.");
    }
  };

  return (
    <div className="container-fluid mt-4">
      <h2>🌍 Pipeline Mapper</h2>
      <p>Draw your pipeline route below to get coordinates and elevation data.</p>

      <div style={{ width: "75vw", height: "70vh", margin: 0, padding: 0 }}>
        <MapContainer
          center={[30.0444, 31.2357]} // Cairo center
          zoom={10}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <FeatureGroup>
            <EditControl
              position="topright"
              draw={{
                rectangle: false,
                circle: false,
                circlemarker: false,
                marker: false,
                polygon: false,
                polyline: true,
              }}
              edit={{ remove: true }}
              onCreated={handleCreated}
            />
          </FeatureGroup>
        </MapContainer>
      </div>

      {coords.length > 0 && (
        <div className="mt-4">
          <h5>📍 Route Coordinates & Elevations</h5>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Elevation (m)</th>
              </tr>
            </thead>
            <tbody>
              {coords.map((c, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{c.lat.toFixed(6)}</td>
                  <td>{c.lng.toFixed(6)}</td>
                  <td>{elevations[i]?.elevation ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}
