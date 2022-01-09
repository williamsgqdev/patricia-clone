import { useState } from "react";
import styled from "styled-components";
import AnnouncementBoard from "../components/AnnouncementBoard";
import BankTab from "../components/BankTab";
import Nav from "../components/Nav";
import ProfileTab from "../components/ProfileTab";
import Sidebar from "../components/Sidebar"
import { mobile } from "../helpers/responsive";
const Container = styled.div`
display: flex;
`
const SecondContainer = styled.div`
  flex: 8;
  padding: 25px;
  background-color: #f4f5f8;
  ${mobile({
    padding : "10px"
  })}
`;
const TabNav = styled.div`
  display: flex;
  margin-top: 30px;
  background: white;
  justify-content: space-around;
`;
const TabNavItem = styled.p`
  font-size: 20px;
  color: #888888;
  padding: 20px 20px;
  flex: 1;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #f4f5f8;
    color: black;
  }
`;
const TabsContainer = styled.div``;

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profileTab");
  return (
    <>
    <Nav/>
    <Container>
      <Sidebar/>
      <SecondContainer>
      <AnnouncementBoard />
      <TabNav>
        <TabNavItem
          style={{
            color: activeTab === "profileTab" ? "black" : "#888888",
            borderBottom:
              activeTab === "profileTab" ? "2px solid #2d9cdb" : "none",
          }}
          onClick={() => setActiveTab("profileTab")}
        >
          Profile
        </TabNavItem>
        <TabNavItem
        style={{
          color: activeTab === "bankTab" ? "black" : "#888888",
          borderBottom:
            activeTab === "bankTab" ? "2px solid #2d9cdb" : "none",
        }}
          onClick={() => setActiveTab("bankTab")}
        >
          Bank Account
        </TabNavItem>
        {/* <TabNavItem>Notifications</TabNavItem>
             <TabNavItem>Security</TabNavItem>
             <TabNavItem>Verification</TabNavItem> */}
      </TabNav>
      <TabsContainer>
        {activeTab === "profileTab" ? (
          <ProfileTab />
        ) : activeTab === "bankTab" ? (
          <BankTab />
        ) : (
          "ok"
        )}
      </TabsContainer>
      </SecondContainer>
    </Container>
    </>
  );
};

export default Settings;
