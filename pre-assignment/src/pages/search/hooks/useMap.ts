import { useState, useEffect, useRef } from 'react';

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
  const [map, setMap] = useState<any>(null);

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

        const initializedMap = new window.kakao.maps.Map(container, options);
        setMap(initializedMap);

        // 현재 위치 마커 표시
        new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(position.lat, position.lng),
          map: initializedMap,
        });
      });
    }
  }, [position]);

  // 지도 중심 변경 함수
  const changeMapCenter = (newPosition: Position) => {
    if (map) {
      const newCenter = new window.kakao.maps.LatLng(newPosition.lat, newPosition.lng);
      map.setCenter(newCenter);
    }
  };

  return { mapContainerRef, changeMapCenter };
};

export default useMap;
