const DEV_BASE_URL = "http://localhost:8079";
const PROD_BASE_URL = "";

export const BASE_URL = import.meta.env.PROD ? PROD_BASE_URL : DEV_BASE_URL;

export const JWT_REFRESH_INTERVALS = 600000;
