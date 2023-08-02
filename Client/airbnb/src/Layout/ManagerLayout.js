import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBarManager from '../Components/SideBarManager/SideBarManager';

function ManagerLayout() {
  return (
    <div className="flex">
    <div className="fixed top-0 left-0 h-full bg-white dark:bg-gray-900 shadow-lg z-10">
      <SideBarManager />
    </div>
    <div className="w-full p-10 ml-[300px]"> {/* Adjust the left margin to match the width of the sidebar */}
      <Outlet />
    </div>
  </div>
  );
}

export default ManagerLayout;
