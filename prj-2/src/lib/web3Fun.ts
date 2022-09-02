import { chainIdFormat } from 'utils/convertor';
import Web3 from 'web3';

export const isAddress = (address: any) => Web3.utils.isAddress(address)
export const getAllData = (URLs: any, address: any, json: any) => {
    return Promise.all(URLs.map((x: any) => callWeb3(x, address, json)));
}
export const addressFormat = (address: any) => {
    return `${address.substring(0, 10)}...${address.substring(address.length - 4)}`
}

export const convertError = (e: any) => {
    let error = e.toString();
    if (error?.indexOf('Internal JSON-RPC error.') > -1) {
        error = error.replace('\n', '').replace("Error: ", '').replace('Internal JSON-RPC error.', '')
        error = JSON.parse(error)
    } else return e

    return error;
}
export const callWeb3 = (data: any, address: any, json: any) => {
    console.log({ data, address, json });
    const web3 = new Web3(Web3.givenProvider);
    const contract = new web3.eth.Contract(data?.json?.abi || json?.abi, address || data.address);

    const contractMethod = contract.methods[data.method]
    if (!contractMethod) {
        return new Error()
    }
    const method = data.params ?
        data.params.length === 1 ? contractMethod(data.params[0]) :
            data.params.length === 2 ? contractMethod(data.params[0], data.params[1]) :
                data.params.length === 3 ? contractMethod(data.params[0], data.params[1], data.params[2]) :
                    data.params.length === 4 ? contractMethod(data.params[0], data.params[1], data.params[2], data.params[3]) :
                        data.params.length === 5 ? contractMethod(data.params[0], data.params[1], data.params[2], data.params[3], data.params[4]) :
                            data.params.length === 6 ? contractMethod(data.params[0], data.params[1], data.params[2], data.params[3], data.params[4], data.params[5]) :
                                data.params.length === 7 ? contractMethod(data.params[0], data.params[1], data.params[2], data.params[3], data.params[4], data.params[5], data.params[6]) :
                                    data.params.length === 8 ? contractMethod(data.params[0], data.params[1], data.params[2], data.params[3], data.params[4], data.params[5], data.params[6], data.params[7]) :
                                        data.params.length === 9 ? contractMethod(data.params[0], data.params[1], data.params[2], data.params[3], data.params[4], data.params[5], data.params[6], data.params[7], data.params[8]) :
                                            data.params.length === 10 ? contractMethod(data.params[0], data.params[1], data.params[2], data.params[3], data.params[4], data.params[5], data.params[6], data.params[7], data.params[8], data.params[9]) :
                                                "" :
        contractMethod();

    return method.call().then((response: any) => {
        return {
            req: data,
            success: true,
            response
        };
    }).catch((error: any) => {
        console.log({ data, address, json, error });
        return {
            req: data,
            success: false,
            error: convertError(error)
        };
    });

}

export const sendWeb3 = async (data: any, address: any, disable: any, json: any) => new Promise(async (resolve, reject) => {
    const web3 = new Web3(Web3.givenProvider);
    const contract = new web3.eth.Contract(json?.abi || data.json.abi, address || data.address);
    const contractMethod = contract.methods[data.method]
    let userAddress = (await web3.eth.getAccounts())[0];
    const gasPrice = web3.utils.toWei("10", "gwei");
    const method = (data.params ?
        data.params.length === 1 ? contractMethod(data.params[0]) :
            data.params.length === 2 ? contractMethod(data.params[0], data.params[1]) :
                data.params.length === 3 ? contractMethod(data.params[0], data.params[1], data.params[2]) :
                    data.params.length === 4 ? contractMethod(data.params[0], data.params[1], data.params[2], data.params[3]) :
                        data.params.length === 5 ? contractMethod(data.params[0], data.params[1], data.params[2], data.params[3], data.params[4]) :
                            data.params.length === 6 ? contractMethod(data.params[0], data.params[1], data.params[2], data.params[3], data.params[4], data.params[5]) :
                                data.params.length === 7 ? contractMethod(data.params[0], data.params[1], data.params[2], data.params[3], data.params[4], data.params[5], data.params[6]) :
                                    data.params.length === 8 ? contractMethod(data.params[0], data.params[1], data.params[2], data.params[3], data.params[4], data.params[5], data.params[6], data.params[7]) :
                                        data.params.length === 9 ? contractMethod(data.params[0], data.params[1], data.params[2], data.params[3], data.params[4], data.params[5], data.params[6], data.params[7], data.params[8]) :
                                            data.params.length === 10 ? contractMethod(data.params[0], data.params[1], data.params[2], data.params[3], data.params[4], data.params[5], data.params[6], data.params[7], data.params[8], data.params[9]) :
                                                ""
        : contractMethod())


    const sendMethod = async ({ gas }: any) => {
        method.send({
            from: userAddress,
            gasPrice,
            ...(gas && { gas }),
            ...(data?.value && { value: data?.value })
        }).then((response: any) => {
            resolve(response)
        }).catch((error: any) => {
            reject(convertError(error))
        });
    }

    if (!disable?.estimateGas) await method.estimateGas({
        from: userAddress, gasPrice, data: method?.encodeABI?.(), ...(data?.value && { value: data?.value })
    }).then(async (gas: any) => {
        sendMethod({ gas })
    }).catch((error: any) => {
        reject(convertError(error))
    });
    else await sendMethod({})
})

export const changNetwork = async (params: any) => {
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainIdFormat(params.chainId) }],
        });
    } catch (switchError) {
        if (switchError.code === 4902) {
            try {
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        { ...params, chainId: chainIdFormat(params.chainId) }
                    ],
                });
            } catch (addError) {
                console.log({ addError });
            }
        }
    }

}