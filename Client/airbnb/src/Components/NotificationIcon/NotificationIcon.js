import { notification } from 'antd';

export const openNotificationIcon = (type, mess, description) => {
  notification[type]({
    message: mess,
    description: description,
  });
};