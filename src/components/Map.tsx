import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Navigation } from 'lucide-react';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiaXZhbmRhbmtvdiIsImEiOiJjbWd0ZGJzMDcwMzl1Mmxxa2tud2dlbWZoIn0.EIWOSBMEmqZ43QOW07tzHg';

export const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const handleGetDirections = () => {
    window.open('https://maps.app.goo.gl/X5kTSdfj1hgBb2Eg8', '_blank');
  };

  const initializeMap = () => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [20.945046328079172, 52.22594129500684], // Gizów 6/208, 01-249 Warszawa, Wola
      zoom: 16,
    });

    // Add marker for the location
    new mapboxgl.Marker({ color: '#0891b2' })
      .setLngLat([20.945046328079172, 52.22594129500684])
      .setPopup(
        new mapboxgl.Popup().setHTML(
          '<strong>Inverness MED</strong><br/>Gizów 6/208<br/>01-249 Warszawa<br/><a href="https://maps.app.goo.gl/X5kTSdfj1hgBb2Eg8" target="_blank" rel="noopener noreferrer" style="color: #0891b2; text-decoration: underline; margin-top: 8px; display: inline-block;">Get Directions →</a>'
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
      <Button
        onClick={handleGetDirections}
        className="absolute bottom-4 left-4 z-10 shadow-lg"
        variant="default"
      >
        <Navigation className="mr-2 h-4 w-4" />
        Get Directions
      </Button>
    </div>
  );
};
