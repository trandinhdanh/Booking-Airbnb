import React from 'react';
import { useTranslation } from 'react-i18next';
export default function LiveAnyway() {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="font-bold text-2xl mb-5">{t('Live anywhere')}</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 mb:grid-cols-2 sm:grid-cols-2 gap-5 ">
        <div className="col-span-1 mt-3 h-[300px]">
          <img
            className="w-full h-full rounded-xl object-cover"
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=843&q=80"
            alt=""
          />
          <h1 className="font-medium mt-2">{t('Pet Allowes')}</h1>
        </div>
        <div className="col-span-1 mt-3 h-[300px]">
          <img
            className="w-full h-full rounded-xl object-cover"
            src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80"
            alt=""
          />
          <h1 className="font-medium mt-2">{t('Pet Allowes')}</h1>
        </div>
        <div className="col-span-1 mt-3 h-[300px]">
          <img
            className="w-full h-full rounded-xl object-cover"
            src="https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=385&q=80"
            alt=""
          />
          <h1 className="font-medium mt-2">{t('Pet Allowes')}</h1>
        </div>
        <div className="col-span-1 mt-3 h-[300px]">
          <img
            className="w-full h-full rounded-xl object-cover"
            src="https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
          <h1 className="font-medium mt-2">{t('Pet Allowes')}</h1>
        </div>
      </div>
    </div>
  );
}
