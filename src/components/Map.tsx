import { Button } from '@/components/ui/button';
import { Navigation } from 'lucide-react';

export const Map = () => {
  const handleGetDirections = () => {
    window.open('https://maps.app.goo.gl/X5kTSdfj1hgBb2Eg8', '_blank');
  };

  return (
    <div className="relative w-full h-[400px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.582675789186!2d20.94294631618464!3d52.22594127976359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc8c6e3a1e1f%3A0x8b8f0f0f0f0f0f0f!2sGiz%C3%B3w%206%2F208%2C%2001-249%20Warszawa!5e0!3m2!1sen!2spl!4v1234567890123!5m2!1sen!2spl"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Inverness MED - Gizów 6/208, 01-249 Warszawa"
        className="rounded-lg shadow-lg"
      />
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
