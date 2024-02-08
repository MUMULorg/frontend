import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import { Navigation } from "swiper";
import { getFollowingList } from "../api/Follow/getFollowingList";
import { getSpaceInfo } from "../api/getSpaceInfo";
import PropTypes from 'prop-types';

function Storyslide({spaceId, followSelected, followerList}) {
  const [swiperRef, setSwiperRef] = useState(null);
  const [followingList, setFollowingList] = useState([]);
  const [spaceInfo, setSpaceInfo] = useState({
    userId: '',
    picture: '',
    name: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFollowingList(spaceId);
        const spaceUserInfo = await getSpaceInfo(spaceId);

        setSpaceInfo(spaceUserInfo || { userId: '', picture: '', name: '' }); // 기본값 설정 (데이터 패칭 undefined 에러 방지)
        setFollowingList(response || []); // 기본값 설정 (데이터 패칭 undefined 에러 방지)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [spaceId]);

  const prevHandler = () => {
    if (swiperRef !== null) {
    swiperRef.slidePrev();
    }
  };

  const nextHandler = () => {
    if (swiperRef !== null) {
      swiperRef.slideNext();
    }
  };




  return (
    <div className="slideWrap">
      <button onClick={prevHandler} className="swiper-button-prev">
        Prev
      </button>
      <button className="swiper-button-next" onClick={nextHandler}>
        Next
      </button>
      {followingList.length > 0 && (
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            disabledClass: "swiper-button-disabled",
          }}
          className="mySwiper"
          modules={[Navigation]}
          breakpoints={{
            640: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            720: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 8,
              spaceBetween: 20,
            },
          }}
          onSwiper={(swiper) => setSwiperRef(swiper)}
        >
          <SwiperSlide>
            <img src={spaceInfo.picture} alt="" className="storyImg MyImg" />
            <p className="stroryId Me">{spaceInfo.name}</p>
          </SwiperSlide>
          {followSelected
            ? followingList.map((item) => (
                <SwiperSlide key={item.userId}>
                  <img
                    src={item.picture}
                    alt=""
                    className="storyImg followImg"
                    onClick={() => (window.location.href = `/${item.userId}`)}
                  />
                  <p className="stroryId Others">{item.name}</p>
                </SwiperSlide>
              ))
            : (followerList || []).map((item) => (
                <SwiperSlide key={item.userId}>
                  <img
                    src={item.picture}
                    alt=""
                    className="storyImg followImg"
                    onClick={() => (window.location.href = `/${item.userId}`)}
                  />
                  <p className="stroryId Others">{item.name}</p>
                </SwiperSlide>
              ))}
        </Swiper>
      )}
    </div>
  );
  
}

Storyslide.propTypes = {
  spaceId: PropTypes.string.isRequired,
  followSelected: PropTypes.bool.isRequired,
  followerList: PropTypes.array.isRequired,
};

export default Storyslide;
