import { Button } from '@/components/ui/button';
import { Navigation } from 'lucide-react';

export const Map = () => {
  const handleGetDirections = () => {
    window.open('https://maps.app.goo.gl/QYu9H57wTRXZ3rxK9', '_blank');
  };

  return (
    <div className="relative w-full h-[400px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.9610761754225!2d20.942375977015534!3d52.22592497198555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47193341d4989f85%3A0xfd7aab178ccbd285!2sGentle%20Piercing%20-%20Przek%C5%82uwanie%20Uszu%20Warszawa!5e0!3m2!1sen!2spl!4v1761245833409!5m2!1sen!2spl"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Gentle Piercing - Przekłuwanie Uszu Warszawa"
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
