import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import credentials from '../../credentials.json' assert {type: 'json'};

// const credentials = '../../credentials.json';

const firebaseApp = initializeApp({
    credential: cert(credentials),
});

const auth = getAuth(firebaseApp);

export {auth}