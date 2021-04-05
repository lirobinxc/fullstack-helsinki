import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const message = useSelector((state) => state.notification.message);
  console.log(message);
  const style = {
    backgroundColor: 'beige',
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
  };
  if (message === null) return null;
  return <div style={style}>{message}</div>;
};

export default Notification;
