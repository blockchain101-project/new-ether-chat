import React, { useEffect, useState } from 'react'
import {Container, Card, Segment, Label, Icon, List} from 'semantic-ui-react'

const Chat = () => {
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
      <Segment style={{width: '90%', height: (height-150) + "px"}} color='blue'>
        <List>
          {messages}
        </List>
      </Segment>
    </Container>
  )
}

export default Chat;