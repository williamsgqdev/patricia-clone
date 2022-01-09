import { Close, Done } from "@material-ui/icons";
import { useRef } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../helpers/responsive";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  height: 150vh;
`;
const Modal = styled.div`
  width: 550px;
  background-color: white;
  margin: 40px auto;
  padding: 20px;
  border-radius: 5px;
   box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
   ${mobile({
    width: "70%",
    marginTop : "150px"
  })}
`;
const ModalTitle = styled.h2`
font-weight: 500;
text-align : center;
color: #2d9cdb;
margin-top: 30px;
font-size: 27px;
${mobile({
   fontSize : "20px"
  })}
`
const ModalLabel = styled.label`
font-weight: 500;
color : #2d9cdb;
margin-bottom: 10px;
`
const ModalInputContainer = styled.div`
margin-top: 20px;
display: flex;
justify-content: space-between;
flex-wrap: wrap;
${mobile({
  flexDirection : "column" ,
  alignItems : "center"
  })}
`
const ModalDetails = styled.div`
display: flex;
flex-direction: column;
margin-right: 10px;
width: 45%;
margin-bottom: 45px;
${mobile({
    width: "90%",
  })}
`
const ModalInput = styled.input`
padding: 7px;
width: 100%;
border: 1px solid #ddd;
border-radius: 3px;
box-shadow:inset 0 1px 1px rgb(0 0 0 / 8%);
`
const ButtonWrapper = styled.div`
display: flex;
justify-content: center;
`
const ModalButton = styled.button`
display: flex;
align-items:center;
margin-right: 10px;
font-size: 13px !important;
padding: 5px 10px;
background-color : ${props => props.type === "close" ? "white" : "#2d9cdb"};
border: ${props => props.type === "close" ? "1px solid #ddd" : "none"};
color: ${props => props.type === "close" ? "black" : "white"};
border-radius : 3px;
`
const EditUserModal = ({setShow}) => {

    const ref = useRef()
    useEffect(() => {
        const checkIfClickedOutside = e => {
          // If the menu is open and the clicked target is not within the menu,
          // then close the menu
          if (setShow && ref.current && !ref.current.contains(e.target)) {
            setShow(false)
          }
        }
    
        document.addEventListener("mousedown", checkIfClickedOutside)
    
        return () => {
          // Cleanup the event listener
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
      }, [setShow])
    
  return (
    <Container  >
      <Modal ref={ref} >
          <ModalTitle>Edit Profile Information</ModalTitle>
         <ModalInputContainer>
             <ModalDetails>
                 <ModalLabel>First Name</ModalLabel>
                 <ModalInput/>
             </ModalDetails>
             <ModalDetails>
                 <ModalLabel>First Name</ModalLabel>
                 <ModalInput/>
             </ModalDetails>
             <ModalDetails>
                 <ModalLabel>First Name</ModalLabel>
                 <ModalInput/>
             </ModalDetails>
           
         </ModalInputContainer>
         <ButtonWrapper>
                 <ModalButton onClick={()=> setShow(false)} type="close"> <Close style={{fontSize:"13px!important"}}/> Close </ModalButton>
                 <ModalButton> <Done style={{fontSize:"13px!important" , color :"white"}} /> Save </ModalButton>
             </ButtonWrapper>
      </Modal>
    </Container>
  );
};

export default EditUserModal;
