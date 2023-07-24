import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core';
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import App from './App.tsx';

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<MantineProvider withGlobalStyles withNormalizeCSS>
			<RouterProvider router={router} />
		</MantineProvider>
	</React.StrictMode>,
)
