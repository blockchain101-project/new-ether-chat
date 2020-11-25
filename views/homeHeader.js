import React, {Component, useEffect, useState} from 'react'
import { Button, Container, Header, Label, Menu } from 'semantic-ui-react';
import AddAddressModal from "../views/modals/AddAddressModal"

function HomeHeader(props){
  const [isMember, setIsMember] = useState(false);
  const [openAA, setOpenAA] = useState(false);

  useEffect(async () => {
    const { web, accounts, contract } = props;
    const member = await contract.methods.members(accounts[0]).call({ from: accounts[0] });
    if(member.isMember){
      setIsMember(true);
      setOpenAA(false);
    } else {
      setOpenAA(true);
    }
  })
  useEffect(() => {console.log(props.account)}, [props.account])

  return (
    <Container>
      <Menu fixed='top' size='large'>
        <Menu.Item position='left'>
          <Label color='blue' size='large'>Current network:</Label>
        </Menu.Item>
        <Menu.Item position='right'>
          <Label color='blue' size='large'>{props.account}: {props.balance} Eth</Label>
        </Menu.Item>
      </Menu>
      <AddAddressModal open={openAA} web3={props.web3} accounts={props.accounts} contract={props.contract}/>
    </Container>
  )
}

export default HomeHeader;