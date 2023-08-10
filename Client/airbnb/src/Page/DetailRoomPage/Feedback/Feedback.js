import React, { useState, useEffect } from "react";
import { roomService } from "../../../services/RoomService";
import { useTranslation } from "react-i18next";
import { Avatar, Rate } from "antd";
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';

export default function Feedback(room) {
  const { t } = useTranslation();
  const [feedBack, setFeedBack] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    roomService
      .getFeedBackByRoom(room.room.id)
      .then((res) => {
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

          <div className="flex items-start gap-5 w-full">
          <Avatar className="bg-[#87d068]" size={35}>{item.nameUser.charAt(0)}</Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-[-0.5rem]">
                <p className="font-bold">{item.nameUser}</p>
                <Rate style={{ color: 'orange' }} defaultValue={item.numberOfStars} character={({ index }) => customIcons[index + 1]} disabled />
              </div>
              <span className="text-xs text-gray-400">{item.createDate}</span>
              <p className="text-base mt-1">{item.content}</p>
            </div>
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
