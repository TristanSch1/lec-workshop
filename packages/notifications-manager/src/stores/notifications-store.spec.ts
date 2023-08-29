import { act, renderHook } from "@testing-library/react-hooks";

import { Notification, useNotificationStore } from "./notifications-store";

describe("NotificationsStore", () => {
  it("should add notification", () => {
    const { result } = renderHook(() => useNotificationStore());

    expect(result.current.notifications.length).toBe(0);

    const notification: Notification = {
      id: "123",
      title: "Hello World",
      type: "info",
      message: "This is a notification",
    };

    act(() => {
      result.current.addNotification(notification);
    });

    expect(result.current.notifications).toContainEqual(notification);
  });

  it("should dismiss notification", () => {
    const { result } = renderHook(() =>
      useNotificationStore((state) => ({
        notifications: state.notifications,
        dismissNotification: state.dismissNotification,
      })),
    );

    expect(result.current.notifications).toHaveLength(0);
  });
});
