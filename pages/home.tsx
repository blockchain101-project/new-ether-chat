import { Container, Grid, Label } from "semantic-ui-react";
import React, { Component } from "react";
import FriendList from "../views/friendLIst";
import Chat from "../views/chat";

class Home extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Container>
        <Grid columns={2} style={{margin: 0, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
          <Grid.Column style={{width: '30%'}}>
            <FriendList/>
          </Grid.Column>
          <Grid.Column style={{width: '70%'}}>
            <Chat/>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default Home;