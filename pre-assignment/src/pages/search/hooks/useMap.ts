import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Position {
  lat: number;
  lng: number;
}

const useMap = (position: Position | null) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (position && window.kakao) {
      if (!window.kakao.maps) {
        console.error('Kakao Maps SDK가 로드되지 않았습니다.');
        return;
      }

      window.kakao.maps.load(() => {
        const container = mapContainerRef.current;
        if (!container) {
          console.error('mapContainerRef를 찾을 수 없습니다.');
          return;
        }

        const options = {
          center: new window.kakao.maps.LatLng(position.lat, position.lng),
          level: 3,
        };

        new window.kakao.maps.Map(container, options);
      });
    }
  }, [position]);

  return { mapContainerRef };
};

export default useMap;
