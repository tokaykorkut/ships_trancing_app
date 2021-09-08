import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {QueryClient, QueryClientProvider} from "react-query";
import App from './app/app';
import {ReactQueryDevtools} from "react-query/devtools";
import CssBaseline from "@material-ui/core/CssBaseline";

const queryClient = new QueryClient({
  defaultOptions: {
      queries: {
          // refetchOnWindowFocus: false,
          retry: false,
          staleTime: 30000,
      },
  },
});

ReactDOM.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CssBaseline/>
        <App />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
  document.getElementById('root')
);
