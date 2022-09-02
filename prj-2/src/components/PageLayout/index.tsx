import React, { useEffect } from "react";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import nookies from "nookies"
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";
import { cookie_name } from "enumerations";
import Web3 from "web3";
import { injected } from "lib/connector";
import { isMobile } from "react-device-detect";

interface LayoutComponentType {
  Component: Function;
  pageProps: Object;
}
const PageLayout: React.FC<LayoutComponentType> = ({Component,pageProps}) => {
  const web3 = useWeb3React();
  const network = useSelector((state:any) => state.network);
  const {activate,account} = web3;

  const connect = async() => {
    const {ethereum}:any = window;
    if(ethereum){
        try {
            const web3 = new Web3(Web3.givenProvider);
            const chain = await web3.eth.getChainId();
            await activate(injected);
        } catch (error) {
            console.log(error);
        }
    }else{
        isMobile
          ? window.open("https://metamask.app.link/dapp/nexpad.io/", '_blank')
          : window.open("https://metamask.io", "_blank")
    }
}

  useEffect(() => {
    if(account){
      nookies.set(null, cookie_name.account,account,{ path: "/", maxAge: 30 * 24 * 60 * 60 })
    }else{
      const accountCookies = nookies.get(null)?.[cookie_name.account];
      if (accountCookies) connect();
    }
  },[account])

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default PageLayout;
