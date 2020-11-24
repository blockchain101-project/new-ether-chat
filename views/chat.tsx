import React, { useEffect, useState } from 'react'
import {Container, Card, Segment, Label, Icon, List, Button, Grid, Input} from 'semantic-ui-react'

interface ChatInterface {
  selectedContract: string;
}

const Chat:React.FC<ChatInterface> = (props) => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(window.innerHeight);
  }, [])

  const getUserMessages = (contractAddress: string) => {
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
        <Input style={{width: '100%'}} action={{color: 'blue', labelPosition: 'right', icon: 'send', content: 'Send'}}></Input>
      </Segment>
    </Container>
  )
}

export default Chat;