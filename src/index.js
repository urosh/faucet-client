import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css'
import registerServiceWorker from './registerServiceWorker';



// This helps us not to call store.dispatch all the time, it does it for us

ReactDOM.render(<App />,document.getElementById('root'));

registerServiceWorker();
