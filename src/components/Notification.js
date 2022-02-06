import React from "react";
import { useGlobalContext } from "../context/context";

const Notification = () => {
  const { setNotification, notification, setMapStatus } = useGlobalContext();

  return (
    <div
      className="notify"
      onClick={() => {
        setNotification({ status: false });
        setMapStatus(true);
      }}
    >
      <h1>{notification.msg}</h1>
    </div>
  );
};

export default Notification;
