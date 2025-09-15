import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID, 
    appId: import.meta.env.VITE_APPID,
};

const app = initializeApp(firebaseConfig);

export { app };
export const auth = getAuth(app);