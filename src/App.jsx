import Dashboard from "./pages/Dashboard";
import "./helpers/Router.css"
import TransactionList from "./pages/TransactionList";
import Wallets from "./pages/Wallets";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./helpers/ProtectedRoute";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./lib/firebase";
import NairaWallet from "./pages/NairaWallet";
import BtcWallet from "./pages/BtcWallet";
import EthWallet from "./pages/EthWallet";
import { useDispatch } from "react-redux";
import { getTransactions } from "./services/firebase";
import { close } from "./redux/sidebarSlice";

const App = () => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );

 
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("authUser", JSON.stringify(user));
        setAuthUser(user);
      } else {
        localStorage.clear();
        setAuthUser(null);
      }
    });
    if (authUser) {
      getTransactions(authUser.uid, dispatch);
    }

    //Close sideNav bar On Mobile
    if(window.screen.width <= 800){
      dispatch(close())
    }
  }, [authUser, dispatch]);

  return (
    <div>
      <Router>
        <Routes>
          {<Route path="/login" element={<Login />} />}
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<ProtectedRoute authUser={authUser} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/wallet" element={<Wallets />} />
            <Route path="/transactions" element={<TransactionList />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/wallet/naira" element={<NairaWallet />} />
            <Route path="/wallet/btc" element={<BtcWallet />} />
            <Route path="/wallet/eth" element={<EthWallet />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
