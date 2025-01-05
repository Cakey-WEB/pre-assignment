import * as styles from './Search.css';
import Map from './components/Map/Map';
import BottomSheet from './components/BottomSheet/BottomSheet';

const Search = () => {
  return (
    <main className={styles.container}>
      <Map />
      <BottomSheet />
    </main>
  );
};

export default Search;
