import React, { Component, useEffect, useState } from "react"
import { Button, Label, Modal } from "semantic-ui-react"

interface Prop {
  trigger: React.ReactNode,
  open: boolean
}

const AddContractModal:React.FC<Prop> = (props) => {
  const [open, setOpen] = useState(true);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, [])

  useEffect(() => {
    setOpen(!open);
  }, [props.open])

  const closeModal = () => {
    setOpen(!open);
  }

  return (
    <Modal trigger={props.trigger} open={open}>
      <Modal.Content style={{textAlign: 'center'}}>
        <label>Public key:</label>
        <input size={width*5/100} placeholder='public key' style={{marginLeft: '10px'}}></input>
      </Modal.Content>
      <Modal.Actions>
        <Button>confirm</Button>
        <Button onClick={() => {closeModal()}}>cancel</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default AddContractModal;