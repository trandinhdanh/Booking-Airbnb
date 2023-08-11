import React, { useState } from 'react';
import { Tabs } from 'antd';
import UserManagement from './UserManagement';
import SellerManagement from './SellerManagement';

const { TabPane } = Tabs;

export default function UserManagemer() {
  const [activeTab, setActiveTab] = useState('user');

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="User" key="user">
          <UserManagement />
          
        </TabPane>
        <TabPane tab="Seller" key="seller">
          <SellerManagement />
        </TabPane>
      </Tabs>
    </div>
  );
}

