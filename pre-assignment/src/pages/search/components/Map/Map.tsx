import { useEffect } from 'react';
import * as styles from './Map.css';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import useMap from '../../hooks/useMap';

interface LocationOption {
  name: string;
  lat: number;
  lng: number;
}

interface MapProps {
  location: LocationOption | null;
}

const Map = ({ location }: MapProps) => {
  const { position } = useCurrentLocation();
  const { mapContainerRef, changeMapCenter } = useMap(position);

  useEffect(() => {
    if (location) {
      changeMapCenter({ lat: location.lat, lng: location.lng });
    } else if (position) {
      changeMapCenter({ lat: position.lat, lng: position.lng });
    }
  }, [location, position, changeMapCenter]);

  return (
    <section className={styles.container}>
      <div ref={mapContainerRef} className={styles.container} />
    </section>
  );
};

export default Map;
