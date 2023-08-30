import { useState } from "react";

export type TNotification = {
  id: string;
  type: "info" | "warning" | "success" | "error";
  title: string;
  duration?: number;
  message?: string;
};

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<TNotification[]>([]);

  const addNotification = (notification: Omit<TNotification, "id">) => {
    setNotifications([
      ...notifications,
      { ...notification, id: Math.random().toString(36).substr(2, 9) },
    ]);
  };

  const dismissNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id),
    );
  };

  return {
    notifications,
    addNotification,
    dismissNotification,
  };
};
