import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import 'react-bootstrap/dist/react-bootstrap.min.js.LICENSE.txt';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<App />
	</QueryClientProvider>
);
