import { Inter } from "next/font/google";

import "~/styles/globals.css";
import "@radix-ui/themes/styles.css";

import { headers } from "next/headers";
import { Theme } from "@radix-ui/themes";

import { TRPCReactProvider } from "./providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={["font-sans", fontSans.variable].join(" ")}>
        <TRPCReactProvider headers={headers()}>
          <Theme accentColor={"crimson"}>{props.children}</Theme>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
