import { Theme } from "@radix-ui/themes";

export const AppTheme = ({ children }: { children: React.ReactNode }) => (
  <Theme accentColor={"crimson"}>{children}</Theme>
);
