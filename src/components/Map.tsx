import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiaXZhbmRhbmtvdiIsImEiOiJjbWd0ZGJzMDcwMzl1Mmxxa2tud2dlbWZoIn0.EIWOSBMEmqZ43QOW07tzHg';

export const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const initializeMap = () => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [20.9452, 52.2258], // Gizów 6, 01-249 Warszawa, Wola
      zoom: 16,
    });

    // Add marker for the location
    new mapboxgl.Marker({ color: '#0891b2' })
      .setLngLat([20.9452, 52.2258])
      .setPopup(
        new mapboxgl.Popup().setHTML(
          '<strong>Inverness MED</strong><br/>Gizów 6<br/>01-249 Warszawa'
        )
      )
      .addTo(map.current);

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
  };

  useEffect(() => {
    initializeMap();

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return (
    <div className="relative w-full h-[400px]">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
    </div>
  );
};
