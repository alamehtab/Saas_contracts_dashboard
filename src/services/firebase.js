import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Put your Firebase config here (replace with env vars in prod)
const firebaseConfig = {
    apiKey: "AIzaSyArnvfHpSTyGoDubvcUSI0GcIQm-Py-904",
    authDomain: "saas-d7e1c.firebaseapp.com",
    projectId: "saas-d7e1c",
    appId: "1:861161246403:web:121309e10d2f32b0455c76",
};

const app = initializeApp(firebaseConfig);

// Export app and auth separately
export { app };
export const auth = getAuth(app);