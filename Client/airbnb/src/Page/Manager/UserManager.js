import React, { useState } from 'react';
import { Tabs } from 'antd';

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
          {/* <UserManagement /> */}
          a
        </TabPane>
        <TabPane tab="Seller" key="seller">
          {/* <SellerManagement /> */}
            b
        </TabPane>
      </Tabs>
    </div>
  );
}

