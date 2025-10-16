import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [token, setToken] = useState('');
  const [tokenInput, setTokenInput] = useState('');

  const initializeMap = (accessToken: string) => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = accessToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [20.9471, 52.2435], // Gizów 6, Warszawa coordinates
      zoom: 15,
    });

    // Add marker for the location
    new mapboxgl.Marker({ color: '#0891b2' })
      .setLngLat([20.9471, 52.2435])
      .setPopup(
        new mapboxgl.Popup().setHTML(
          '<strong>Inverness MED</strong><br/>Gizów 6<br/>01-249 Warszawa'
        )
      )
      .addTo(map.current);

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
  };

  useEffect(() => {
    if (token) {
      initializeMap(token);
    }

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [token]);

  if (!token) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-muted/30 rounded-lg">
        <div className="text-center space-y-4 p-6 max-w-md">
          <p className="text-sm text-muted-foreground">
            Wprowadź swój Mapbox public token aby wyświetlić mapę
          </p>
          <p className="text-xs text-muted-foreground">
            Znajdź token na{' '}
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com
            </a>
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="pk.ey..."
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              className="flex-1"
            />
            <Button onClick={() => setToken(tokenInput)}>
              Załaduj
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px]">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
    </div>
  );
};
