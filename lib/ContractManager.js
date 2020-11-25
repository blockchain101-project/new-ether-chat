class ContractManager {
  constructor(){
    this.contract = await new web3.eth.Contract(JSON.parse(compiledContract.interface), 
                Config.ENV.ContractAddress);
  }
  
  sendMessage = async (toAddress, publicKey, message) => {
    var publicKeyBuffer = Buffer.from(publicKey, 'hex');
    var encryptedRaw = utils.encrypt(message, this.accountManager.computeSecret(publicKeyBuffer));
    var encryptedMessage = '0x' + encryptedRaw.toString('hex');
    var method = this.contract.methods.sendMessage(toAddress, encryptedMessage, utils.getEncryptAlgorithmInHex());

    this.transactionManager.executeMethod(method)
        .on(Constant.EVENT.ON_APPROVED, (txHash) => {
            this.storageManager.addMyLocalMessage(encryptedMessage, toAddress, utils.getEncryptAlgorithm(), txHash);
            appDispatcher.dispatch({
                action: Constant.EVENT.MESSAGES_UPDATED,
                data: toAddress
            });
        })
        .on(Constant.EVENT.ON_REJECTED, (data) => {
            // do nothing
        })
        .on(Constant.EVENT.ON_RECEIPT, (receipt, ) => {
            this.storageManager.updateLocalMessage(toAddress, receipt.transactionHash, Constant.SENT_STATUS.SUCCESS);
            appDispatcher.dispatch({
                action: Constant.EVENT.MESSAGES_UPDATED,
                data: toAddress
            });
        })
        .on(Constant.EVENT.ON_ERROR, (error, txHash) => {
            this.storageManager.updateLocalMessage(toAddress, txHash, Constant.SENT_STATUS.FAILED);
            appDispatcher.dispatch({
                action: Constant.EVENT.MESSAGES_UPDATED,
                data: toAddress
            });
        });
}
}

export default ContractManager;