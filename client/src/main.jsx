import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux';
import { Store } from './Store/Store'
import './index.css'
import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
    <Provider store={Store}>
    <App  />
    </Provider>
    </HashRouter>
  </React.StrictMode>
)
