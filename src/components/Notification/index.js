import {notification } from 'antd';
import styles from "./style.module.scss";

export const Notification = (title,description) => {
    notification.open({
      message: title,
      description:description,
      className: styles.notification,
    });
}