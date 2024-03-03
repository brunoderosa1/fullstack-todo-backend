import { initializeApp, cert } from "firebase-admin/app";
import { readFileSync } from 'fs';
import { getAuth } from "firebase-admin/auth";
import path from "path";
import { fileURLToPath } from "url";
// import credentials from '../../credentials.json' assert {type: 'json'};

function readJsonFile(file) {
    let bufferData = readFileSync(file);
    let stData = bufferData.toString();
    let data = JSON.parse(stData);
    return data;
}

const credentials = readJsonFile(path.resolve(fileURLToPath(import.meta.url), '../credentials.json'));


const firebaseApp = initializeApp({
    credential: cert(credentials),
});


const auth = getAuth(firebaseApp);

export { auth }