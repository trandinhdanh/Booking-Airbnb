import React, { useState } from "react";
import { useEffect } from "react";
import { roomService } from "../../../services/RoomService";
import { useTranslation } from "react-i18next";
import { Rate } from "antd";
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
export default function Feedback(room) {
  const { t } = useTranslation();
  const [feedBack, setFeedBack] = useState([])
  useEffect(() => {
    console.log(room);
    roomService
      .getFeedBackByRoom(room.room.id)
      .then((res) => {
        console.log(res);
        setFeedBack(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);
  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };
  const renderFeedBack = () => {
    if (feedBack?.length > 0) {
      return feedBack.map((item, i) => (
        <div className="p-[1.2rem] text-left border rounded-[0.4rem] block bg-[#ffffff]" key={i}>
          <div className="flex justify-between">
            <div className="flex gap-5">
              <img className="w-14 h-14 rounded-[50%]" src="https://www.gravatar.com/avatar/70751776107b1cc613ff6bc9a4f1653f?d=wavatar&f=y" alt="User Avatar" />
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
  
  return (
    <div className="w-full py-[2.2rem] border-b-[1px] border-[#dadada]">
      <h1 className="text-[1.625rem] mb-[1.25rem] font-[600]">
        {t("Feed Back")}
      </h1>
      <div className="space-y-2">{renderFeedBack()}</div>
    </div>
  );
}
