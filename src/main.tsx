import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core';
import {
	BrowserRouter, Route, Routes
} from "react-router-dom";
import App from './App.tsx';
import Settings from './settings/Settings.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<MantineProvider withGlobalStyles withNormalizeCSS>
			<BrowserRouter>
				<Routes>
					<Route path="/app" element={<App />} />
					<Route path="/" element={<Settings />} />
				</Routes>
			</BrowserRouter>
		</MantineProvider>
	</React.StrictMode>,
)
