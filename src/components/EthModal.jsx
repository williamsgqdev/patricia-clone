import { CheckCircleOutline, Send } from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { mobile } from "../helpers/responsive";
import {  ethTransfer } from "../services/firebase";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  height: 100vh;
  ${mobile({
    width: "100%",
  })}
`;
const Modal = styled.div`
  width: 550px;
  background-color: white;
  margin: 40px auto;
  padding: 40px;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  ${mobile({
    width: "70%",
    marginTop : "150px"
  })}
`;
const ModalTitle = styled.h2`
  font-weight: 500;
  text-align: center;
  margin-top: 20px;
  font-size: 27px;
`;
const ModalLabel = styled.label`
  font-weight: 500;
  margin-bottom: 10px;
`;
const ModalInputContainer = styled.div`
  margin-top: 20px;
`;
const ModalDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  margin-bottom: 20px;
`;
const ModalInput = styled.input`
  padding: 15px;
  width: 95%;
  border: 1px solid #ddd;
  border-radius: 3px;
  box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
`;
const ModalSelect = styled.select`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 3px;
`;
const ModalOption = styled.option``;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const ModalButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 10px;
  font-size: 13px !important;
  padding: 15px 100px;
  background-color: ${(props) =>
    props.type === "close" ? "white" : "#2d9cdb"};
  border: ${(props) => (props.type === "close" ? "1px solid #ddd" : "none")};
  color: ${(props) => (props.type === "close" ? "black" : "white")};
  border-radius: 3px;
`;

const EthModal = ({ setShow }) => {
  const ref = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (setShow && ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [setShow]);

  //handle Transfer
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const [amount, setAmount] = useState(0);
  const [beneficiaryAddress, setBeneficiaryAddress] = useState("");
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [sucessful, setSucessful] = useState(false);
  const handelTransfer = () => {
    ethTransfer(
      authUser.uid,
      amount,
      beneficiaryAddress,
      setError,
      setFetching,
      setSucessful,
    );

  };
  return (
    <Container>
      <Modal ref={ref}>
        {!sucessful && (
          <div>
            <ModalTitle>Send Eth</ModalTitle>
            {error && (
              <div
                style={{ color: "red", textAlign: "center", marginTop: "20px" }}
              >
                {error}
              </div>
            )}
            <ModalInputContainer>
              <ModalDetails>
                <ModalLabel>Eth Address of receiver</ModalLabel>
                <ModalInput
                  type="email"
                  onChange={(e) => setBeneficiaryAddress(e.target.value)}
                />
              </ModalDetails>
              <ModalDetails>
                <ModalLabel>Amount ( eth )</ModalLabel>
                <ModalInput
                  type="number"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </ModalDetails>
            </ModalInputContainer>
            <ButtonWrapper>
              <ModalButton
                onClick={handelTransfer}
                style={{ opacity: fetching ? 0.5 : 1 }}
                disabled={fetching ? true : false}
              >
                {" "}
                {fetching ? "Transaction In Progress" : "Send"}{" "}
                <Send style={{ marginLeft: "10px" }} />{" "}
              </ModalButton>
            </ButtonWrapper>
          </div>
        )}

        {sucessful && (
          <div style={{ textAlign: "center" }}>
            <CheckCircleOutline style={{ color: "green", fontSize: "60px" }} />
            <h2 style={{ fontWeight: 500, margin: "40px 0" }}>
              Transaction Sucessuful
            </h2>
            <p>
              You sent {amount} eth to{" "}
              {beneficiaryAddress}
            </p>
          </div>
        )}
      </Modal>
    </Container>
  );
};

export default EthModal;
