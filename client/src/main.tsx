import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
// REDUX
import { Provider as ReduxProvider } from 'react-redux';
import { setupStore } from './store/store';

import queryClient from "./queryClient/queryClient"

import { ChakraBaseProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>

  <ReduxProvider store={setupStore()}>
    <ChakraBaseProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraBaseProvider>
  </ReduxProvider>


  // </React.StrictMode>,
)
