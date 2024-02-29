import { useState, useEffect } from 'react';

export default function useLocalisation() {
  const [localisation, setLocalisation] = useState({ lat: null, long: null });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocalisation({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    });
  }, []);

  return localisation;
}
