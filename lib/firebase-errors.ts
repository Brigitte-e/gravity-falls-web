import { FirebaseError } from "firebase/app";

type ErrorLabels = {
  invalidCredential: string;
  userNotFound: string;
  wrongPassword: string;
  userDisabled: string;
  tooManyRequests: string;
  invalidEmail: string;
  emailAlreadyInUse: string;
  weakPassword: string;
  operationNotAllowed: string;
  popupClosedByUser: string;
  popupBlocked: string;
  accountExistsWithDifferentCredential: string;
  networkRequestFailed: string;
  fallback: string;
};

const codeToKey: Record<string, keyof ErrorLabels | null> = {
  "auth/invalid-credential": "invalidCredential",
  "auth/user-not-found": "userNotFound",
  "auth/wrong-password": "wrongPassword",
  "auth/user-disabled": "userDisabled",
  "auth/too-many-requests": "tooManyRequests",
  "auth/invalid-email": "invalidEmail",
  "auth/email-already-in-use": "emailAlreadyInUse",
  "auth/weak-password": "weakPassword",
  "auth/operation-not-allowed": "operationNotAllowed",
  "auth/popup-closed-by-user": "popupClosedByUser",
  "auth/popup-blocked": "popupBlocked",
  "auth/cancelled-popup-request": null, // silently ignored
  "auth/account-exists-with-different-credential": "accountExistsWithDifferentCredential",
  "auth/network-request-failed": "networkRequestFailed",
};

export function getAuthErrorMessage(err: unknown, labels: ErrorLabels): string | null {
  if (err instanceof FirebaseError) {
    const key = codeToKey[err.code];
    if (key === null) return null; // explicitly silenced
    return key ? labels[key] : labels.fallback;
  }
  return labels.fallback;
}
