import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AnnouncementBoard from "../components/AnnouncementBoard";
import DepositModal from "../components/DepositModal";
import NairaModal from "../components/NairaModal";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { mobile } from "../helpers/responsive";
import CardSvg from "../icons/card.svg";
import Notransact from "../icons/no-transactions.svg";
import { nairaTopUp } from "../services/firebase";
const Container = styled.div`
  display: flex;
`;
const SecondContainer = styled.div`
  flex: 8;
  padding: 25px;
  background-color: #f4f5f8;
  ${mobile({
    padding: "10px",
    width: "100%",
  })}
`;
const Top = styled.div`
  display: flex;
  margin-top: 40px;
  ${mobile({
    flexDirection: "column",
  })}
`;
const BalanceContainer = styled.div`
  background-color: #fff;
  padding: 20px 20px 0px 20px;
  flex: 1;
  margin-right: 10px;
  ${mobile({
    marginBottom: "30px",
  })}
`;
const BalanceTitle = styled.p`
  margin-bottom: 20px;
`;
const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({
    flexDirection: "column",
  })}
`;
const WalletContainer = styled.div``;
const WalletBalance = styled.h3`
  color: #2d9cdb;
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 20px;
  ${mobile({
    fontSize: "25px",
  })}
`;
const ActionContainer = styled.div`
  ${mobile({
    marginTop: "20px",
  })}
`;
const ActionButton = styled.button`
  display: block;
  margin-bottom: 20px;
  padding: 10px 35px;
  background-color: #fff;
  border: 1px solid #2d9cdb;
  color: #2d9cdb;
  border-radius: 5px;
  &:hover {
    color: #fff;
    background: linear-gradient(
      276.13deg,
      #08c8f6 2.06%,
      #2d9cdb 94.79%
    ) !important ;
    cursor: pointer;
  }
  ${mobile({
    width: "100%",
  })}
`;
const CardContainer = styled.div`
  background-color: #fff;
  flex: 1;
  display: flex;
  padding: 20px 0 0 20px;
  ${mobile({
    flexDirection: "column",
  })}
`;
const CardTitle = styled.h3`
  font-size: 23px;
  font-weight: 600;
  margin-bottom: 20px;
`;
const CardTexts = styled.div`
  ${mobile({
    order: 2,
    margin: "10px 0",
  })}
`;
const CardText = styled.p`
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 1.5rem;
`;
const CardButton = styled.button`
  display: block;
  padding: 10px 55px;
  background-color: #fff;
  border: 1px solid #2d9cdb;
  color: #2d9cdb;
  border-radius: 5px;
  ${mobile({
    padding: "10px 30px",
  })}
`;
const CardImgWrapper = styled.div`
  margin-top: 20px;
`;
const CardImg = styled.img``;
const Bottom = styled.div``;
const WalletHistory = styled.div`
  margin-top: 20px;
  border-radius: 10px;
  background: #fff;
  padding: 20px;
`;
const HistoryTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
`;
const Transactions = styled.div`
  margin-right: 30px;
  background: #fff;
  flex: 7;
  border-radius: 10px;
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
const Tableheaders = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  ${mobile({
    paddingLeft: "3px",
  })}
`;
const Tablehead = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #2d9cdb;
  align-self: flex-start;
  width: 100%;
  /* margin-right: 100px; */
`;
const Tabledatas = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  border-bottom: 1px solid #dddddd;
  padding-bottom: 10px;
`;
const Tabledata = styled.span`
  font-size: 14px;
  font-weight: 500;
  /* margin-right: 100px; */
  width: 100%;
  ${mobile({
    marginBottom: "20px",
  })}
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TransactionImg = styled.img`
  margin: 50px 0 10px 0;
`;
const NotransactText = styled.h2`
  font-weight: 500;
  font-size: 23px;
  margin-bottom: 20px;
`;
const NotransactTextSmall = styled.span`
  font-size: 12px;
`;
const NotransactLink = styled.span`
  font-size: 13.5px;
  color: #2d9cdb !important;
  font-weight: 500;
`;
const NairaWallet = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [TransferShow, setTransferShow] = useState(false);
  const [DepositShow, setDepositShow] = useState(false);
  const data = useSelector((state) => state.transaction.transactions);
  const transactions = data.filter((item) => item.wallet === "nairaWallet");
  return (
    <>
      <Nav />
      <Container>
        <Sidebar />
        <SecondContainer>
          <AnnouncementBoard />
          <Top>
            <BalanceContainer>
              <BalanceTitle>Your Wallet</BalanceTitle>
              <SubContainer>
                <WalletContainer>
                  <BalanceTitle>Available Balance</BalanceTitle>
                  <WalletBalance>
                    ₦{user.nairaWallet.toLocaleString("en-US")}.00
                  </WalletBalance>
                  <small>
                    Book Balance : ₦{user.nairaWallet.toLocaleString("en-US")}
                    .00
                  </small>
                </WalletContainer>
                <ActionContainer>
                  <ActionButton onClick={() => setTransferShow(true)}>
                    Transfer
                  </ActionButton>
                  <ActionButton onClick={() => setDepositShow(true)}>
                    Deposit
                  </ActionButton>
                </ActionContainer>
              </SubContainer>
            </BalanceContainer>
            <CardContainer>
              <CardTexts>
                <CardTitle>Patricia Debit Cards</CardTitle>
                <CardText>
                  With this Card, you can withdraw funds from any ATM and carry
                  out online transactions.
                </CardText>
                <CardButton>Coming Soon</CardButton>
              </CardTexts>

              <CardImgWrapper>
                <CardImg src={CardSvg} />
              </CardImgWrapper>
            </CardContainer>
          </Top>
          <Bottom>
            <WalletHistory>
              <HistoryTitle>Wallet History</HistoryTitle>
              <Transactions>
                {transactions.length > 0 && (
                  <TransactionSection>
                    <Tableheaders>
                      <Tablehead>Wallet</Tablehead>
                      <Tablehead>Transaction Type</Tablehead>
                      <Tablehead>Amount</Tablehead>
                      <Tablehead>Date/Time</Tablehead>
                    </Tableheaders>

                    {transactions
                      .map((transaction) => (
                        <Tabledatas>
                          <Tabledata>{transaction.wallet}</Tabledata>
                          <Tabledata>{transaction.transactionType}</Tabledata>
                          <Tabledata>{transaction.amount}</Tabledata>
                          <Tabledata>{transaction.date}</Tabledata>
                        </Tabledatas>
                      ))
                      .reverse()}
                  </TransactionSection>
                )}
              {transactions.length === 0 &&  <List>
                  <TransactionImg src={Notransact} />
                  <NotransactText>No Transactions</NotransactText>
                  <NotransactTextSmall>
                    Your transactions will appear here,{" "}
                    <NotransactLink>Start a transaction</NotransactLink>
                  </NotransactTextSmall>
                </List>}
              </Transactions>
            </WalletHistory>
          </Bottom>
        </SecondContainer>
        {TransferShow && <NairaModal setShow={setTransferShow} />}
        {DepositShow && (
          <DepositModal
            setShow={setDepositShow}
            title="Deposit"
            sign="₦"
            subString=".00"
            tFunc={nairaTopUp}
          />
        )}
      </Container>
    </>
  );
};

export default NairaWallet;
