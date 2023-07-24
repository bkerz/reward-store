import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core';
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import App from './App.tsx';
import Settings from './settings/Settings.tsx';

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />
	},
	{
		path: "/settings",
		element: <Settings />
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<MantineProvider withGlobalStyles withNormalizeCSS>
			<RouterProvider router={router} />
		</MantineProvider>
	</React.StrictMode>,
)
