import { useRouter } from 'next/router';
import React, {Component, useEffect, useState} from 'react'
import { Button, Header, Label, Menu } from 'semantic-ui-react';

function HomeHeader(props){
  useEffect(() => {console.log(props.account)}, [props.account])

  return (
    <Menu fixed='top' size='large'>
      <Menu.Item position='left'>
      <Label color='blue' size='large'>Current network:</Label>
      </Menu.Item>
      <Menu.Item position='right'>
        <Label color='blue' size='large'>{props.account}: {props.balance} Eth</Label>
      </Menu.Item>
    </Menu>
  )
}

export default HomeHeader;