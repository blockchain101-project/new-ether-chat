import React, {Component} from 'react'
import {
  Card, Container, Header
} from "semantic-ui-react"

class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Card>
          <Header>Welcome to chat</Header>
        </Card>
      </Container>
    )
  };
}

export default Index;
