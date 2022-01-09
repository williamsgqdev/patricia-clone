import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import navOpen from "../icons/menu_icon_v.svg";
import navClose from "../icons/menu_icon_h.svg";
import LogoImg from "../icons/logo.png";
import NotificationIcon from "../icons/notification_icon.9d9829b6.svg";
import { close, open } from "../redux/sidebarSlice";
import { mobile } from "../helpers/responsive";
import mLogo from "../icons/m-logo.png";
import { Link } from "react-router-dom";
const Container = styled.div`
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  width: 100%;
  background-color: #fff;
  height: 70px;
  ${mobile({
    height: "50px",
  })}
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 25px;
  ${mobile({
    padding: "0px",
  })}
`;
const Left = styled.div`
  ${mobile({
    display: "flex",
    width: "100%",
    padding: "10px",
    justifyContent: "space-between",
  })}
`;
const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${mobile({ display: "none" })}
`;
const Logo = styled.img`
  width: 147px;
  margin-left: 35px;
  ${mobile({
    display: "none",
  })}
`;
const MLogo = styled.img`
  display: none;
  ${mobile({
    marginLeft: "0px",
    display: "block",
    width: "30px",
  })}
`;
const MenuController = styled.img`
  margin-left: 6rem;
  ${mobile({
    marginLeft: "0px",
  })}
`;
const Balance = styled.h4`
  color: #2d9cdb;
  font-size: 19px;
  font-weight: 500;
`;
const Notification = styled.img`
  margin: 0 20px;
`;

const Menu = styled.div``;

const Nav = () => {
  const checkOpen = useSelector((state) => state.sidebar.isOpened);

  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();

  const handleSidebar = () => {
    checkOpen ? dispatch(close()) : dispatch(open());
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/">
            <Logo src={LogoImg} />
            <MLogo src={mLogo} />
          </Link>

          <MenuController
            src={checkOpen ? navOpen : navClose}
            onClick={handleSidebar}
          />
        </Left>
        <Right>
          <Balance>
            Balance : ₦{user.nairaWallet.toLocaleString("en-US")}.00
          </Balance>
          <Notification src={NotificationIcon} />
        </Right>
      </Wrapper>
      <Menu></Menu>
    </Container>
  );
};

export default Nav;
