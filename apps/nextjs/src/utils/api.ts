import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@lec-workshop/api";

export const api = createTRPCReact<AppRouter>();

export { type RouterInputs, type RouterOutputs } from "@lec-workshop/api";
