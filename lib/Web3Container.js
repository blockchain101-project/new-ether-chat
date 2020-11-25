import React from 'react'
import getWeb3 from './getWeb3'
import getContract from './getContract'
import contractDefinition from '../build/contracts/Chatnew.json'

export default class Web3Container extends React.Component {
  state = { web3: null, accounts: null, contract: null };

  async componentDidMount () {
    try {
      const web3 = await getWeb3()
      console.log("1")
      const accounts = await web3.eth.getAccounts()
      console.log("2")
      const contract = await getContract(web3, contractDefinition)
      console.log("3")
      this.setState({ web3, accounts, contract })
    } catch (error) {
        alert(
        `Failed to load I don't know.`
        ) 
      console.log(error)
    }
  }

  render () {
    const { web3, accounts, contract } = this.state
    return web3 && accounts
      ? this.props.render({ web3, accounts, contract })
      : this.props.renderLoading()
  }
}
