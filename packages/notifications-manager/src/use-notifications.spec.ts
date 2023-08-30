import { act, renderHook } from "@testing-library/react";

import { useNotifications } from "./use-notifications";

describe("useNotifications", () => {
  test("should be defined", () => {
    const { result } = renderHook(() => useNotifications());

    expect(result.current.notifications).toHaveLength(0);

    act(() => {
      result.current.addNotification({
        type: "info",
        title: "test",
      });
    });

    expect(result.current.notifications).toHaveLength(1);
  });

  test("should dismiss a notification", () => {
    const { result } = renderHook(() => useNotifications());

    act(() => {
      result.current.addNotification({
        type: "info",
        title: "test",
      });
    });

    const notification = result.current.notifications[0];

    act(() => {
      result.current.dismissNotification(notification.id);
    });

    expect(result.current.notifications).toHaveLength(0);
  });
});
