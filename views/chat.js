import React, { useEffect, useState } from 'react'
import {Container, Card, Segment, Label, Icon, List, Button, Grid, Input} from 'semantic-ui-react'

function Chat(props){
  const [height, setHeight] = useState(0);
  const [text, setText] = useState('');

  const sendMessage = async (message) => {
    const { web, accounts, contract } = props
    const member = await contract.methods.members(accounts[0]).call({ from: accounts[0] });
    alert(member.isMember);
    // await contract.methods.sendMessage(accounts[0], message).send({ from: accounts[0] });
    // contract.once('messageSentEvent', {
    //   filter: {}}, function(error, event){ console.log(event) });
  };

  useEffect(() => {
    setHeight(window.innerHeight);
  }, [])

  const getUserMessages = (contractAddress) => {
    return [
    <List.Item style={{textAlign: 'left'}}>
      <Label size='large' color='blue'>messages</Label>
    </List.Item>
    ]
  }

  const messages = getUserMessages("this user")
  messages.concat(getUserMessages("other user"));
  
  return (
    <Container>
      <Segment style={{width: '90%', height: (height-230) + "px"}} color='blue'>
        <List>
          {messages}
        </List>
      </Segment>
      <Segment style={{width: '90%'}} color='blue'>
        <Input style={{width: '100%'}} action={{color: 'blue', labelPosition: 'right', icon: 'send', content: 'Send', onClick: (e)=>sendMessage(e.target.value)}}></Input>
      </Segment>
    </Container>
  )
}

export default Chat;