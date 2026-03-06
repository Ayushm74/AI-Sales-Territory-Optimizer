import React, { useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { currency } from '../../utils/formatters.js';

/**
 * Very small built-in centroid map for common demo regions.
 * In production, you'd replace this with GeoJSON boundaries per territory.
 */
const REGION_CENTROIDS = {
  California: [36.7783, -119.4179],
  Texas: [31.9686, -99.9018],
  'New York': [42.9538, -75.5268],
  Florida: [27.6648, -81.5158],
  Illinois: [40.6331, -89.3985],
  Pennsylvania: [41.2033, -77.1945],
  Ohio: [40.4173, -82.9071],
  Georgia: [32.1656, -82.9001],
};

const TerritoryMap = ({ territories = [], assignments = [] }) => {
  const assignmentByTerritory = useMemo(() => {
    const map = new Map();
    assignments.forEach((a) => map.set(a.territory, a));
    return map;
  }, [assignments]);

  const points = territories
    .map((t) => {
      const region = t.region || t.territory || t.name;
      const center = REGION_CENTROIDS[region];
      if (!center) return null;
      const assignment = assignmentByTerritory.get(region);
      return {
        region,
        center,
        market_size: Number(t.market_size || 0),
        predicted_revenue: Number(t.predicted_revenue || t.predictedRevenue || 0),
        assignedTo: assignment?.sales_rep || null,
      };
    })
    .filter(Boolean);

  return (
    <div className="h-[420px] overflow-hidden rounded-lg border border-slate-200 bg-white">
      <MapContainer center={[39.5, -98.35]} zoom={4} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((p) => (
          <CircleMarker
            key={p.region}
            center={p.center}
            radius={10}
            pathOptions={{ color: p.assignedTo ? '#0f172a' : '#94a3b8' }}
          >
            <Popup>
              <div className="text-xs">
                <div className="font-semibold">{p.region}</div>
                <div className="mt-1">Assigned: {p.assignedTo || '—'}</div>
                <div>Predicted: {currency(p.predicted_revenue)}</div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default TerritoryMap;


