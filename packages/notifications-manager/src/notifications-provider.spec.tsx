import { useEffect } from "react";

import {
  NotificationsProvider,
  useNotificationsContext,
} from "./notifications-provider";
import { render } from "./tests/test-utils";

describe("Notifications Provider", () => {
  it("renders without error", () => {
    render(
      <NotificationsProvider>
        <div>Test Children</div>
      </NotificationsProvider>,
    );
  });

  it("provides notifications context to children", () => {
    const TestComponent = () => {
      const context = useNotificationsContext();
      return (
        <NotificationsProvider>
          {context.notifications.length}
        </NotificationsProvider>
      );
    };

    const { getByText } = render(<TestComponent />);

    expect(getByText(" 0")).toBeInTheDocument();
  });

  it("should display notification", () => {
    const notification = {
      type: "info",
      title: "Test Notification",
    } as const;

    const TestComponent = ({ notification }) => {
      const context = useNotificationsContext();
      useEffect(() => {
        context.addNotification(notification);
      }, []);

      return <div>{context.notifications.length}</div>;
    };

    const { getByText } = render(
      <NotificationsProvider>
        <TestComponent notification={notification} />
      </NotificationsProvider>,
    );

    expect(getByText(notification.title)).toBeInTheDocument();
  });
});
