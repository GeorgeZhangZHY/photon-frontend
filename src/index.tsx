import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import promiseMiddleware from 'redux-promise-middleware';
import reducer from './global/mainReducer';
import App from './components/App/App';
import { Route } from 'react-router';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(promiseMiddleware()))
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route component={App} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
