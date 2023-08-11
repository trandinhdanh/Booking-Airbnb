import React, { useEffect, useState } from "react";
import { Button, Skeleton } from "antd";
import "./HomePage.scss";
import { useDispatch, useSelector } from "react-redux";
// import { getRoomList } from '../../redux/room/roomList';
// import { getLocationList } from '../../redux/room/roomLocation';
// import TabsHeader from './TabsHeader';
import Banner from "../../Components/Banner/Banner";
import Collection from "../../Components/Collection/Collection";
import BlogBanner from "./BlogBanner";
// import { dataIMG } from '../../Data/Data';
import { useTranslation } from "react-i18next";
import BannerVideo from "../../Components/Banner/BannerVideo";
import ExploreNearby from "./ExploreNearby";
import { dataIMG } from "../../Data/Data";
import CardItem from "../../Components/CardItem/CardItem";
import { getRoomList } from "../../Redux/room/roomList";
import SkeletonItem from "../../Components/Skeleton/SkeletonItem";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
function HomePage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const allRoom = useSelector((state) => state.room.listRoom.allRoom);
  const [room, setRoom] = useState([]);
  console.log(room);
  useEffect(() => {
    setRoom(allRoom);
  }, [allRoom]);

  const isfetching = useSelector((state) => state.room.listRoom.isfetching);
  const allLocation = [];
  const [openShadowFilter, setopenShadowFilter] = useState(false);
  const [newRoom, setNewRoom] = useState([]);
  const [queyFilter, setQueyFilter] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = room?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(room?.length / itemsPerPage);
  const handleQueyFilter = (data) => {
    setQueyFilter(data);
  };
  useEffect(() => {
    dispatch(getRoomList());
  }, []);

  const renderRoomItem = () => {
    return Array.isArray(currentItems)
      ? currentItems.map((roomInfor, index) => (
          <CardItem key={index} roomInfor={roomInfor} />
        ))
      : null;
  };

  const handleDecrease = () => {
    setRoom([...room].sort((a, b) => (a.price > b.price ? -1 : 1)));
  };
  const handleIncrease = () => {
    setRoom([...room].sort((a, b) => (a.price > b.price ? 1 : -1)));
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const closeNav = () => {
    if (window.scrollY >= 1100) {
      setopenShadowFilter(true);
    }
    if (window.scrollY < 1100) {
      setopenShadowFilter(false);
    }
  };
  window.addEventListener("scroll", closeNav);

  return (
    <div>
      <div className="header-homepage h-[100vh] pt-[70px] relative mb:hidden sm:hidden lg:flex justify-center items-center">
        <div className="filter-background absolute bg-[#0000007a] w-full z-10 top-0 right-0 h-full "></div>
        <div className="flex px-[4rem] container justify-between z-20 w-full h-full items-center pt-[1rem]">
          <div className="text-center w-2/4 ">
            <svg className="text-home" viewBox="0 0 1320 300">
              <text x="50%" y="50%" dy=".35em" text-anchor="middle">
                Unique
              </text>
            </svg>
          </div>
        </div>
      </div>
      <div className="container m-auto mb:mt-[10rem] sm:mt-[10rem] lg:mt-10 mb-10">
        <div className="mb-10">
          <h1 className="text-[3rem] font-bold mb-10">{t("Explore nearby")}</h1>
          <ExploreNearby />
        </div>
      </div>
      <div className="container mb-5 m-auto mt-10 flex justify-end space-x-3 ">
        <Button
          className="font-bold text-primary"
          onClick={handleDecrease}
          icon={<AiOutlineSortAscending />}
        >
          {t("Decrease")}
        </Button>
        <Button
          className="font-bold text-primary"
          onClick={handleIncrease}
          icon={<AiOutlineSortDescending />}
        >
          {t("Increase")}
        </Button>
      </div>
      <div className="container  m-auto  grid mb:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-6 ">
        {isfetching ? <SkeletonItem /> : renderRoomItem()}
      </div>
      <div className="flex justify-center mb-10 mt-2 space-x-3">
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Button>
        ))}
      </div>
      <div className="mb:w-full sm:w-full lg:container mx-auto">
        <Banner />
      </div>
      <div className="container mx-auto my-10">
        <Collection />
      </div>
      <div className="container mx-auto my-10">
        <BlogBanner />
      </div>
      <div className="flex relative mb:hidden mt-10 bg-black w-full h-screen">
        <div className="flex relative  bg-black w-full h-screen mb:flex-col sm:flex-col ">
          <BannerVideo />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
