import { useState } from 'react';
import * as styles from './Search.css';
import Map from './components/Map/Map';
import BottomSheet from './components/BottomSheet/BottomSheet';
import Dropdown from './components/Dropdown/Dropdown';

interface LocationOption {
  name: string;
  lat: number;
  lng: number;
}

const Search = () => {
  const locations: LocationOption[] = [
    { name: '홍대입구역', lat: 37.5563, lng: 126.923 },
    { name: '합정역', lat: 37.55, lng: 126.913 },
    { name: '강남역', lat: 37.4979, lng: 127.0276 },
    { name: '역삼역', lat: 37.5013, lng: 127.0364 },
  ];

  const [selectedLocation, setSelectedLocation] = useState<LocationOption | null>(null);

  const handleLocationSelect = (location: LocationOption | null) => {
    setSelectedLocation(location);
  };

  return (
    <main className={styles.container}>
      <Dropdown locations={locations} onSelect={handleLocationSelect} />
      <Map location={selectedLocation} />
      <BottomSheet />
    </main>
  );
};

export default Search;
