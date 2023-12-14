import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './assets/base.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Main from './DemoPages/Main';
import configureStore from './config/configureStore';
import { Provider } from 'react-redux';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const store = configureStore();
const rootElement = document.getElementById('root');

const renderApp = (Component) => {
	ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>
				<Component />
			</BrowserRouter>
		</Provider>,
		rootElement
	);
};

serviceWorkerRegistration.register({
	onUpdate: async (registration) => {
		if (registration && registration.waiting) {
			await registration.unregister();
			registration.waiting.postMessage({ type: 'SKIP_WAITING' });

			window.location.reload();
		}
	},
});
renderApp(Main);
