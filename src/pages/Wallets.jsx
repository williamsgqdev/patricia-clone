import styled from "styled-components";
import AnnouncementBoard from "../components/AnnouncementBoard";
import Naira from "../icons/nairaW.svg";
import Bitcoin from "../icons/btcW.svg";
import Eth from "../icons/download.png";
import Sidebar from "../components/Sidebar";
import { mobile } from "../helpers/responsive";
import {Link} from "react-router-dom"
import Nav from "../components/Nav";
const Container = styled.div`
display : flex;
`;
const SecondContainer = styled.div`
  flex: 8;
  padding: 25px;
  background-color: #f4f5f8;
  ${mobile({
    padding : "15px" , 
    width: "100%"
  })}
`;
const WalletContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Wallet = styled.div`
  border-radius: 10px;
  background: white;
  width: 43%;
  padding: 30px;
  margin-bottom: 50px;
  border: 1px solid #eaeaea;
  cursor: pointer;

  &:hover {
    box-shadow: 0 5px 10px rgb(0 0 0 / 15%);
  }
  ${mobile({
    width : "100%" ,
    padding : "10px"
  })}
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;
const WalletTitle = styled.span`
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
`;
const WalletImg = styled.img`
  width: 35px;
  margin-right: 10px;
`;
const WalletStats = styled.span`
  color: #8bc34a;
`;
const WalletRate = styled.span`
  font-size: 13px;
  color: #cccccc;
`;
const Bottom = styled.div`
  margin-top: 40px;
`;
const BottomTitle = styled.p`
  font-size: 13px;
  margin-bottom: 10px;
`;

const WalletBalance = styled.h2`
  font-size: 40px;
  font-weight: 300;
  margin: 15px 0;
  color: ${(props) =>
    props.type === "naira"
      ? "#00d67d"
      : props.type === "btc"
      ? "#ff9800"
      : "#8bc34a"};

      ${mobile({
        fontSize : "25px"
      })}
`;
const WalletBalanceSmall = styled.small``;
const ButtonWrapper = styled.div`
  margin-top: 30px;
  text-align: right;
`;
const ViewButton = styled.button`
  padding: 12px 40px;
  border-radius: 5px;
  border: none;
  background: #2d9cdb;
  color: white;

  &:hover {
    background: #087ec2;
  }
`;
const Wallets = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <>
    <Nav/>
    <Container>
  <Sidebar/>
    <SecondContainer>
      <AnnouncementBoard />
      <WalletContainer>
        <Wallet>
          <Top>
            <WalletTitle>
              {" "}
              <WalletImg src={Naira} /> Naira Wallet
            </WalletTitle>
            {/* <WalletStats>-678.9</WalletStats> */}
          </Top>
          {/* <WalletRate>Rate : 50,582.28000 USD/BTC</WalletRate> */}
          <Bottom>
            <BottomTitle>Available Balance :</BottomTitle>
            <WalletBalance type="naira">
              ₦{user.nairaWallet.toLocaleString("en-US")}.00
            </WalletBalance>
            <WalletBalanceSmall>
              Book Balance :
              <strong>₦{user.nairaWallet.toLocaleString("en-US")}.00</strong>
            </WalletBalanceSmall>
            <ButtonWrapper>
            <Link to="/wallet/naira" class="link">
              <ViewButton> View </ViewButton>
              </Link>
            </ButtonWrapper>
          </Bottom>
        </Wallet>
        <Wallet>
          <Top>
            <WalletTitle>
              {" "}
              <WalletImg src={Bitcoin} width="200px" /> Naira Wallet
            </WalletTitle>
            <WalletStats>+0.60%</WalletStats>
          </Top>
          <WalletRate>Rate : 50,582.28000 USD/BTC</WalletRate>
          <Bottom>
            <BottomTitle>Available Balance :</BottomTitle>
            <WalletBalance type="btc">{user.btcWallet.toFixed(2)}00 BTC</WalletBalance>
            <WalletBalanceSmall>USD 0.00</WalletBalanceSmall>
            <ButtonWrapper>
            <Link to="/wallet/btc" class="link">
              <ViewButton> View </ViewButton>
              </Link>
            </ButtonWrapper>
          </Bottom>
        </Wallet>
        <Wallet>
          <Top>
            <WalletTitle>
              {" "}
              <WalletImg src={Eth} /> Naira Wallet
            </WalletTitle>
            <WalletStats>+0.60%</WalletStats>
          </Top>
          <WalletRate>Rate : 4,391.93284 USD/ETH</WalletRate>
          <Bottom>
            <BottomTitle>Available Balance :</BottomTitle>
            <WalletBalance type="eth">{user.ethWallet.toFixed(2)}00 ETH</WalletBalance>
            <WalletBalanceSmall>USD 0.00</WalletBalanceSmall>
            <ButtonWrapper>
              <Link to="/wallet/eth" class="link">
              <ViewButton> View </ViewButton>
              </Link>
             
            </ButtonWrapper>
          </Bottom>
        </Wallet>
      </WalletContainer>
    </SecondContainer>
    </Container>
    </>
  );
};

export default Wallets;
