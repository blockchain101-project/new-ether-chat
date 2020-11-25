import React, {Component, useEffect, useRef, useState} from 'react'
import { Grid, Card, List, Button, Container, Segment, Header, Modal, Label, Menu }from "semantic-ui-react"
import AddContractModal from "./modals/AddContractModal"

function FriendList(props){
  const [height, setHeight] = useState(0);
  const [openAC, setOpenAC] = useState(false);
  const [selected, setSelected] = useState('none');

  useEffect(async () => {
    setHeight(window.innerHeight);
  }, [])
  
  useEffect(() => {}, [openAC, selected])

  const openAddContract = () => {
    setOpenAC(!openAC);
  }

  const getContractList = () => {
    //get friend list
    const tempList = ['0x5D6Ed5a0C6f2694459c1Ef5D03684860593EeD51', 'qwer', 'zxcv'];
    let resList = [];
    for(var i=0;i<tempList.length;i++){
      const name = tempList[i]
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

  const contractList = getContractList();

  return (
    <Container>
      <Segment style={{width: '90%', height: ((height-150) + "px"), textAlign: 'center'}} color='blue'>
        <Header as='h2' style={{textAlign: 'left'}}>Contract List:</Header>
        <Menu fluid vertical borderless color='blue'>
          {contractList}
        </Menu>
        <AddContractModal
          trigger={<Button color='blue' onClick={() => {openAddContract()}}>Add contract</Button>}
          open={openAC}/>
      </Segment>
    </Container>
  )
}

export default FriendList;