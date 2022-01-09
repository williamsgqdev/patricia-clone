import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AnnouncementBoard from "../components/AnnouncementBoard";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { mobile } from "../helpers/responsive";
import Notransact from "../icons/no-transactions.svg";

const Container = styled.div`
  display: flex;
`;
const SecondContainer = styled.div`
  flex: 8;
  padding: 25px;
  background-color: #f4f5f8;
  ${mobile({
    padding: "10px",
  })}
`;
const TransactionContainer = styled.div`
  margin-top: 20px;
  display: flex;
  ${mobile({
    flexDirection: "column",
  })}
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

const Transactions = styled.div`
  margin-right: 30px;
  background: #fff;
  flex: 7;
  border-radius: 10px;
  ${mobile({
    marginRight: "0",
  })}
`;
const TransationsTitle = styled.h2`
  padding: 30px 20px;
  font-weight: 500;
  color: #2d9cdb !important;
  font-size: 23px;
  margin-bottom: 40px;
  ${mobile({
    fontSize: "15px",
  })}
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TransactionImg = styled.img`
  margin: 50px 0 100px 0;
`;
const NotransactText = styled.h2`
  font-weight: 500;
  font-size: 23px;
  margin-bottom: 20px;
`;
const NotransactTextSmall = styled.span`
  font-size: 12px;
  margin-bottom: 100px;
`;
const NotransactLink = styled.span`
  font-size: 13.5px;
  color: #2d9cdb !important;
  font-weight: 500;
`;
const TransactionFilterContainer = styled.div`
  flex: 2;
`;
const TransactionFilter = styled.div`
  background: white;
  border-radius: 10px;
  padding: 10px;
`;
const TransactionFilterTitle = styled.h2`
  font-weight: 400;
  font-size: 16px;
  padding: 13px 10px;
  margin-bottom: 10px;
  border-bottom: ${(props) => props.border === "true" && "1px solid #cccccc"};
`;
const FilterOption = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #cccccc;
  padding: 15px 20px;
  margin: 0 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;
const FilterLabel = styled.label`
  font-size: 13px;
  padding-left: 10px;
`;
const FilterInput = styled.input`
  font-size: 10px;
`;

const TransactionList = () => {
  const data = useSelector((state) => state.transaction.transactions);
  const [transactions, setTransactions] = useState(data);
  
  //handel Filter of Transactions
  const handleFilter = (val) => {
    const filteredTransactions = data.filter(
      (item) => item.transactionType === val
    );
    setTransactions(filteredTransactions);
  };

  useEffect(() => {
    document.title = "Patricia - Transactions";
  }, []);

  return (
    <>
      <Nav />
      <Container>
        <Sidebar />
        <SecondContainer>
          <AnnouncementBoard />
          <TransactionContainer>
            <Transactions>
              <TransationsTitle>Transaction History</TransationsTitle>
              {transactions.length > 0  &&
                <TransactionSection>
                  <TransactionTitle>Recent Transactions</TransactionTitle>
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
                </TransactionSection> }
                 
              { transactions.length === 0  && <List>
                  <TransactionImg src={Notransact} />
                  <NotransactText>No Transactions</NotransactText>
                  <NotransactTextSmall>
                    Your transactions will appear here,{" "}
                    <NotransactLink>Start a transaction</NotransactLink>
                  </NotransactTextSmall>
                </List>}
              
            </Transactions>
            <TransactionFilterContainer>
              <TransactionFilter>
                <TransactionFilterTitle border="true">
                  FILTER
                </TransactionFilterTitle>
                <TransactionFilterTitle>SORT BY:</TransactionFilterTitle>
                <FilterOption>
                  <FilterLabel>All</FilterLabel>
                  <FilterInput
                    type="radio"
                    name="transactionState"
                    onClick={() => setTransactions(data)}
                  />
                </FilterOption>
                <FilterOption>
                  <FilterLabel>Credit</FilterLabel>
                  <FilterInput
                    type="radio"
                    name="transactionState"
                    value="credit"
                    onClick={(e) => handleFilter(e.target.value)}
                  />
                </FilterOption>
                <FilterOption>
                  <FilterLabel>Debit</FilterLabel>
                  <FilterInput
                    type="radio"
                    name="transactionState"
                    value="debit"
                    onClick={(e) => handleFilter(e.target.value)}
                  />
                </FilterOption>
                <FilterOption>
                  <FilterLabel>Top Up</FilterLabel>
                  <FilterInput
                    type="radio"
                    name="transactionState"
                    value="credit(top-up)"
                    onClick={(e) => handleFilter(e.target.value)}
                  />
                </FilterOption>
              </TransactionFilter>
            </TransactionFilterContainer>
          </TransactionContainer>
        </SecondContainer>
      </Container>
    </>
  );
};

export default TransactionList;
