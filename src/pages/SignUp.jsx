import * as LottiePlayer from "@lottiefiles/lottie-player";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  Email,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import styled from "styled-components";
import { db, auth } from "../lib/firebase";
import LogoIcon from "../icons/logo.png";
import { getUserObj } from "../services/firebase";
import { Link } from "react-router-dom";
import { mobile } from "../helpers/responsive";
const Container = styled.div`
  display: flex;
  width: 100%;
`;
const AnimationContainer = styled.div`
  flex: 1;
  ${mobile({
    display: "none",
  })}
`;
const SignUpContainer = styled.div`
  flex: 1;
`;

const SignUpItems = styled.form`
  width: 400px;
  margin: 40px auto;
  ${mobile({
    width: "90%",
  })}
`;
const Logo = styled.img`
  width: 120px;
`;
const WelcomeTitle = styled.h2`
  margin-top: 100px;
  font-size: 35px;
  ${mobile({
    marginTop: "50px",
    fontSize: "25px",
  })}
`;
const WelcomeText = styled.p`
  margin-top: 10px;
  color: #7a7978;
  line-height: 1.5rem;
  margin-bottom: 60px;
  ${mobile({
    fontSize: "13px",
  })}
`;
const SignUpBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  width: 100%;
  padding: 15px 0;
  margin-bottom: 40px;
`;
const SignUpLabel = styled.label`
  color: #7a7978;
  padding: 0px 20px;
`;
const SignUpInput = styled.input`
  flex: 1;
  border: none;
  background-color: #f9f9f9;
  font-size: 15px;
`;
const SignUpBtn = styled.button`
  background: #2d9cdb;
  width: 100%;
  padding: 10px 0;
  color: white;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  font-size: 15px;
`;
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFetching, setIsFecthing] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const nairaWallet = 250000;
  const ethWallet = 0.05;
  const btcWallet = 0.05;
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const ethAddress = `eth-address${Date.now()}-patricia-clone`;
  const btcAddress = `btc-address${Date.now()}-patricia-clone`;
  // to check password input field
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  //to check confirm password input field
  const [confirmVisibility, setConfirmVisibility] = useState(false);

  //to handel display of password
  const handleVisibility = (type) => {
    if (type === "password") {
      !passwordVisibility
        ? setPasswordVisibility(true)
        : setPasswordVisibility(false);
    } else {
      !confirmVisibility
        ? setConfirmVisibility(true)
        : setConfirmVisibility(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsFecthing(true);
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, emailAddress, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          const userCollectionRef = collection(db, "users");
          await addDoc(userCollectionRef, {
            userId: user.uid,
            username: username,
            emailAddress: emailAddress,
            nairaWallet: nairaWallet,
            btcWallet: btcWallet,
            ethWallet: ethWallet,
            btcAddress: btcAddress,
            ethAddress: ethAddress,
          });
          await getUserObj(user.uid);
        })
        .then(() => {
          setIsFecthing(false);
          navigate("/");
        })
        .catch((error) => {
          const errorMessage = error.message;
          setIsFecthing(false);
          setError(errorMessage);
        });
    } else {
      setIsFecthing(false);
      setError("password did not match");
      setUsername("");
      setEmailAddress("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  useEffect(() => {
    document.title = "sign-up";
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <Container>
      <SignUpContainer>
        <SignUpItems onSubmit={handleSignUp}>
          <Logo src={LogoIcon} width="150px" />

          <WelcomeTitle>Hello 👋🏽 , </WelcomeTitle>
          <WelcomeText>
            This Is a Clone and not the real Patricia , <br /> This was Created
            solely for Practice Purpose
          </WelcomeText>
          {error && (
            <p style={{ color: "red", marginBottom: "20px" }}>{error}</p>
          )}
          {/* BEGING 0F EMAIL FIELD  */}
          <SignUpBox>
            <SignUpLabel>
              <Email />{" "}
            </SignUpLabel>

            <SignUpInput
              placeholder="Enter Email Address"
              onChange={(e) => setEmailAddress(e.target.value)}
              required
            />
          </SignUpBox>
          {/* END 0F EMAIL FIELD  */}

          {/* BEGING 0F USERNAME FIELD  */}
          <SignUpBox>
            <SignUpLabel>
              {" "}
              <Person />{" "}
            </SignUpLabel>
            <SignUpInput
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </SignUpBox>
          {/* END OF USERNAME FIELD  */}

          {/* BEGING 0F PASSWORD FIELD  */}
          <SignUpBox>
            <SignUpLabel>
              <Lock />{" "}
            </SignUpLabel>
            <SignUpInput
              onChange={(e) => setPassword(e.target.value)}
              type={passwordVisibility ? "text" : "password"}
              placeholder="Enter Password"
              required
            />

            {/* VISBILITY BUTTON */}
            {passwordVisibility ? (
              <Visibility
                onClick={() => {
                  handleVisibility("password");
                }}
                style={{ padding: "0 10px" }}
              />
            ) : (
              <VisibilityOff
                onClick={() => handleVisibility("password")}
                style={{ padding: "0 10px" }}
              />
            )}
          </SignUpBox>
          {/* END OF PASSWORD FIELD  */}

          {/* BEGING 0F CONFIRM PASSWORD FIELD  */}
          <SignUpBox>
            <SignUpLabel>
              <Lock />{" "}
            </SignUpLabel>
            <SignUpInput
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={confirmVisibility ? "text" : "password"}
              placeholder="Confirm Password"
              required
            />
            {confirmVisibility ? (
              <Visibility
                onClick={() => handleVisibility("confirm")}
                style={{ padding: "0 10px" }}
              />
            ) : (
              <VisibilityOff
                onClick={() => handleVisibility("confirm")}
                style={{ padding: "0 10px" }}
              />
            )}
          </SignUpBox>
          {/* END 0F CONFIRM PASSWORD FIELD  */}

          <SignUpBtn type="submit" style={{ opacity: isFetching ? 0.5 : 1 }}>
            {isFetching ? "Loading...." : "SignUp"}
          </SignUpBtn>
          <p style={{ marginTop: "20px" }}>
            Already have an Account ?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span
                style={{ color: "#2d9cdb", cursor: "pointer", fontWeight: 500 }}
              >
                Login
              </span>
            </Link>
          </p>
        </SignUpItems>
      </SignUpContainer>
      <AnimationContainer>
        <lottie-player
          autoplay
          //   controls
          loop
          mode="normal"
          src="https://assets6.lottiefiles.com/packages/lf20_bnpqzbat.json"
          style={{ width: "100%", backgroundColor: "#f4fafd" }}
        ></lottie-player>
      </AnimationContainer>
    </Container>
  );
};

export default SignUp;
