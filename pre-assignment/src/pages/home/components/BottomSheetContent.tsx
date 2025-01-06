import { content } from '@pages/home/components/BottomSheetContent.css';
import React, { forwardRef } from 'react';

const BottomSheetContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  return (
    <div className={content} ref={ref} {...props}>
     {props.children}
    </div>
  );
});

export default BottomSheetContent;
