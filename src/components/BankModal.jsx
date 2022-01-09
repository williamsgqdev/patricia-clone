import { Report } from "@material-ui/icons";
import { useRef } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  height: 100vh;
`;
const Modal = styled.div`
  width: 550px;
  background-color: white;
  margin: 40px auto;
  padding: 40px;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
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
// const NoteWrapper = styled.div`
//   margin-top: 20px;
//   display: flex;
// `;
// const Note = styled.p`
//   color: #ddd;
// `;
const BankModal = ({ setShow }) => {
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

  return (
    <Container>
      <Modal ref={ref}>
        <ModalTitle>Account Setup</ModalTitle>
        <ModalInputContainer>
          <ModalDetails>
            <ModalLabel>Select A Bank</ModalLabel>
            <ModalSelect>
              <ModalOption>Click To Select a Bank</ModalOption>
            </ModalSelect>
          </ModalDetails>
          <ModalDetails>
            <ModalLabel>Account Number</ModalLabel>
            <ModalInput />
          </ModalDetails>
          <ModalDetails>
            <ModalLabel>Account Name</ModalLabel>
            <ModalInput />
          </ModalDetails>
          <ModalDetails>
            <ModalLabel>Enter Bank Verification Number</ModalLabel>
            <ModalInput type="password" />
          </ModalDetails>
        </ModalInputContainer>
        <ButtonWrapper>
          <ModalButton> Submit </ModalButton>
        </ButtonWrapper>
        {/* <NoteWrapper>
          <Report style={{ color: "#ddd" }} />
          <Note>
            We are a digital bank and just like your regular bank, we need your
            BVN to be able to process transactions. Dial *565*0# on your
            registered phone number to get your BVN. See why we need your BVN.
          </Note>
        </NoteWrapper> */}
      </Modal>

      
    </Container>
  );
};

export default BankModal;
