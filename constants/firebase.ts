export interface IFirestore {
  data: any;
}

// const CERT = {
//   privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//   clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//   projectId: process.env.FIREBASE_PROJECT_ID,
// };

// const FIREBASE = {
//   CLIENT_CONFIG: {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.FIREBASE_APP_ID,
//     measurementId: process.env.FIREBASE_MEASUREMENT_ID,
//   },
//   // ADMIN_CONFIG: {
//   //   credential: firebaseAdmin.credential.cert(CERT),
//   //   databaseURL: process.env.FIREBASE_DATABASE_URL,
//   // },
//   // react-redux-firebase config
//   RRF_CONFIG: {},
// };

// export default FIREBASE;
