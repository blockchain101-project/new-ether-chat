const Web3 = require("web3");

class AccountManager{

  ethEnabled() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      return true;
    }
    return false;
  }
  
  getAccounts() {
    return web3.eth.defaultAccount;
  }
}

export default AccountManager;