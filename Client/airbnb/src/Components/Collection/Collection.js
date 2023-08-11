import React, { useState } from "react";
import { Modal, notification } from "antd";
import { t } from "i18next";
export default function Collection() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = () => {
    setIsOpenModal(true);
  };
  const handleOk = () => {
    setIsOpenModal(false);
  };
  const handleCancel = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      <Modal
        className="modalUploadImg"
        open={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h1 className="text-base font-bold mb-5">
          Rất tiếc, hãy quay lại sau để trải nghiệm nhé?
        </h1>
      </Modal>
      <div className="flex gap-5 overflow-x-auto justify-between">
        <div className="relative lg:w-[50%] md:w-full sm:w-full mb:w-full h-[370px]  animate__animated animate__fadeInLeft">
          <img
            className="absolute rounded-xl object-cover w-full h-full"
            src="https://plus.unsplash.com/premium_photo-1664051271220-94125cdbfb42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
          <div className="absolute top-5 left-10 ">
            <h1 className="  font-medium text-white ">Collection</h1>
            <h1 className=" font-bold text-white text-2xl w-52">
              Connect with Olympians & Paralympians
            </h1>
          </div>
          <div className="absolute bottom-10 left-10">
            <button
              onClick={openModal}
              className="py-2 px-5 bg-white font-medium rounded"
            >
              {t("Show All")}
            </button>
          </div>
        </div>
        <div className="lg:w-[50%] h-[370px] relative md:hidden sm:hidden mb:hidden lg:block animate__animated animate__fadeInRight">
          <img
            className="absolute rounded-xl object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1605565348518-bef3e7d6fed8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80"
            alt=""
          />
          <div className="absolute top-5 left-10">
            <h1 className="  font-medium text-white">Collection</h1>
            <h1 className=" font-bold text-white text-2xl w-52">
              Connect with Olympians & Paralympians
            </h1>
          </div>
          <div className="absolute bottom-10 left-10">
            <button
              onClick={openModal}
              className="py-2 px-5 bg-white font-medium rounded"
            >
              {t("Show All")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
