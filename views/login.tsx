import React, {Component, useEffect, useState} from 'react'
import {
  Button,
  Card, Container, Form, Grid, Header, Label
} from "semantic-ui-react";
import { Router, useRouter } from 'next/router';
import styled from 'styled-components';
import 'semantic-ui-css/semantic.min.css';

const Login = () => {
  const [isMetamask, setIsMetamask] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if(isMetamask){
      router.push({
        pathname: '/home'
      });
    }
  }, [])

  useEffect(() => {
    if(isMetamask){
      router.push({
        pathname: '/home'
      });
    }
  }, [isMetamask])

  return(
    <Grid style={{margin: 0, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
      <Grid.Row centered>
        <Card color='blue'>
          <Card.Content>
            <Card.Header as='h2' textAlign='center'>You need to login to Metamask before being able to use this app.</Card.Header>
            {/* <Form size='large' onSubmit={() => onSubmit()}>
              <Form.Field>
                <label style={{textAlign: 'left'}}>Public key</label>
                <input placeholder="public key"></input>
              </Form.Field>
              <Form.Field>
                <label style={{textAlign: 'left'}}>Private key</label>
                <input placeholder="private key"></input>
              </Form.Field>
              <Button color='blue'>Login</Button>
            </Form> */}
          </Card.Content>
        </Card>
      </Grid.Row>
    </Grid>
  )
}

export default Login;