import styled from "styled-components";
import { useState } from "react";
import EditUserModal from "./EditUserModal";
import {mobile} from "../helpers/responsive"
const Container = styled.div``;

const UserContainer = styled.div`
  padding: 30px;
  background: white;
  margin: 20px 0;
  border-radius: 10px;
  ${mobile({
    margin: "10px 0"
  })}
`;  
const UserTitle = styled.h3`
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 30px;
`;
const UserDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Details = styled.div`
  margin-right: 70px;
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  font-size: 12px;
  color: #cccccc;
  font-weight: 500;
`;
const UserInput = styled.input`
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #c4c4c4;
  background: #f4f5f8;
  border-radius: 5px;
  margin-bottom: 12px;
  font-size: 12px;
  width: 200px;
`;

const ButtonWrapper = styled.div``;
const UserButton = styled.button`
  padding: 10px 40px;
  background: #2d9cdb;
  display: block;
  color: white;
  text-align: center;
  font-size: 13px;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  border: none;
  &:hover {
    background: #087ec2;
  }
`;
const ReferralContainer = styled.div`
  padding: 30px;
  background: white;
  margin: 20px 0;
  border-radius: 10px;
  ${mobile({
    margin : "0px" ,
    padding : "10px"
  })}
`;
const ReferralTitle = styled.h2`
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 27px;
`;
const ReferralDetailContainer = styled.div`
  display: flex;
  ${mobile({
    flexDirection : "column" ,
    width : "100%"
  })}
`;
const ReferralDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 20px;
  padding: 10px;
`;
const ReferralInput = styled.input`
  padding: 10px;
  flex: 2;
  border: 1px solid #c4c4c4;
`;
const ReferralButton = styled.input`
  border: none;
  background: #2d9cdb;
  color: white;
  padding: 12px;
`;
const ProfileTab = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [codeCopied, setCodeCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);


  const handelCopy = async (item) => {
    if (item === user.ethAddress) {
      setCodeCopied(true);
      setTimeout(() => {
        setCodeCopied(false);
      }, 2000);
    } else if (item === user.btcAddress) {
      setLinkCopied(true);
      setTimeout(() => {
        setLinkCopied(false);
      }, 2000);
    }
    await navigator.clipboard.writeText(item);

  };

  const [show , setShow] = useState(false)
  console.log(show);

  return (
    <Container>
      
      <UserContainer>
        <UserTitle>User</UserTitle>
        <UserDetails>
          <Details>
            <Label>First Name</Label>
            <UserInput
              placeholder="Enter your first name"
              value="Williams"
              disabled
            />
          </Details>
          <Details>
            <Label>Last Name</Label>
            <UserInput
              placeholder="Enter your last name"
              value="Agbunu"
              disabled
            />
          </Details>
          <Details>
            <Label>Phone Number</Label>
            <UserInput
              placeholder="Enter your Phone Number"
              value="+2347058552020"
              disabled
            />
          </Details>
          <Details>
            <Label>Email Address</Label>
            <UserInput
              placeholder="Enter your Phone Number"
              value="williamsagbunu@gmail.com"
              disabled
            />
          </Details>
        </UserDetails>
        <ButtonWrapper>
          <UserButton onClick={()=>setShow(true)}>Edit Profile</UserButton>
        </ButtonWrapper>
      </UserContainer>

      <ReferralContainer>
        <ReferralTitle>crypto Addresses</ReferralTitle>
        <ReferralDetailContainer>
          <ReferralDetails>
            <Label>Eth Address</Label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <ReferralInput value={user.ethAddress} readOnly />
              <ReferralButton
                type="button"
                value={codeCopied ? "Copied" : "Copy Code"}
                onClick={() => {
                  handelCopy(user.ethAddress);
                }}
              />
            </div>
          </ReferralDetails>
          <ReferralDetails>
            <Label>btc Address</Label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <ReferralInput value={user.btcAddress} readOnly />
              <ReferralButton
                type="button"
                value={linkCopied ? "Copied" : "Copy Link"}
                onClick={() => {
                  handelCopy(user.btcAddress);
                }}
              />
            </div>
          </ReferralDetails>
        </ReferralDetailContainer>
      </ReferralContainer>
    { show && <EditUserModal setShow={setShow} />}
    </Container>
  );
};

export default ProfileTab;
