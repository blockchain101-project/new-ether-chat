import Chatnew from "../build/contracts/Chatnew"

const getContractInstance = async () => {
  // get network ID and the deployed address
  const deployedAddress = "0x3c8C1acC274dea540c5e9a69DE4512D4198A0bf7";
  const contractDefinition = Chatnew;

  // create the instance
  const instance = web3.eth.contract(
    contractDefinition,
    deployedAddress
  )
  return instance
}

export default getContractInstance
