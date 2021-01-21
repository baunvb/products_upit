import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import AppReducer from "./AppReducer"
import createSagaMiddleware from 'redux-saga'
import AppSaga from "./AppSaga"

const sagaMiddleware = createSagaMiddleware();

const store = createStore(AppReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(AppSaga);

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback="loading">
      <App />
    </Suspense>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
