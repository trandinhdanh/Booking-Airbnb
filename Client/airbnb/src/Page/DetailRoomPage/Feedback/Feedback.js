import React, { useState, useEffect } from "react";
import { roomService } from "../../../services/RoomService";
import { useTranslation } from "react-i18next";
import { Rate } from "antd";
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';

export default function Feedback(room) {
  const { t } = useTranslation();
  const [feedBack, setFeedBack] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    console.log(room.room.id);
    roomService
      .getFeedBackByRoom(room.room.id)
      .then((res) => {
        console.log(res);
        setFeedBack(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

  const renderFeedBack = () => {
    if (feedBack?.length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const feedbackToShow = feedBack.slice(startIndex, endIndex);

      return feedbackToShow.map((item, i) => (
        <div className="p-[1.2rem] text-left border rounded-[0.4rem] block bg-[#ffffff]" key={i}>
          <div className="flex justify-between">
            <div className="flex gap-5">
              <img className="w-14 h-14 rounded-[50%]" src="https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg?w=740" alt="User Avatar" />
              <div>
                <p className="font-bold">{item.nameUser}</p>
                <p className="text-base">{item.content}</p>
                <span className="text-xs">{item.createDate}</span>
              </div>
            </div>
            <Rate className="" defaultValue={item.numberOfStars} character={({ index }) => customIcons[index + 1]} disabled />
          </div>
        </div>
      ));
    } else {
      return <div className="">No Feed Back</div>;
    }
  };

  const totalPages = Math.ceil(feedBack.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="w-full py-[2.2rem] border-b-[1px] border-[#dadada]">
      <h1 className="text-[1.625rem] mb-[1.25rem] font-[600]">
        {t("Feed Back")}
      </h1>
      <div className="space-y-2">{renderFeedBack()}</div>
      <div className="flex justify-center mt-4">
      {feedBack?.length > 0 && ( 
        <div className="flex justify-center mt-4">
          <button
            className={`mr-2 bg-primary text-white font-bold py-2 px-4 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ''}`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className={`bg-primary text-white font-bold py-2 px-4 rounded ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ''}`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
      </div>
    </div>
  );
}
