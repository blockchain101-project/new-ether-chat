import React, { useEffect, useState } from 'react'
import {Container, Card, Segment, Label, Icon, List, Button, Grid, Input} from 'semantic-ui-react'

function Chat(props){
  const [height, setHeight] = useState(0);
  const [text, setText] = useState('');
  const [friendList, setFriendList] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async (address, message) => {
    const { web, accounts, contract } = props;
    await contract.methods.sendMessage(address, message).send({ from: accounts[0] });
  };

  useEffect(async () => {
    setHeight(window.innerHeight);
    const temp = await getPastFriendList();
    let newTemp = [];
    for(var i=0;i<temp.length;i++){
      newTemp.push(temp[i].returnValues[1]);
    }
    setFriendList(newTemp);
  }, [])

  useEffect(async () => {
    const tempMessages = await getUserMessages(friendList[0])
    setMessages(tempMessages);
  }, [friendList])

  const getUserMessages = async (contractAddress) => {
    const tempMessage = await getMessage(contractAddress);
    tempMessage.sort(function(a, b){
      if(a[1] > b[1]) return 1;
      if(a[1] < b[1]) return -1;
      return 0;
    })

    let tempList = [];
    for (var i=0;i<tempMessage.length;i++) {
      if (tempMessage[i][0]==0){
        tempList.push(
          <List.Item style={{textAlign: 'right'}}>
            <Label size='large' color='blue'>{tempMessage[i][2]}</Label>
          </List.Item>
          )
      } else {
        tempList.push(
          <List.Item style={{textAlign: 'left'}}>
            <Label size='large' color='blue'>{tempMessage[i][2]}</Label>
          </List.Item>
          )
      }
    }



    return tempList
  }

  const getPastFriendList = async () => {
    const { web, accounts, contract } = props;
    return await props.contract.getPastEvents('addFriendEvent',{
      filter: {from: accounts},
        fromBlock: 0,
        toBlock: 'latest',
    })
  }

  const getMessage = async (id) => {
    const { web, accounts, contract } = props;
    const tempDataSent = await props.contract.getPastEvents('messageSentEvent',{
      filter: {from: accounts, to: id},
        fromBlock: 0,
        toBlock: 'latest',
    })
    const tempDataReceived = await props.contract.getPastEvents('messageSentEvent',{
      filter: {to: accounts, from: id},
        fromBlock: 0,
        toBlock: 'latest',
    })
    const tempMessage = []

    for(var i=0;i<tempDataSent.length;i++){
      if(tempDataSent[i].returnValues[1] == id){
        console.log(tempDataSent[i])
        tempMessage.push([0, tempDataSent[i].blockNumber, tempDataSent[i].returnValues[2]])
      }
    }

    for(var i=0;i<tempDataReceived.length;i++){
      if(tempDataReceived[i].returnValues[0] == id){
        tempMessage.push([1, tempDataReceived[i].blockNumber, tempDataReceived[i].returnValues[2]])
      }
    }

    return tempMessage
  }
  
  return (
    <Container>
      <Segment style={{width: '90%', height: (height-230) + "px"}} color='blue'>
        <List>
          {messages}
        </List>
      </Segment>
      <Segment style={{width: '90%'}} color='blue'>
        <Input style={{width: '100%'}} 
        onChange={e => setMessage(e.target.value)}
        action={{color: 'blue', labelPosition: 'right', icon: 'send', content: 'Send', onClick: (e)=>{sendMessage(friendList[0], message)}}}></Input>
      </Segment>
    </Container>
  )
}

export default Chat;