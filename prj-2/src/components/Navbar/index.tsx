import { useWeb3React } from '@web3-react/core';
import { injected } from 'lib/connector';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import Web3 from 'web3';
import styles from "./Navbar.module.sass";
import nookies from "nookies";
import { cookie_name } from 'enumerations';
import Link from 'next/link';
import Button from 'components/Button';
import { useSelector } from 'react-redux';
import NetworkDropdown from './NetworkDropdown';

const Navbar :React.FC = () => {
    const [isNetwork, setIsNetwork] = useState<any>();
    const web3 = useWeb3React();
    const {activate,active,deactivate,account,library,chainId} = web3;
    const network = useSelector((state:any) => state.network)

    useEffect(() => {
        if (network) setIsNetwork(network)
    }, [network])

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
    const disconnect = () => {
        try {
            deactivate();
            nookies.destroy(null, cookie_name.account)
        } catch (error) {
            console.log(error);
                        
        }
    }

    const menu = [
        {
          title: "Register Labratory",
          url: "/"
        },
        {
          title: "Sign Message",
          url: "sign"
        },
        {
          title: "Verify",
          url: "verify"
        },
      ]
    return (
    <div className={styles.container}>
        <div className="container">
            <div className={styles.main_wrapper}>
                <div className={styles.logo_wrapper}>
                    <h2>APM Group</h2>
                </div>
                <div className={styles.menu_btn_wrapper}>
                {
                    menu.map((x) => (
                    <Link key={x.title}
                        href={`/${x.url}`}
                    >
                        <a className={styles.menu_item_wrapper}>
                            <span className={styles.menu_item}>{x.title}</span>
                            <div className={styles.menu_hover}></div>
                        </a>
                    </Link>
                    ))
                }
                    <Button
                        title={isNetwork?.name}
                        image={{ src: isNetwork?.image, alt: isNetwork?.title }}
                        className={[!account ? styles.disable : "", styles.networkButton,   "button-small"].join(" ")}
                        dropdown={{ children: NetworkDropdown }}
                    />
                {active ?
                    <button className={styles.connect_button} onClick={disconnect}>Disconnect</button>
                    :
                    <button className={styles.connect_button} onClick={connect}>Connect Wallet</button>
                }
                </div>
            </div>
        </div>
    </div>
    );
};

export default Navbar;