import React, { useEffect, useState } from 'react'
import {Container, Card, Segment, Label, Icon, List} from 'semantic-ui-react'

const Chat = () => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(window.innerHeight);
  }, [])
  
  return (
    <Container>
      <Segment style={{width: '90%', height: (height-150) + "px"}} color='blue'>
        <List>
          <List.Item style={{textAlign: 'left'}}>
            <Label size='large' color='blue'>left</Label>
          </List.Item>
          <List.Item style={{textAlign: 'right'}}>
            <Label size='large' color='blue'>right</Label>
          </List.Item>
        </List>
      </Segment>
    </Container>
  )
}

export default Chat;