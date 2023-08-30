import { Notification } from "./notification";
import { useNotificationsContext } from "./notifications-provider";

export const Notifications = () => {
  const { notifications } = useNotificationsContext();
  return (
    <div>
      {notifications.map((notification) => {
        return <Notification key={notification.id} {...notification} />;
      })}
    </div>
  );
};
