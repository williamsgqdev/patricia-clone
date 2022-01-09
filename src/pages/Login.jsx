import * as LottiePlayer from "@lottiefiles/lottie-player";
import { Email, Lock, Visibility, VisibilityOff } from "@material-ui/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import LogoIcon from "../icons/logo.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { Link, useNavigate } from "react-router-dom";
import { getUserObj } from "../services/firebase";
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
const LoginContainer = styled.div`
  flex: 1;
`;

const LoginItems = styled.form`
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
const LoginBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  width: 100%;
  padding: 15px 0;
  margin-bottom: 40px;
`;
const LoginLabel = styled.label`
  color: #7a7978;
  padding: 0px 20px;
`;
const LoginInput = styled.input`
  flex: 1;
  border: none;
  background-color: #f9f9f9;
  font-size: 15px;
`;
const LoginBtn = styled.button`
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
const Login = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isFetching, setIsFecthing] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  //to handel display of password
  const handleVisibility = () => {
    !passwordVisibility
      ? setPasswordVisibility(true)
      : setPasswordVisibility(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsFecthing(true);
    signInWithEmailAndPassword(auth, emailAddress, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await getUserObj(user.uid);
      })
      .then(() => {
        setIsFecthing(false);
        navigate("/");
      })
      .catch((error) => {
        setIsFecthing(false);
        setError(error.message);
      });
  };

  useEffect(() => {
    document.title = "Login-Patricia";
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <Container>
      <LoginContainer>
        <LoginItems onSubmit={handleLogin}>
          <Logo src={LogoIcon} />
          <WelcomeTitle>Hello 👋🏽 , </WelcomeTitle>
          <WelcomeText>
            This Is a Clone and not the real Patricia , <br /> This was Created
            solely for Practice Purpose
          </WelcomeText>
          {error && (
            <p style={{ color: "red", marginBottom: "20px" }}>{error}</p>
          )}
          <LoginBox>
            <LoginLabel>
              {" "}
              <Email />{" "}
            </LoginLabel>
            <LoginInput
              required
              placeholder="Enter Email Address"
              type="email"
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </LoginBox>
          <LoginBox>
            <LoginLabel>
              <Lock />
            </LoginLabel>
            <LoginInput
              required
              onChange={(e) => setPassword(e.target.value)}
              type={passwordVisibility ? "text" : "password"}
              placeholder="Enter Password"
            />
            {passwordVisibility ? (
              <Visibility
                onClick={handleVisibility}
                style={{ padding: "0 10px" }}
              />
            ) : (
              <VisibilityOff
                onClick={handleVisibility}
                style={{ padding: "0 10px" }}
              />
            )}
          </LoginBox>
          <LoginBtn style={{ opacity: isFetching ? 0.5 : 1 }} type="submit">
            {" "}
            {isFetching ? "Loading...." : "Login"}
          </LoginBtn>
          <p style={{ marginTop: "20px" }}>
            New to Patricia ?{" "}
            <Link to="/sign-up" style={{ textDecoration: "none" }}>
              <span
                style={{ color: "#2d9cdb", cursor: "pointer", fontWeight: 500 }}
              >
                Sign Up Here
              </span>
            </Link>
          </p>
        </LoginItems>
      </LoginContainer>
      <AnimationContainer>
        <lottie-player
          autoplay
          //   controls
          loop
          mode="normal"
          src="https://assets6.lottiefiles.com/packages/lf20_bnpqzbat.json"
          style={{ width: "100%", background: "#f4fafd" }}
        ></lottie-player>
      </AnimationContainer>
    </Container>
  );
};

export default Login;
