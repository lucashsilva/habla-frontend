import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';


firebase.initializeApp({
  apiKey: "AIzaSyAUYoW3_aIl3-o98JsTpGtyza6hC2kc72w",
  authDomain: "habla-215902.firebaseapp.com",
  databaseURL: "https://habla-215902.firebaseio.com",
  projectId: "habla-215902",
  storageBucket: "habla-215902.appspot.com",
  messagingSenderId: "738892499893"
});

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();