import { ethers } from "ethers";
import 'dotenv/config';
import EVENT_CONTRACT_ABI from './abi/Event.json' assert { type: 'json' };
const PRIVATE_KEY = process.env.PRIVATE_KEY;

async function listener() {
  const WSS_PROVIDER = process.env.WSS_PROVIDER;
  const EVENT_CONTRACT_ADDRESS = '0xC53D01d0634B41eb86b649f1b9D95A2D5119dCfE'; //mumbai polygon
  const provider = new ethers.providers.WebSocketProvider(WSS_PROVIDER);
  const signer = new ethers.Wallet(PRIVATE_KEY);
  const account = signer.connect(provider);
  const eventContract = new ethers.Contract(EVENT_CONTRACT_ADDRESS, EVENT_CONTRACT_ABI, account);
  
  eventContract.on("Log", (message, val, event) => {
  	let info = {
  	  message: message,
  	  val: val.toString()
  	}
  	console.log(JSON.stringify(info,null,4));
  })

  eventContract.on("IndexedLog", (sender, val, event) => {
  	let info = {
  	  sender: sender,
  	  val: val.toString()
  	}
  	console.log(JSON.stringify(info,null,4));
  })

  eventContract.on("LogMyStruct", (instance, event) => {
  	let info = {
  		instance: instance
  	}
  	console.log(JSON.stringify(info,null,4));
  })
}

listener()