import { ChangeEvent } from 'react';

interface LocationOption {
  name: string;
  lat: number;
  lng: number;
}

interface DropdownProps {
  locations: LocationOption[];
  onSelect: (location: LocationOption | null) => void;
}

const Dropdown = ({ locations, onSelect }: DropdownProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;
    if (selectedName === '전체') {
      onSelect(null);
    } else {
      const location = locations.find((loc) => loc.name === selectedName);
      if (location) {
        onSelect(location);
      }
    }
  };

  return (
    <select onChange={handleChange} defaultValue='전체'>
      <option value='전체'>전체</option>
      {locations.map((location) => (
        <option key={location.name} value={location.name}>
          {location.name}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
