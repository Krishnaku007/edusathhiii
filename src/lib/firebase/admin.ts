import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

const hasCredentials = Boolean(projectId && clientEmail && privateKey);

const app =
  getApps().length > 0
    ? getApps()[0]
    : hasCredentials
      ? initializeApp({
          credential: cert({
            projectId,
            clientEmail,
            privateKey,
          }),
        })
      : undefined;

export const adminDb = app ? getFirestore(app) : null;
