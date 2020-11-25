import { Container, Grid, Label } from "semantic-ui-react";
import React, { Component, useEffect, useState } from "react";
import FriendList from "../views/friendLIst";
import Chat from "../views/chat";
import HomeHeader from "../views/homeHeader";
import { useRouter } from "next/router";
import Web3Container from '../lib/Web3Container';

function WebHome(props) {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(1.0);
  const router = useRouter();

  const getEthBalance = async () => {
    const { web3, accounts } = props
    const balanceInWei = await web3.eth.getBalance(accounts[0])
    const balanceInEth = balanceInWei / 1e18;
    setBalance(balanceInEth);
  };

  useEffect(async () => {
    setAccount(props.accounts[0]);
    getEthBalance();
  }, [])

  // storeValue = async () => {
  //   const { accounts, contract } = this.props
  //   await contract.methods.set(5).send({ from: accounts[0] })
  //   alert('Stored 5 into account')
  // };

  // getValue = async () => {
  //   const { accounts, contract } = this.props
  //   const response = await contract.methods.onlyMe().call({ from: accounts[0] })
  //   this.setState({ balance: response })
  // };

  return (
    <Container>
      <HomeHeader account={account} balance={balance} web3={props.web3} accounts={props.accounts} contract={props.contract}/>
      <Grid columns={2} style={{margin: 0, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
        <Grid.Column style={{width: '30%'}}>
          <FriendList web3={props.web3} accounts={props.accounts} contract={props.contract}/>
        </Grid.Column>
        <Grid.Column style={{width: '70%'}}>
          <Chat selectedContract={'none'} web3={props.web3} accounts={props.accounts} contract={props.contract}/>
        </Grid.Column>
      </Grid>
    </Container>
  )
}

const Home = () => {
  return (<Web3Container
    renderLoading={() => <Container>Loading Dapp Page...</Container>}
    render={({ web3, accounts, contract }) => (
      <WebHome accounts={accounts} contract={contract} web3={web3} />
    )}
  />)
}

export default Home;