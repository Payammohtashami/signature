import React from 'react';
import styles from "./NetworkDropdown.module.sass";
import { chooseNetwork } from "enumerations/network";
import { useWeb3React } from '@web3-react/core';
import { changNetwork } from "lib/web3Fun";
import { injected } from "lib/connector";
import Web3 from 'web3';

const NetworkDropdown = () => {
    const {chainId,account,activate} = useWeb3React();
    const handleChangNetwork = async (params: any) => {
        changNetwork(params)
        if (!account) connect()
    }

    const connect = async() => {
        const {ethereum}:any = window;
        if(ethereum){
            try {
                const web3 = new Web3(Web3.givenProvider);
                await activate(injected);
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <ul className={styles.dropdown__menu}>
            <li className={styles.dropdown__sub__title}>
                <span id="secbal">Testnet</span>
            </li>
            <li className={styles.li_item}>
                {
                chooseNetwork.testnet.map(({ image, title, network }) => {
                    let active = chainId === network.chainId;
                    return (
                    <div className={[styles['wrap-item'], active && styles['active']].join(" ")} key={title} onClick={() => !active && handleChangNetwork(network)}>
                        <img src={image} alt={title} />
                        <div className={styles["item-title"]}>{title}</div>
                    </div>
                    )
                })
                }
            </li>
        </ul>
    )
  }

export default NetworkDropdown;