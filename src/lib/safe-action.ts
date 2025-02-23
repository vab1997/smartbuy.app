import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient,
} from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (e.message) return e.message;
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
}).use(async ({ next, clientInput }) => {
  const startTime = performance.now();
  console.log("→", clientInput);
  const result = await next();
  const endTime = performance.now();
  const duration = Math.round(endTime - startTime);
  console.log(`⏹ (${duration}ms)`, result);
  return result;
});