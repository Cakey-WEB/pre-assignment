import { noTransition, withTransition, wrapper } from '@pages/home/components/BottomSheet.css';
import BottomSheetContent from '@pages/home/components/BottomSheetContent';
import BottomSheetHeader from '@pages/home/components/BottomSheetHeader';
import { useEffect, useRef, useState } from 'react';

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number; // touchstart에서 BottomSheet의 최상단 모서리의 Y값
    touchY: number; // touchstart에서 터치 포인트의 Y값
  };
  touchMove: {
    prevTouchY?: number; // 다음 touchmove 이벤트 핸들러에서 필요한 터치 포인트 Y값을 저장
    movingDirection: 'none' | 'down' | 'center' | 'up'; // 유저가 터치를 움직이고 있는 방향
  };
}

const BottomSheet = () => {
  const [bottomSheetHeight, setBottomSheetHeight] = useState('67px');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const sheet = useRef<HTMLDivElement>(null);

  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: 'none',
    },
  });

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setIsTransitioning(false);
      const { touchStart } = metrics.current;
      touchStart.sheetY = sheet.current ? sheet.current.getBoundingClientRect().y : 0;
      touchStart.touchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const { touchMove, touchStart } = metrics.current;
      const currentTouch = e.touches[0];

      if (touchMove.prevTouchY === undefined) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (currentTouch.clientY >= 420) {
        touchMove.movingDirection = 'down';
        const height = window.innerHeight - currentTouch.clientY;
        setBottomSheetHeight(`${Math.floor(height)}px`);
      }

      if (currentTouch.clientY > 210 && currentTouch.clientY < 420) {
        touchMove.movingDirection = 'center';
        const height = window.innerHeight - currentTouch.clientY;
        setBottomSheetHeight(`${Math.floor(height)}px`);
      }

      if (currentTouch.clientY <= 210) {
        touchMove.movingDirection = 'up';
        const height = window.innerHeight - currentTouch.clientY;
        setBottomSheetHeight(`${Math.floor(height)}px`);
      }
    };

    const handleTouchEnd = () => {
      setIsTransitioning(true);
      const { touchMove } = metrics.current;

      if (touchMove.movingDirection === 'down') {
        setBottomSheetHeight(`${window.innerHeight - 600}px`);
      }

      if (touchMove.movingDirection === 'center') {
        setBottomSheetHeight(`${window.innerHeight - 300}px`);
      }

      if (touchMove.movingDirection === 'up') {
        setBottomSheetHeight(`${window.innerHeight - 50}px`);
      }

      // metrics 초기화
      metrics.current = {
        touchStart: {
          sheetY: 0,
          touchY: 0,
        },
        touchMove: {
          prevTouchY: 0,
          movingDirection: 'none',
        },
      };
    };

    sheet.current?.addEventListener('touchstart', handleTouchStart);
    sheet.current?.addEventListener('touchmove', handleTouchMove);
    sheet.current?.addEventListener('touchend', handleTouchEnd);
  }, []);

  return (
    <div
      className={`${wrapper} ${isTransitioning ? withTransition : noTransition}`}
      style={{ height: bottomSheetHeight }}
      ref={sheet}>
      <BottomSheetHeader />
      <BottomSheetContent />
    </div>
  );
};

export default BottomSheet;
