import React, {Component, useEffect, useRef, useState} from 'react'
import { Grid, Card, List, Button, Container, Segment, Header, Modal, Label, Menu }from "semantic-ui-react"
import AddContractModal from "./modals/AddContractModal"

function FriendList(props){
  const [height, setHeight] = useState(0);
  const [openAC, setOpenAC] = useState(false);
  const [selected, setSelected] = useState('none');
  const [contractList, setContractList] = useState([]);

  useEffect(async () => {
    setHeight(window.innerHeight);
    const temp = await getContractList();
    setContractList(temp);
  }, [])
  
  useEffect(() => {}, [openAC, selected, contractList])

  const openAddContract = () => {
    setOpenAC(!openAC);
  }

  const getPastFriendList = async () => {
    const { web, accounts, contract } = props;
    return await props.contract.getPastEvents('addFriendEvent',{
      filter: {from: accounts},
    })
  }

  const getContractList = async () => {
    //get friend list
    const tempList = await getPastFriendList();
    let resList = [];
    for(var i=0;i<tempList.length;i++){
      const name = tempList[i].returnValues[1]
      resList.push(
        <Menu.Item
          name={name}
          active={selected===name}
          onClick={() => {setSelected(name)}}
        />
      )
    }

    return resList;
  }

  return (
    <Container>
      <Segment style={{width: '90%', height: ((height-150) + "px"), textAlign: 'center'}} color='blue'>
        <Header as='h2' style={{textAlign: 'left'}}>Contract List:</Header>
        <Menu fluid vertical borderless color='blue'>
          {contractList}
        </Menu>
        <AddContractModal
          trigger={<Button color='blue' onClick={() => {openAddContract()}}>Add contract</Button>}
          open={openAC}
          web3={props.web3} accounts={props.accounts} contract={props.contract}/>
      </Segment>
    </Container>
  )
}

export default FriendList;