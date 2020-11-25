import Web3 from "web3";
import Chatnew from "../build/contracts/Chatnew.json";

let web3 = null;
// if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
//     window.ethereum.enable();
//     web3 = (window as any).web3;
//   }

if (typeof window !== 'undefined'){
    window.ethereum.enable();
    if (typeof web3 !== 'undefined') {
        window.web3Provider = web3.currentProvider;
        web3 = new Web3(web3.currentProvider);
      } else {
        // If no injected web3 instance is detected, fallback to Truffle Develop.
        window.web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:9545');
        web3 = new Web3(window.web3Provider);
      }
}

// replace this with address from step above
const contractAddr = '0x3c8C1acC274dea540c5e9a69DE4512D4198A0bf7';

// const chatContract = await new web3.eth.Contract(JSON.parse(Chatnew), 
//                 Config.ENV.ContractAddress)
const chatContract: any = getContract(Chatnew, contractAddr);

export function getContract(abi: object, address: string) {
    return new web3.eth.contract(abi).at(address);
}

export function getAccount(): string {
    return web3.eth.defaultAccount;
}

export async function getToken(address?: string): Promise<number> {
    address = address || getAccount();
    const result = await promisify((f) => chatContract.balanceOf(address, f));
    return result.toNumber();
}

export function promisify(fn: (cb: any) => any): Promise<any> {
    return new Promise((resolve, reject) => {
        fn((err: any, result: any) => {
            if (err) {
                return reject(err);
            }

            resolve(result);
        });
    });
}

export async function transferToken(amount: number, to: string): Promise<void> {
    await promisify((f) => chatContract.transfer(amount, to, f));
}