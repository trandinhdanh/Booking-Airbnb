import React from "react";
import { useTranslation } from "react-i18next";

export default function ExploreNearby() {
  const { t } = useTranslation();
  return (
    <div className="grid mb:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 grid-rows-2 gap-4">
      <div className="flex justify-start items-center">
        <img
          src="https://res.cloudinary.com/dvzingci9/image/upload/v1665413813/airBnB/Explore%20nearby/Frame_9-1_xlccyu.png"
          className="rounded-[0.2rem] mr-2 w-[3rem] h-[3rem]"
          alt=""
        />
        <div className="">
          <h1 className="text-[0.9rem] font-bold">{t("MoonLight")}</h1>
          <p className="opacity-60 text-[0.8rem]">350km</p>
        </div>
      </div>
      <div className="flex justify-start items-center">
        <img
          src="https://res.cloudinary.com/dvzingci9/image/upload/v1665413809/airBnB/Explore%20nearby/Frame_9_donn3q.png"
          className="rounded-[0.2rem] mr-2 w-[3rem] h-[3rem]"
          alt=""
        />
        <div className="">
          <h1 className="text-[0.9rem] font-bold">{t("WaterFall")}</h1>
          <p className="opacity-60 text-[0.8rem]">250km</p>
        </div>
      </div>
      <div className="flex justify-start items-center">
        <img
          src="https://res.cloudinary.com/dvzingci9/image/upload/v1665413767/airBnB/Explore%20nearby/Frame_9-4_upwubk.png"
          className="rounded-[0.2rem] mr-2 w-[3rem] h-[3rem]"
          alt=""
        />
        <div className="">
          <h1 className="text-[0.9rem] font-bold">{t("River")}</h1>
          <p className="opacity-60 text-[0.8rem]">550km</p>
        </div>
      </div>
      <div className="flex justify-start items-center">
        <img
          src="https://res.cloudinary.com/dvzingci9/image/upload/v1665413767/airBnB/Explore%20nearby/Frame_9-5_lpnabl.png"
          className="rounded-[0.2rem] mr-2 w-[3rem] h-[3rem]"
          alt=""
        />
        <div className="">
          <h1 className="text-[0.9rem] font-bold">{t("Desert")}</h1>
          <p className="opacity-60 text-[0.8rem]">20km</p>
        </div>
      </div>
      <div className="flex justify-start items-center">
        <img
          src="https://res.cloudinary.com/dvzingci9/image/upload/v1665413767/airBnB/Explore%20nearby/Frame_9-6_g2lxxg.png"
          className="rounded-[0.2rem] mr-2 w-[3rem] h-[3rem]"
          alt=""
        />
        <div className="">
          <h1 className="text-[0.9rem] font-bold">{t("Peace")}</h1>
          <p className="opacity-60 text-[0.8rem]">200km</p>
        </div>
      </div>
      <div className="flex justify-start items-center">
        <img
          src="https://res.cloudinary.com/dvzingci9/image/upload/v1665413767/airBnB/Explore%20nearby/Frame_9-3_a7dltw.png"
          className="rounded-[0.2rem] mr-2 w-[3rem] h-[3rem]"
          alt=""
        />
        <div className="">
          <h1 className="text-[0.9rem] font-bold">{t("Tropical")}</h1>
          <p className="opacity-60 text-[0.8rem]">250km</p>
        </div>
      </div>
      <div className="flex justify-start items-center">
        <img
          src="https://res.cloudinary.com/dvzingci9/image/upload/v1665413766/airBnB/Explore%20nearby/Frame_9-2_ovogvc.png"
          className="rounded-[0.2rem] mr-2 w-[3rem] h-[3rem]"
          alt=""
        />
        <div className="">
          <h1 className="text-[0.9rem] font-bold">{t("River Side")}</h1>
          <p className="opacity-60 text-[0.8rem]">30km</p>
        </div>
      </div>
      <div className="flex justify-start items-center">
        <img
          src="https://res.cloudinary.com/dvzingci9/image/upload/v1665413813/airBnB/Explore%20nearby/Frame_9-1_xlccyu.png"
          className="rounded-[0.2rem] mr-2 w-[3rem] h-[3rem]"
          alt=""
        />
        <div className="">
          <h1 className="text-[0.9rem] font-bold">{t("Star")}</h1>
          <p className="opacity-60 text-[0.8rem]">100km</p>
        </div>
      </div>
    </div>
  );
}
