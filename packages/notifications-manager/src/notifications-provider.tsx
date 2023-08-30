import { createContext, useContext } from "react";

import { Notifications } from "./notifications";
import { useNotifications } from "./use-notifications";

type NotificationsContext = ReturnType<typeof useNotifications>;

const NotificationsContext = createContext<NotificationsContext>({
  notifications: [],
  addNotification: () => {},
  dismissNotification: () => {},
});

export const NotificationsProvider = ({ children }) => {
  const context = useNotifications();

  return (
    <NotificationsContext.Provider value={context}>
      <Notifications />
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotificationsContext = () => {
  return useContext(NotificationsContext);
};
