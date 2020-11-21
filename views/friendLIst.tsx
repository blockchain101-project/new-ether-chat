import React, {Component, useEffect, useRef, useState} from 'react'
import { Grid, Card, List, Button, Container, Segment, Header, Modal, Label }from "semantic-ui-react"
import AddContractModal from "./modals/AddContractModal"

const FriendList:React.FC = () => {
  const [height, setHeight] = useState(0);
  const [openAC, setOpenAC] = useState(false);
  useEffect(() => {
    setHeight(window.innerHeight);
  }, [])
  
  useEffect(() => {}, [openAC])

  const openAddContract = () => {
    setOpenAC(!openAC);
  }

  const friendList = [];

  return (
    <Container>
      <Segment style={{width: '90%', height: ((height-150) + "px"), textAlign: 'center'}} color='blue'>
        <Header as='h2' style={{textAlign: 'left'}}>Friend List:</Header>
        <List>
          {friendList}
        </List>
        <AddContractModal
          trigger={<Button color='blue' onClick={() => {openAddContract()}}>Add friend</Button>}
          open={openAC}/>
      </Segment>
    </Container>
  )
}

export default FriendList;