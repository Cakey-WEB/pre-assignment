import { noTransition, withTransition, wrapper } from '@pages/home/components/BottomSheet.css';
import BottomSheetContent from '@pages/home/components/BottomSheetContent';
import BottomSheetHeader from '@pages/home/components/BottomSheetHeader';
import Content from '@pages/home/components/Content';
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
  isContentAreaTouched: boolean;
}

const BottomSheet = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sheet = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: 'none',
    },
    isContentAreaTouched: false,
  });

  useEffect(() => {
    const canUserMoveBottomSheet = () => {
      const { touchMove, isContentAreaTouched } = metrics.current;

      // 컨텐츠 영역이 아닌 부분을 터치할 경우, 항상 바텀시트를 클릭
      if (!isContentAreaTouched) {
        return true;
      }

      // 바텀시트가 올라와있는 상태가 아닐 때, 컨텐츠 영역을 터치해도 바텀시트를 움직이도록
      if (sheet.current?.getBoundingClientRect().y !== 144) {
        return true;
      }

      //   스크롤을 더 이상 올릴 것이 없으면, 바텀시트를 움직이도록
      // Content의 스크롤 상태를 확인
      if (touchMove.movingDirection === 'down' && content.current) {
        return content.current.scrollTop <= 0; // 스크롤이 최상단일 때만 바텀시트 이동
      }

      return false;
    };

    // touch start
    const handleTouchStart = (e: TouchEvent) => {
      setIsTransitioning(false);
      const { touchStart } = metrics.current;
      touchStart.sheetY = sheet.current ? sheet.current.getBoundingClientRect().y : 0;
      touchStart.touchY = e.touches[0].clientY;
    };

    // touch move
    const handleTouchMove = (e: TouchEvent) => {
      const { touchMove, touchStart } = metrics.current;
      const currentTouch = e.touches[0];
      console.log(currentTouch.clientY);

      if (touchMove.prevTouchY === undefined) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (currentTouch.clientY >= 420) {
        touchMove.movingDirection = 'down';
      }

      if (currentTouch.clientY > 210 && currentTouch.clientY < 420) {
        touchMove.movingDirection = 'center';
      }

      if (currentTouch.clientY <= 210) {
        touchMove.movingDirection = 'up';
      }

      if (canUserMoveBottomSheet()) {
        // content에서 scroll이 발생하는 것을 막음
        // e.preventDefault();

        sheet.current?.style.setProperty('top', `${currentTouch.clientY}px`);
      } 
    };

    // touch end
    const handleTouchEnd = () => {
    //   document.body.style.overflowY = 'auto';
      setIsTransitioning(true);
      const { touchMove } = metrics.current;

      if (touchMove.movingDirection === 'down') {
        sheet.current?.style.setProperty('top', '580px');
      }

      if (touchMove.movingDirection === 'center') {
        sheet.current?.style.setProperty('top', '370px');
      }

      if (touchMove.movingDirection === 'up') {
        sheet.current?.style.setProperty('top', '144px');
        // setIsContentAreaTouched(true);
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
        isContentAreaTouched: false,
      };
    };

    // 바텀시트에서 컨텐츠 영역이 아닌 부분을 터치하면 항상 바텀시트를 움직입니다.
    sheet.current?.addEventListener('touchstart', handleTouchStart);
    sheet.current?.addEventListener('touchmove', handleTouchMove);
    sheet.current?.addEventListener('touchend', handleTouchEnd);

    return () => {
      sheet.current?.removeEventListener('touchstart', handleTouchStart);
      sheet.current?.removeEventListener('touchmove', handleTouchMove);
      sheet.current?.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // content 영역을 터치하는 것을 기록합니다.
  useEffect(() => {
    const handleTouchStart = () => {
      metrics.current.isContentAreaTouched = true;
    };

    content.current?.addEventListener('touchstart', handleTouchStart);

    return () => content.current?.removeEventListener('touchstart', handleTouchStart);
  }, []);

  return (
    <div className={`${wrapper} ${isTransitioning ? withTransition : noTransition}`} ref={sheet}>
      <BottomSheetHeader />
      <BottomSheetContent ref={content}>
        <Content />
      </BottomSheetContent>
    </div>
  );
};

export default BottomSheet;
