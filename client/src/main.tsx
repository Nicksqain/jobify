import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
// REDUX
import { Provider as ReduxProvider } from 'react-redux';
import { setupStore } from './store/store';

import { QueryClientProvider, } from 'react-query'
import queryClient from "./queryClient/queryClient"

import { ColorModeScript } from '@chakra-ui/react';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient} contextSharing>
    <ReduxProvider store={setupStore()}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ReduxProvider>
  </QueryClientProvider>


  // </React.StrictMode>,
)
