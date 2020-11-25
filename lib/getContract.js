import Chatnew from "../build/contracts/Chatnew"

const getContractInstance = async (web3, contractDefinition) => {
  // get network ID and the deployed address
  // const deployedAddress = "0x3c8C1acC274dea540c5e9a69DE4512D4198A0bf7";
  // const contractDefinition = Chatnew;
  const networkId = await web3.eth.net.getId()
  const deployedAddress = contractDefinition.networks[networkId].address

  // create the instance
  const instance = new web3.eth.Contract(
    contractDefinition.abi,
    deployedAddress
  )
  return instance
}

export default getContractInstance
