const ChatContract = artifacts.require("Chatnew");

module.exports = function(deployer) {
    deployer.deploy(ChatContract);
    // Additional contracts can be deployed here
};