import PageLayout from 'components/PageLayout';
import { wrapper } from "redux/store";
import { Web3ReactProvider } from '@web3-react/core';
import {Web3Provider} from "@ethersproject/providers"
import type { AppProps } from 'next/app';
import 'styles/app.sass';

function App({ Component, pageProps }: AppProps) {
  const getLibrary = (provider:any) => {
    const library = new Web3Provider(provider)
    library.pollingInterval = 12000;
    return library
  }
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <PageLayout Component={Component} pageProps={pageProps} />
    </Web3ReactProvider>
  )
}

export default wrapper.withRedux(App)
