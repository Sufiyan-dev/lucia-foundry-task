import { ethers } from "ethers";
import 'dotenv/config';

const HTTPS_PROVIDER = process.env.HTTPS_PROVIDER;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const EVENT_CONTRACT_ADDRESS = '0xC53D01d0634B41eb86b649f1b9D95A2D5119dCfE'; //mumbai polygon

import EVENT_CONTRACT_ABI from './abi/Event.json' assert { type: 'json' };

const provider = new ethers.providers.JsonRpcProvider(HTTPS_PROVIDER);
const signer = new ethers.Wallet(PRIVATE_KEY);
const account = signer.connect(provider);
const eventContract = new ethers.Contract(EVENT_CONTRACT_ADDRESS, EVENT_CONTRACT_ABI, account);

let overrides = {
    // gasPrice: lastGasPrice, //.mul(125).div(100), // Add 10%
    gasLimit: 2000000, // 1M gas
    // nonce: lastTxCount, // TODO: this needs to stop being incremented
    maxFeePerGas: ethers.BigNumber.from(8000000000),
    maxPriorityFeePerGas: ethers.BigNumber.from(8000000000)
    // maxPriorityFeePerGas: feeData["maxPriorityFeePerGas"], // Recommended maxPriorityFeePerGas 
    // maxFeePerGas: feeData["maxFeePerGas"], // Recommended maxFeePerGas (this and above ling doesn't work)
};

let tx = await eventContract.example(overrides)
let structTx = await eventContract.logStruct(567,678,overrides);

