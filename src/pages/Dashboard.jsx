import styled from "styled-components";
import Bitcoin from "../icons/btc.svg";
import A2S from "../icons/airtime2cash.svg";
import AnnouncementBoard from "../components/AnnouncementBoard";
import GloverCart from "../icons/glover-banner.png";
import Gloverads from "../icons/gloverads.svg";
import BitcoinService from "../icons/bitcoinService.svg";
import EthService from "../icons/eth.png";
import RefilService from "../icons/refill.svg";
import Pending from "../icons/pending.svg";
import Paid from "../icons/paid.svg";
import Declined from "../icons/declined.svg";
import Wallet from "../icons/walletIcon.svg";
import Check from "../icons/check-tick.svg";
import Sidebar from "../components/Sidebar";
import { mobile } from "../helpers/responsive";
import { useSelector } from "react-redux";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
const Container = styled.div`
  display: flex;
`;
const Secondontainer = styled.div`
  flex: 8;
  ${mobile({ width: "100%" })}
`;
const Wrapper = styled.div`
  padding: 25px;
  background-color: #f4f5f8;
  background-image: url("");
  ${mobile({ padding: "10px" })}
`;

const Welcome = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
  ${mobile({ flexDirection: "column", paddingLeft: "12px" })}
`;
const UserContainer = styled.div`
  flex: 1;
  padding-left: 10px;
  ${mobile({ marginBottom: "20px", paddingLeft: "0px" })}
`;
const Username = styled.p`
  font-size: 30px;
  letter-spacing: 2px;
  color: #2d9cdb;
  font-weight: 450;
  margin-bottom: 15px;
  ${mobile({ fontSize: "25px" })}
`;
const WelcomeText = styled.small`
  color: #777777;
  font-size: 15px;
`;
const QuickAction = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const QuickActionText = styled.small`
  flex: 2;
  ${mobile({ flexDirection: "column" })}
`;
const QuickActionButtonWrapper = styled.div`
  justify-self: flex-end;
  align-self: flex-end;
  text-align: left;
`;
const QuickActionButton = styled.button`
  margin-bottom: 17px;
  padding: 5px 40px;
  display: flex;
  align-items: center;
  border: 1px solid #2d9cdb;
  border-radius: 60px;
  background: #fff;
  color: #2d9cdb;
  width: 100%;
  font-weight: 500;
  ${mobile({ marginBottom: "7px" })}

  &:hover {
    background: linear-gradient(
      276.13deg,
      #08c8f6 2.06%,
      #2d9cdb 94.79%
    ) !important;
    color: white;
  }
  ${mobile({ padding: "5px 20px" })}
`;
const ImgAction = styled.img`
  margin-right: 10px;
  width: 25px;
`;
const MainContent = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
const TradeContainer = styled.div`
  /* width: 65%; */
  flex: 8;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;
const TradeSection = styled.div`
  background-color: #fafafb;
  padding: 40px 20px;
  border-radius: 10px;
`;
const FirstContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 70px;
  background: #fafafb;
  ${mobile({ flexDirection: "column" })}
`;
const BalanceContainer = styled.div`
  padding: 17px 20px;
  background-color: #fff;
  flex: 1;
  margin-right: 30px;
  border-radius: 10px;
  ${mobile({ width: "90%", padding: "20px 10px", marginBottom: "20px" })}
`;
const BalanceTitle = styled.p`
  font-size: 17px;
  color: #777777;
  margin-bottom: 20px;
`;
const Balance = styled.p`
  font-size: 20px;
  color: #2d9cdb;
