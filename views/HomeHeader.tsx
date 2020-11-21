import React, {Component} from 'react'
import { Button, Header, Label, Menu } from 'semantic-ui-react';

const HomeHeader:React.FC = () => {
  return (
    <Menu fixed='top' size='large'>
      <Menu.Item position='left'>
        <Button color='blue'>{'< Logout'}</Button>
      </Menu.Item>
      <Menu.Item position='right'>
        <Label color='blue' size='large'>0xasdfasdfasdfasdf : 0 Eth</Label>
      </Menu.Item>
    </Menu>
  )
}

export default HomeHeader;