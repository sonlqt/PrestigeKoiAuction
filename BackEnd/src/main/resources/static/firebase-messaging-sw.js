importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize Firebase in the service worker
firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
});

const messaging = firebase.messaging();

self.addEventListener('install', (event) => {
    self.skipWaiting();  // Activate the new service worker immediately
});

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'YOUR_ICON_URL' // Optional icon URL
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});
