import { wrapper } from '@pages/home/components/BottomSheet.css';
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

export const MIN_Y = 60; // 바텀시트가 최대로 높이 올라갔을 때의 y 값
export const MAX_Y = window.innerHeight - 80; // 바텀시트가 최소로 내려갔을 때의 y 값

const BottomSheet = () => {
  const [bottomSheetHeight, setBottomSheetHeight] = useState('67px');
  // top = 35rem, center =20rem, bottom = 1rem
  //   let bottomSheetHeight = '50px';

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
      const { touchStart } = metrics.current;
      touchStart.sheetY = sheet.current?.getBoundingClientRect().y;
      touchStart.touchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const { touchMove, touchStart } = metrics.current;
      const currentTouch = e.touches[0];

      if (touchMove.prevTouchY === undefined) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      console.log(`touchMove.prevTouchY: ${touchMove.prevTouchY}`);
      console.log(`currentTouch.clientY: ${currentTouch.clientY}`);

      if (currentTouch.clientY >= 420) {
        touchMove.movingDirection = 'down';
        // setBottomSheetHeight(`${window.innerHeight - currentTouch.clientY}px`);
        const height = window.innerHeight - currentTouch.clientY;
        setBottomSheetHeight(`${Math.floor(height)}px`);
        // setIsAnimating(true);
      }

      if (currentTouch.clientY > 210 && currentTouch.clientY < 420) {
        touchMove.movingDirection = 'center';
        // setBottomSheetHeight(`${window.innerHeight - currentTouch.clientY}px`);
        const height = window.innerHeight - currentTouch.clientY;
        setBottomSheetHeight(`${Math.floor(height)}px`);
        // setIsAnimating(true);
      }

      if (currentTouch.clientY <= 210) {
        touchMove.movingDirection = 'up';
        const height = window.innerHeight - currentTouch.clientY;
        setBottomSheetHeight(`${Math.floor(height)}px`);
        // setIsAnimating(true);
        // setBottomSheetHeight(`${window.innerHeight - currentTouch.clientY}px`);
      }

      //   const touchOffset = currentTouch.clientY - touchStart.touchY;
      //   let nextSheetY = touchStart.sheetY + touchOffset;

      //   if (nextSheetY <= MIN_Y) {
      //     nextSheetY = MIN_Y;
      //   }

      //   if (nextSheetY >= MAX_Y) {
      //     nextSheetY = MAX_Y;
      //   }

      //   sheet.current?.style.setProperty('transform', `translateY(${nextSheetY - MAX_Y}px)`);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const { touchMove } = metrics.current;

      // Snap Animation
      //   const currentSheetY = sheet.current?.getBoudingClientRect().y;

      console.log(sheet.current?.style.height);

      if (touchMove.movingDirection === 'down') {
        setBottomSheetHeight(`${window.innerHeight - 600}px`);
      }

      if (touchMove.movingDirection === 'center') {
        setBottomSheetHeight(`${window.innerHeight - 300}px`);
      }

      if (touchMove.movingDirection === 'up') {
        setBottomSheetHeight(`${window.innerHeight - 50}px`);
      }

      // metrics 초기화.
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

  useEffect(() => {
    console.log(`Updated bottomSheetHeight: ${bottomSheetHeight}`);
  }, [bottomSheetHeight]);

  // style={{ height: bottomSheetHeight }}
  return (
    <div
      className={wrapper}
      style={{ height: bottomSheetHeight }}
      ref={sheet}>
      <BottomSheetHeader />
      <BottomSheetContent />
    </div>
  );
};

export default BottomSheet;
