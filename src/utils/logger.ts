

const isDev = process.env.NODE_ENV === "development";

function checkEnvironment() {
    if(!isDev) return
}

export const logSimple = (message: string, data?: unknown) => {
  checkEnvironment();
  console.log(message, data);
};


export const logSuccess = (message: string, data?: unknown) => {
    checkEnvironment();
  console.log(`%c✔ ${message}`, "color: #00E676; font-weight: 900", data);
};

export const logError = (message: string, data?: unknown) => {
    checkEnvironment();
  console.log(`%c ${message}`, "color: red; font-weight: 900", data);
};

export const logWarning = (message: string, data?: unknown) => {
    checkEnvironment();
  console.log(`%c⚠ ${message}`, "color: yellow; font-weight: 900", data);
};
