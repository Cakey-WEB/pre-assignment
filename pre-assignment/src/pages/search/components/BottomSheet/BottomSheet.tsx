import { useState } from 'react';
import * as styles from './BottomSheet.css';
import { motion, useDragControls, PanInfo } from 'framer-motion';
import HandlerIcon from '../../../../assets/HandlerIcon';

const BottomSheet = () => {
  const [state, setState] = useState<'closed' | 'default' | 'opened'>('default');
  const dragControls = useDragControls();

  const handleDragEnd = (event: PointerEvent, info: PanInfo) => {
    const offsetThreshold = 150;
    const deltaThreshold = 5;
    const isOverOffsetThreshold = Math.abs(info.offset.y) > offsetThreshold;
    const isOverDeltaThreshold = Math.abs(info.delta.y) > deltaThreshold;
    if (!isOverOffsetThreshold && !isOverDeltaThreshold) return;

    if (info.offset.y > 0) {
      setState(state === 'opened' ? 'default' : 'closed');
    } else {
      setState(state === 'closed' ? 'default' : 'opened');
    }
  };

  const handleOverlayTap = () => {
    if (state === 'opened') setState('default');
    else if (state === 'default') setState('closed');
  };

  return (
    <>
      <motion.div
        className={styles.container}
        initial='default'
        animate={state}
        variants={{
          opened: { top: `20vh` },
          default: { top: '60vh' },
          closed: { top: '90vh' },
        }}
        transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
        drag='y'
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        <div className={styles.handlerContainer} onPointerDown={(e) => dragControls.start(e)}>
          <HandlerIcon className={styles.handler} />
        </div>
        <div className={styles.content}>
          <div className={styles.cardList}>
            {Array.from({ length: 20 }).map((_, index) => (
              <div key={index} className={styles.card}>
                <span>카드 {index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div
        className={styles.overlay}
        initial={false}
        animate={state}
        variants={{
          opened: { display: 'block' },
          default: { display: 'block' },
          closed: { display: 'none' },
        }}
        onTap={handleOverlayTap}
      />
    </>
  );
};

export default BottomSheet;
