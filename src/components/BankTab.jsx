import React, { useState } from "react";
import styled from "styled-components";
import BankModal from "./BankModal";

const Container = styled.div`
  padding: 30px;
  background: white;
  margin: 20px 0;
  border-radius: 10px;
  margin-bottom: 50px;
`;
const Title = styled.p`
  margin-bottom: 20px;
`;
const Button = styled.button`
  padding: 10px 20px;
  color: white;
  background: #2d9cdb;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #087ec2;
  }
`;
const BankTab = () => {
    const [show , setShow] = useState(false)
  return (
    <Container>
      <Title>No bank account available</Title>
      <Button onClick={()=> setShow(true)}>Add a new Bank Account</Button>
    { show && <BankModal setShow={setShow}/>}

    </Container>
  );
};

export default BankTab;
