"use client";

import { useEffect, useRef, useState } from "react";

// Leaflet chargé depuis le CDN (pas de dépendance npm)
let leafletPromise = null;
function loadLeaflet() {
  if (typeof window === "undefined") return Promise.reject();
  if (window.L) return Promise.resolve(window.L);
  if (!leafletPromise) {
    leafletPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      s.async = true;
      s.onload = () => resolve(window.L);
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  return leafletPromise;
}

/**
 * groups: [{ color, stops: [{id, lat, lng, name, n}] , route: bool }]
 */
export default function TripMap({ groups, activeId, onSelect, height = 260, className = "" }) {
  const el = useRef(null);
  const map = useRef(null);
  const layer = useRef(null);
  const markers = useRef({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let dead = false;
    loadLeaflet()
      .then((L) => {
        if (dead || !el.current || map.current) return;
        map.current = L.map(el.current, {
          zoomControl: false,
          attributionControl: true,
          scrollWheelZoom: false,
          tap: true,
        });
        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
          maxZoom: 19,
          attribution: "© OpenStreetMap · © CARTO",
        }).addTo(map.current);
        layer.current = L.layerGroup().addTo(map.current);
        setReady(true);
      })
      .catch(() => {});
    return () => {
      dead = true;
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Dessin des points + tracé
  useEffect(() => {
    if (!ready) return;
    const L = window.L;
    layer.current.clearLayers();
    markers.current = {};
    const all = [];
    groups.forEach((g) => {
      const pts = g.stops.filter((s) => s.lat);
      if (g.route && pts.length > 1) {
        L.polyline(
          pts.map((s) => [s.lat, s.lng]),
          { color: g.color, weight: 3, opacity: 0.7, dashArray: "2 8", lineCap: "round" }
        ).addTo(layer.current);
      }
      pts.forEach((s) => {
        const icon = L.divIcon({
          className: "pin-wrap",
          html: `<div class="pin" style="--c:${g.color}"><span>${s.n ?? ""}</span></div>`,
          iconSize: [34, 34],
          iconAnchor: [17, 17],
        });
        const m = L.marker([s.lat, s.lng], { icon, riseOnHover: true })
          .addTo(layer.current)
          .on("click", () => onSelect && onSelect(s.id));
        markers.current[s.id] = m;
        all.push([s.lat, s.lng]);
      });
    });
    if (all.length === 1) map.current.setView(all[0], 15);
    else if (all.length) map.current.fitBounds(all, { padding: [36, 36], maxZoom: 16 });
    setTimeout(() => map.current && map.current.invalidateSize(), 60);
  }, [ready, groups, onSelect]);

  // Point actif : zoom doux
  useEffect(() => {
    if (!ready) return;
    Object.entries(markers.current).forEach(([id, m]) => {
      const node = m.getElement();
      if (node) node.classList.toggle("is-active", id === activeId);
    });
    const m = activeId && markers.current[activeId];
    if (m) map.current.flyTo(m.getLatLng(), Math.max(map.current.getZoom(), 15), { duration: 0.8 });
  }, [activeId, ready]);

  return (
    <div className={`tripmap ${className}`} style={{ height }}>
      <div ref={el} className="tripmap-canvas" />
      {!ready && <div className="tripmap-loading">Chargement de la carte…</div>}
    </div>
  );
}
