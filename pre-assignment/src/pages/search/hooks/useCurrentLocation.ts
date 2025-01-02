import { useState, useEffect } from 'react';

interface Position {
  lat: number;
  lng: number;
}

const useCurrentLocation = (): { position: Position | null } => {
  const [position, setPosition] = useState<Position | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation을 지원하지 않는 브라우저입니다.');
      return;
    }

    const success = (pos: GeolocationPosition) => {
      setPosition({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
      console.log('현재 위치 가져오기 성공:)');
    };

    const failure = (err: GeolocationPositionError) => {
      console.error('현재 위치 가져오기 실패:(', err);
    };

    navigator.geolocation.getCurrentPosition(success, failure);
  }, []);

  return { position };
};

export default useCurrentLocation;
