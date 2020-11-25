import React, { Component, useEffect, useState } from "react"
import { Button, Label, Modal } from "semantic-ui-react"

function AddAddressModal(props){
  const [open, setOpen] = useState(true);
  const [width, setWidth] = useState(0);
  const [value, setValue] = useState('');

  useEffect(() => {
    setWidth(window.innerWidth);
  }, [])

  useEffect(() => {
    setOpen(!open);
  }, [props.open])

  const confirmAddAddress = async () => {
    const { web, accounts, contract } = props;
    await contract.methods.register(value).send({ from: accounts[0] });
    setOpen(!open);
  }

  return (
    <Modal trigger={props.trigger} open={open}>
      <Modal.Content style={{textAlign: 'center'}}>
        <label>You are not register, please enter you public key below.</label>
        <br/>
        <label>Public key:</label>
        <input size={width*5/100} placeholder='public key' style={{marginLeft: '10px'}}
        value={value} onChange={e => setValue(e.target.value)}></input>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => {confirmAddAddress()}}>confirm</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default AddAddressModal;