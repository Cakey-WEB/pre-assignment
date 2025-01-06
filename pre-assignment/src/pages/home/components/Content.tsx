import {
  cardContainer,
  cardWrapper,
  contentContainer,
  tabWrapper,
} from '@pages/home/components/BottomSheetContent.css';

const Content = () => {
  return (
    <div className={contentContainer}>
      <div className={tabWrapper}>
        <p>스토어</p>
        <p>디자인</p>
      </div>

      <div className={cardContainer}>
        <div className={cardWrapper}>케이크 카드</div>

        <div className={cardWrapper}>케이크 카드</div>

        <div className={cardWrapper}>케이크 카드</div>

        <div className={cardWrapper}>케이크 카드</div>

        <div className={cardWrapper}>케이크 카드</div>

        <div className={cardWrapper}>케이크 카드</div>

        <div className={cardWrapper}>케이크 카드</div>

        <div className={cardWrapper}>케이크 카드</div>

        <div className={cardWrapper}>케이크 카드</div>
      </div>
    </div>
  );
};

export default Content;
