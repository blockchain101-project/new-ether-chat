import React, { Component, useEffect, useState } from "react"
import { Button, Label, Modal } from "semantic-ui-react"

function AddContractModal(props){
  const [open, setOpen] = useState(true);
  const [width, setWidth] = useState(0);
  const [value, setValue] = useState('');

  useEffect(() => {
    setWidth(window.innerWidth);
  }, [])

  useEffect(() => {
    setOpen(!open);
  }, [props.open])

  const confirmAddContract = async () => {
    const { web, accounts, contract } = props;
    if(value!=accounts){
      await contract.methods.addFriend(value).send({ from: accounts[0] });
      setOpen(!open);
    } else {
      alert("Friend address cannot be the same with your address.");
    }
    
  }

  const closeModal = () => {
    setOpen(!open);
  }

  return (
    <Modal trigger={props.trigger} open={open}>
      <Modal.Content style={{textAlign: 'center'}}>
        <label>Public key:</label>
        <input size={width*5/100} placeholder='public key' style={{marginLeft: '10px'}}
        value={value} onChange={e => setValue(e.target.value)}></input>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => {confirmAddContract()}}>confirm</Button>
        <Button onClick={() => {closeModal()}}>cancel</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default AddContractModal;