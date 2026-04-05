const isDev = process.env.NODE_ENV === "development";

export const logSimple = (message: string, data?: unknown) => {
  if (!isDev) return;
  console.log(message, data);
};

export const logSuccess = (message: string, data?: unknown) => {
  if (!isDev) return;
  console.log(`%c✔ ${message}`, "color: #00E676; font-weight: 900", data);
};

export const logError = (message: string, data?: unknown) => {
  if (!isDev) return;
  console.error(`%c✖ ${message}`, "color: red; font-weight: 900", data);
};

export const logWarning = (message: string, data?: unknown) => {
  if (!isDev) return;
  console.warn(`%c⚠ ${message}`, "color: yellow; font-weight: 900", data);
};
