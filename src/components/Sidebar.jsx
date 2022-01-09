import styled from "styled-components";
import "../helpers/Router.css";
import DashboardIcon from "../icons/dashboard.svg";
import TransactionIcon from "../icons/transaction.svg";
import WalletIcon from "../icons/wallet.svg";
import SettingsIcon from "../icons/settings.svg";
import { useDispatch, useSelector } from "react-redux";
import { PowerSettingsNewOutlined } from "@material-ui/icons";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { NavLink } from "react-router-dom";
import { mobile } from "../helpers/responsive";
import { close } from "../redux/sidebarSlice";

const Container = styled.div`
  background-color: #fff;
  @media (max-width: 768px) {
    display: ${(props) => (props.checkOpen !== true ? "none" : "block")};
  }
`;
const Navigation = styled.ul`
  position: sticky;
  top: 70px;
  padding: 5px 0;
  display: flex;
  flex-direction: column;
  ${mobile({
    position : "fixed" ,
    top : "50px" ,
    width : "80%" ,
    background : "#fff" ,
    height  : "100%"
  })}
`;

const NavigationItem = styled.li`
  margin: ${(props) => (props.checkOpen !== true ? "3px" : "0 40px")};
  list-style-type: none;
  margin-bottom: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-shadow: ${(props) =>
    props.on === "true" && "0 5px 10px rgb(0 0 0 / 15%) "};
  border-radius: 5px;
  padding: 5px;
  width: ${(props) => (props.checkOpen === true ? "200px" : "fit-content")};
  cursor: pointer;
  color: ${(props) =>
    props.active === "true" ? "#000" : "hsla(0, 0%, 60.4%, 0.5) !important"};
  &:hover {
    box-shadow: 0 5px 10px rgb(0 0 0 / 15%);
    color: black !important;
  }
`;
const Image = styled.img`
  padding: 10px;
`;
const Path = styled.span`
  display: ${(props) => (props.checkOpen !== true ? "none" : "block")};
  font-size: 16px;
  margin: 0 35px 0 15px;
`;

const Sidebar = () => {
  const checkOpen = useSelector((state) => state.sidebar.isOpened);
  const dispatch = useDispatch()
  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.clear();
    });
  };

  const handleAutoClose = () =>{
    if(window.screen.width <= 800){
      dispatch(close())
    }
  }
  return (
    <Container checkOpen={checkOpen}>
      <Navigation>
        <NavigationItem checkOpen={checkOpen} onClick={handleAutoClose}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "link")}
          >
            <Image src={DashboardIcon} />
            <Path checkOpen={checkOpen}>DashBoard</Path>
          </NavLink>
        </NavigationItem>

        <NavigationItem checkOpen={checkOpen} onClick={handleAutoClose}>
          <NavLink
            to="/transactions"
            className={({ isActive }) => (isActive ? "active" : "link")}
          >
            <Image src={TransactionIcon} />
            <Path checkOpen={checkOpen}>Transactions</Path>
          </NavLink>
        </NavigationItem>

        <NavigationItem checkOpen={checkOpen} onClick={handleAutoClose}>
          <NavLink
            to="/wallet"
            className={({ isActive }) => (isActive ? "active" : "link")}
          >
            <Image src={WalletIcon} />
            <Path checkOpen={checkOpen}>Wallet</Path>
          </NavLink>
        </NavigationItem>

        <NavigationItem checkOpen={checkOpen} onClick={handleAutoClose}>
          <NavLink
            to="/settings"
            className={({ isActive }) => (isActive ? "active" : "link")}
          >
            <Image src={SettingsIcon} />
            <Path checkOpen={checkOpen}>Settings</Path>
          </NavLink>
        </NavigationItem>
        <NavigationItem checkOpen={checkOpen} onClick={handleLogout}>
          <PowerSettingsNewOutlined
            style={{
              color: "hsla(0, 0%, 60.4%, 0.5) !important",
              paddingLeft: "10px",
            }}
          />
          <Path checkOpen={checkOpen}>Logout</Path>
        </NavigationItem>
      </Navigation>
    </Container>
  );
};

export default Sidebar;
