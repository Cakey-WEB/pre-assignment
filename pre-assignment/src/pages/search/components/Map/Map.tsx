import * as styles from './Map.css';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import useMap from '../../hooks/useMap';

const Map = () => {
  const { position } = useCurrentLocation();
  const { mapContainerRef } = useMap(position);

  return (
    <section className={styles.container}>
      <div ref={mapContainerRef} className={styles.container} />
    </section>
  );
};

export default Map;
