import { useRouter } from 'next/router';
import React, {Component, useEffect, useState} from 'react'
import { Button, Header, Label, Menu } from 'semantic-ui-react';

const HomeHeader:React.FC = () => {
  const [isMetamask, setIsMetamask] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if(!isMetamask){
      router.push({
        pathname: '/'
      });
    }
  }, [])

  useEffect(() => {
    if(!isMetamask){
      router.push({
        pathname: '/'
      });
    }
  }, [isMetamask])

  return (
    <Menu fixed='top' size='large'>
      <Menu.Item position='left'>
      <Label color='blue' size='large'>Welcome to chat!</Label>
      </Menu.Item>
      <Menu.Item position='right'>
        <Label color='blue' size='large'>0xasdfasdfasdfasdf : 0 Eth</Label>
      </Menu.Item>
    </Menu>
  )
}

export default HomeHeader;