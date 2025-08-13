import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import store from '@/redux/store';
import { Provider } from 'react-redux';
import '@/utility/i18n';
import { ThemeProvider } from "@/context/ThemeContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/App.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <Provider store={store}>
  <ThemeProvider>
    <App />
  </ThemeProvider>
  </Provider>
  </React.StrictMode>
);