`;
const FAdsContainer = styled.div`
  flex: 3;
  display: flex;
  justify-content: space-between;
  background-color: #e8f7fe;
  border-radius: 10px;
  padding-top: 15px;
  ${mobile({
    width: "100%",
    paddingTop: "20px 10px",
    backgroundImage: `url(${A2S})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom right",
  })}
`;
const FAdsTexts = styled.div`
  padding: 10px 20px;
`;
const FAdsText = styled.p`
  font-weight: 500;
  margin-bottom: 10px;
`;
const FAdsTextSmall = styled.small`
  font-size: 13px;
  font-weight: 500;
`;
const FAdsLink = styled.p`
  font-size: 14px;
  margin-top: 30px;
  color: #2d9cdb;
  font-weight: 500;
`;
const FAdsImgContainer = styled.div``;
const FAdsImg = styled.img`
  ${mobile({ display: "none" })}
`;

const SecondContent = styled.div`
  display: flex;
  background-color: #f0eefe;
  padding: 30px 50px 0px 50px;
  border-radius: 10px;
  ${mobile({ flexDirection: "column" })}
`;
const AdsImgContainer = styled.div`
  margin-right: 50px;
`;
const AdsImg = styled.img`
  width: 130px;
`;
const AdsTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 80px;
  ${mobile({ marginRight: "0px" })}
`;
const AdsText = styled.p`
  line-height: 1.5rem;
  font-size: 13.5px;
`;
const AdsButton = styled.button`
  padding: 20px 0px;
  border-radius: 30px;
  background-color: #372aa4;
  color: white;
  border: none;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${mobile({
    padding: " 10px 0",
    margin: " 15px 0",
  })}
`;
const AdsButtonImg = styled.img`
  margin-left: 10px;
`;
const ThirdContent = styled.div`
  margin-top: 30px;
`;
const Services = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  ${mobile({ flexDirection: "column" })}
`;
const ServiceItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  min-width: 47%;
  margin-bottom: 20px;
  padding: 40px 0;
  border-radius: 10px;
`;
const ServiceImg = styled.img`
  margin-bottom: 40px;
`;
const ServiceTitle = styled.p`
  margin-bottom: 30px;
  font-size: 25px;
  font-weight: 400;
`;
const ServiceButton = styled.button`
  margin-bottom: 30px;
  padding: 10px 40px;
  border-radius: 30px;
  border: none;
  background: linear-gradient(276.13deg, #08c8f6 2.06%, #2d9cdb 94.79%);
  color: white;

  &:hover {
    background: linear-gradient(276.13deg, #18cbf8 2.06%, #219ee6 94.79%);
  }
`;
const TransactionSection = styled.div`
  margin-top: 40px;
  background-color: #fafafb;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 50px;
  ${mobile({
    padding: "10px",
  })}
`;
const TransactionTitle = styled.h2`
  font-size: 18px;
  margin: 50px 0 35px 0;
  font-weight: 500;
`;
const Tableheaders = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;
const Tablehead = styled.span`
  font-size: 12px;
  font-weight: 500;
  width: 100%;
  color: #2d9cdb;
`;
const Tabledatas = styled.div`
  display: flex;
  margin-bottom: 30px;
  justify-content: space-between;
`;
const Tabledata = styled.span`
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  font-size: 12px;
`;
const ViewMore = styled.div`
  text-align: right;
`;
const ViewButton = styled.button`
  padding: 10px 15px;
  border: 1px solid rgb(221, 221, 221);
  background: white;
  border-radius: 3px;
`;
const InformationContainer = styled.div`
  flex: 4;
`;
const StatisticContainer = styled.div`
  padding: 40px 30px;
  background-color: #fafafb;
  border-radius: 10px;
`;
const StatisticTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 40px;
`;
const Statistics = styled.div``;
const StatisticItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const StatisticIcon = styled.img`
  margin-right: 30px;
`;
const StatisticValueContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StatisticHead = styled.span`
  margin-bottom: 15px;
  font-size: 10px;
  font-weight: 400;
`;
const StatisticValue = styled.span`
  font-size: 22px;
  font-weight: 400;
  ${mobile({
    fontSize: "18px",
  })}
`;
const PendingProfile = styled.div`
  margin-top: 20px;
  padding: 40px 30px;
  background: #fafafb;
  border-radius: 10px;
`;
const ProfileTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;
const ProfileTitle = styled.span``;
const PendingCounter = styled.p``;
const ProfileBottom = styled.div``;
const ProfileItem = styled.div`
  display: flex;
  background: white;
  padding: 20px;
  margin-bottom: 15px;
`;
const ProfileIcon = styled.img`
  margin-right: 20px;
`;
const ProfileTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;
const ProfileItemTitle = styled.span`
  font-size: 17px;
  color: #2d9cdb;
  margin-bottom: 5px;
`;
const ProfileItemDesc = styled.span`
  font-size: 13px;
  color: #777777;
`;
const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const transactions = useSelector((state) => state.transaction.transactions);
  console.log(transactions.length);

  return (
    <>
      <Nav />
      <Container>
        <Sidebar />
        <Secondontainer>
          <Wrapper>
            <AnnouncementBoard />
            <Welcome>
              <UserContainer>
                <Username>Hello {user.username} ,</Username>
                <WelcomeText>Welcome to your dashboard</WelcomeText>
              </UserContainer>
              <QuickAction>
                <QuickActionText>Quick action:</QuickActionText>
                <QuickActionButtonWrapper>
                  <QuickActionButton>
                    <ImgAction src={Bitcoin} />
                    Trade Bitcoin
                  </QuickActionButton>
                </QuickActionButtonWrapper>
              </QuickAction>
            </Welcome>

            <MainContent>
              <TradeContainer>
                <TradeSection>
                  <FirstContent>
                    <BalanceContainer>
                      <BalanceTitle>Balance</BalanceTitle>
                      <Balance>
                        ₦ {user.nairaWallet.toLocaleString("en-US")}.00
                      </Balance>
                    </BalanceContainer>
                    <FAdsContainer>
                      <FAdsTexts>
                        <FAdsText>Have Airtime you don't need?</FAdsText>
                        <FAdsTextSmall>Trade it for cash now</FAdsTextSmall>
                        <FAdsLink>Get started </FAdsLink>
                      </FAdsTexts>
                      <FAdsImgContainer>
                        <FAdsImg src={A2S} />
                      </FAdsImgContainer>
                    </FAdsContainer>
                  </FirstContent>
                  <SecondContent>
                    <AdsImgContainer>
                      <AdsImg src={GloverCart} />
                    </AdsImgContainer>
                    <AdsTextContainer>
                      <AdsText>
                        Glover is now your go-to marketplace for Giftcard trade,
                        Airtime to Cash and Digital Asset Services.
                      </AdsText>
                      <AdsButton>
                        Go to <AdsButtonImg src={Gloverads} />{" "}
                      </AdsButton>
                    </AdsTextContainer>
                  </SecondContent>
                  <ThirdContent>
                    <Services>
                      <ServiceItem>
                        <ServiceImg src={BitcoinService} />
                        <ServiceTitle>Bitcoin</ServiceTitle>
                        <Link to="/wallet/btc">
                          <ServiceButton>Make Transaction</ServiceButton>
                        </Link>
                      </ServiceItem>
                      <ServiceItem>
                        <ServiceImg src={EthService} style={{ width: 100 }} />
                        <ServiceTitle>Ethereum</ServiceTitle>
                        <Link to="/wallet/eth">
                          <ServiceButton>Make Transaction</ServiceButton>
                        </Link>
                      </ServiceItem>
                      <ServiceItem>
                        <ServiceImg src={RefilService} />
                        <ServiceTitle>Cash Transaction</ServiceTitle>
                        <Link to="/wallet/wallet">
                          <ServiceButton>Make Transaction</ServiceButton>
                        </Link>
                      </ServiceItem>
                    </Services>
                  </ThirdContent>
                </TradeSection>
                <TransactionSection>
                  <TransactionTitle>Recent Transaction</TransactionTitle>
                  <Tableheaders>
                    <Tablehead>Wallet</Tablehead>
                    <Tablehead>Transaction Type</Tablehead>
                    <Tablehead>Amount</Tablehead>
                    <Tablehead>Date/Time</Tablehead>
                  </Tableheaders>

                  {transactions.length && (
                    <Tabledatas>
                      <Tabledata>{transactions[0].wallet}</Tabledata>
                      <Tabledata>{transactions[0].transactionType}</Tabledata>
                      <Tabledata>{transactions[0].amount}</Tabledata>
                      <Tabledata>{transactions[0].date}</Tabledata>
                    </Tabledatas>
                  )}
                  <ViewMore>
                    <Link to="/transactions">
                      <ViewButton>View More</ViewButton>
                    </Link>
                  </ViewMore>
                </TransactionSection>
              </TradeContainer>
              <InformationContainer>
                <StatisticContainer>
                  <StatisticTitle>Statistics</StatisticTitle>
                  <Statistics>
                    <StatisticItem>
                      <StatisticIcon src={Pending} />
                      <StatisticValueContainer>
                        <StatisticHead>PENDIG TRANSACTIONS</StatisticHead>
                        <StatisticValue>0</StatisticValue>
                      </StatisticValueContainer>
                    </StatisticItem>
                    <StatisticItem>
                      <StatisticIcon src={Paid} />
                      <StatisticValueContainer>
                        <StatisticHead>PAID TRANSACTIONS</StatisticHead>
                        <StatisticValue>
                          {transactions.length > 0 ? transactions.length : "0"}
                        </StatisticValue>
                      </StatisticValueContainer>
                    </StatisticItem>
                    <StatisticItem>
                      <StatisticIcon src={Declined} />
                      <StatisticValueContainer>
                        <StatisticHead>DECLINED TRANSACTIONS</StatisticHead>
                        <StatisticValue>0</StatisticValue>
                      </StatisticValueContainer>
                    </StatisticItem>
                    <StatisticItem>
                      <StatisticIcon src={Wallet} />
                      <StatisticValueContainer>
                        <StatisticHead>AMOUNT IN WALLET</StatisticHead>
                        <StatisticValue>
                          ₦{user.nairaWallet.toLocaleString("en-US")}.00
                        </StatisticValue>
                      </StatisticValueContainer>
                    </StatisticItem>
                  </Statistics>
                </StatisticContainer>
                <PendingProfile>
                  <ProfileTop>
                    <ProfileTitle>Complete your Profile</ProfileTitle>
                    <PendingCounter>4/4</PendingCounter>
                  </ProfileTop>
                  <ProfileBottom>
                    <ProfileItem>
                      <ProfileIcon src={Check} />
                      <ProfileTextWrapper>
                        <ProfileItemTitle>Confirm your email</ProfileItemTitle>
                        <ProfileItemDesc>
                          Add basic account security
                        </ProfileItemDesc>
                      </ProfileTextWrapper>
                    </ProfileItem>
                    <ProfileItem>
                      <ProfileIcon src={Check} />
                      <ProfileTextWrapper>
                        <ProfileItemTitle>
                          Add your phone number
                        </ProfileItemTitle>
                        <ProfileItemDesc>
                          set-up a Phone so we can reach you
                        </ProfileItemDesc>
                      </ProfileTextWrapper>
                    </ProfileItem>
                    <ProfileItem>
                      <ProfileIcon src={Check} />
                      <ProfileTextWrapper>
                        <ProfileItemTitle>Add BVN</ProfileItemTitle>
                        <ProfileItemDesc>Link BVN to account</ProfileItemDesc>
                      </ProfileTextWrapper>
                    </ProfileItem>
                    <ProfileItem>
                      <ProfileIcon src={Check} />
                      <ProfileTextWrapper>
                        <ProfileItemTitle>Confirm your email</ProfileItemTitle>
                        <ProfileItemDesc>
                          Add basic account security
                        </ProfileItemDesc>
                      </ProfileTextWrapper>
                    </ProfileItem>
                  </ProfileBottom>
                </PendingProfile>
              </InformationContainer>
            </MainContent>
          </Wrapper>
        </Secondontainer>
      </Container>
    </>
  );
};

export default Dashboard;
