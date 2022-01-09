import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  increment,
  doc,
  addDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { setTransaction } from "../redux/transactionsSlice";

const d = new Date();
const date = `${d.getUTCDate()} / ${
  d.getUTCMonth() + 1
} / ${d.getUTCFullYear()}`;

// get UserObj from firebase
export const getUserObj = async (userId) => {
  let user;
  let userdocId;
  const q = query(collection(db, "users"), where("userId", "==", userId));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    user = doc.data();
    userdocId = doc.id;
    localStorage.setItem("user", JSON.stringify(user));
  });

  return { user, userdocId };
};

//Get beneficiary by email
export const getBeneficiary = async (emailAddress) => {
  let beneficiary;
  let beneficiarydocId;
  const q = query(
    collection(db, "users"),
    where("emailAddress", "==", emailAddress)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    beneficiary = doc.data();
    beneficiarydocId = doc.id;
  });

  return { beneficiary, beneficiarydocId };
};

//get beneficiary By eth adress
export const getUserByBtc = async (btcAddress) => {
  let beneficiary;
  let beneficiarydocId;
  const q = query(
    collection(db, "users"),
    where("btcAddress", "==", btcAddress)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    beneficiary = doc.data();
    beneficiarydocId = doc.id;
  });

  return { beneficiary, beneficiarydocId };
};
export const getUserEth = async (ethAddress) => {
  let beneficiary;
  let beneficiarydocId;
  const q = query(
    collection(db, "users"),
    where("ethAddress", "==", ethAddress)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    beneficiary = doc.data();
    beneficiarydocId = doc.id;
  });

  return { beneficiary, beneficiarydocId };
};

//Cash Transfer function
export const cashTransfer = async (
  userId,
  amount,
  Email,
  setError,
  setFetching,
  setSucessful
) => {
  setFetching(true);
  const { user, userdocId } = await getUserObj(userId);
  const { beneficiary, beneficiarydocId } = await getBeneficiary(Email);
  //check if beneficiary exist
  console.log(user.nairaWallet);
  if (beneficiary) {
    //check if user balance is sufficient
    if (beneficiary.emailAddress === user.emailAddress) {
      setFetching(false);
      setError("You cant Transfer to your account");
    } else {
      if (user.nairaWallet >= amount) {
        //userRef  to perform update
        const userRef = doc(db, "users", userdocId);

        //beneficiaryRef to perform update
        const beneficiaryRef = doc(db, "users", beneficiarydocId);

        //Update User Balance
        await updateDoc(userRef, {
          nairaWallet: increment(-amount),
        });

        //update beneficiary Balance
        await updateDoc(beneficiaryRef, {
          nairaWallet: increment(amount),
        });

        //Create Transfer history for user
        const userTransferRef = collection(db, "transactions");
        await addDoc(userTransferRef, {
          userId: user.userId,
          beneficiaryEmail: beneficiary.emailAddress,
          amount: amount,
          transactionType: "debit",
          wallet: "nairaWallet",
          date: date,
        });
        // Create Transfer history for beneficiary
        const beneficiaryTRef = collection(db, "transactions");
        await addDoc(beneficiaryTRef, {
          userId: beneficiary.userId,
          beneficiaryEmail: beneficiary.emailAddress,
          sender: user.emailAddress,
          amount: amount,
          transactionType: "credit",
          wallet: " nairaWallet ",
          date: date,
        });
        //function was called to update user state in app
        setFetching(false);
        setSucessful(true);
        await getUserObj(userId);
      } else {
        setFetching(false);
        setError("Insufficient Funds");
      }
    }
  } else {
    setFetching(false);
    setError("Beneficiary Does not Exist");
  }

  return { beneficiary };
};

//Btc Transfer Function
export const btcTransfer = async (
  userId,
  amount,
  btcAddress,
  setError,
  setFetching,
  setSucessful
) => {
  setFetching(true);
  const { user, userdocId } = await getUserObj(userId);
  const { beneficiary, beneficiarydocId } = await getUserByBtc(btcAddress);
  const newAddress = `btc-address${Date.now()}-patricia-clone`;
  console.log(newAddress);
  //check if beneficiary exist
  if (beneficiary) {
    //check if user balance is sufficient
    if (beneficiary.emailAddress === user.emailAddress) {
      setFetching(false);
      setError("You cant Transfer to your account");
    } else {
      if (user.btcWallet >= amount) {
        //userRef  to perform update
        const userRef = doc(db, "users", userdocId);

        //beneficiaryRef to perform update
        const beneficiaryRef = doc(db, "users", beneficiarydocId);

        //Update User Balance
        await updateDoc(userRef, {
          btcWallet: increment(-amount),
        });

        //update beneficiary Balance
        await updateDoc(beneficiaryRef, {
          btcWallet: increment(amount),
          btcAddress: newAddress,
        });

        //Create Transfer history for user
        const userTransferRef = collection(db, "transactions");
        await addDoc(userTransferRef, {
          userId: user.userId,
          beneficiaryAddresss: beneficiary.btcAddress,
          amount: amount,
          transactionType: "debit",
          wallet: "btcWallet",
          date: date,
        });
        // Create Transfer history for beneficiary
        const beneficiaryTRef = collection(db, "transactions");
        await addDoc(beneficiaryTRef, {
          userId: beneficiary.userId,
          sender: user.emailAddress,
          amount: amount,
          transactionType: "credit",
          wallet: " btcWallet ",
          date: date,
        });
        //function was called to update user state in app
        setFetching(false);
        setSucessful(true);
        await getUserObj(userId);
      } else {
        setFetching(false);
        setError("Insufficient Funds");
      }
    }
  } else {
    setFetching(false);
    setError("Beneficiary Does not Exist");
  }

  return { beneficiary };
};

//Eth transfer Function
export const ethTransfer = async (
  userId,
  amount,
  ethAddress,
  setError,
  setFetching,
  setSucessful
) => {
  setFetching(true);
  const { user, userdocId } = await getUserObj(userId);
  const { beneficiary, beneficiarydocId } = await getUserEth(ethAddress);
  const newAddress = `eth-address${Date.now()}-patricia-clone`;
  console.log(newAddress);
  //check if beneficiary exist
  if (beneficiary) {
    //check if user balance is sufficient
    if (beneficiary.emailAddress === user.emailAddress) {
      setFetching(false);
      setError("You cant Transfer to your account");
    } else {
      if (user.ethWallet >= amount) {
        //userRef  to perform update
        const userRef = doc(db, "users", userdocId);

        //beneficiaryRef to perform update
        const beneficiaryRef = doc(db, "users", beneficiarydocId);

        //Update User Balance
        await updateDoc(userRef, {
          ethWallet: increment(-amount),
        });

        //update beneficiary Balance
        await updateDoc(beneficiaryRef, {
          ethWallet: increment(amount),
          ethAddress: newAddress,
        });

        //Create Transfer history for user
        const userTransferRef = collection(db, "transactions");
        await addDoc(userTransferRef, {
          userId: user.userId,
          beneficiaryAddresss: beneficiary.ethAddress,
          amount: amount,
          transactionType: "debit",
          wallet: "ethWallet",
          date: date,
        });
        // Create Transfer history for beneficiary
        const beneficiaryTRef = collection(db, "transactions");
        await addDoc(beneficiaryTRef, {
          userId: beneficiary.userId,
          sender: user.emailAddress,
          amount: amount,
          transactionType: "credit",
          wallet: " ethWallet ",
          date: date,
        });
        //function was called to update user state in app
        setFetching(false);
        setSucessful(true);
        await getUserObj(userId);
      } else {
        setFetching(false);
        setError("Insufficient Funds");
      }
    }
  } else {
    setFetching(false);
    setError("Beneficiary Does not Exist");
  }

  return { beneficiary };
};

// Naira Top Up
export const nairaTopUp = async (
  userId,
  amount,
  setError,
  setFetching,
  setSucessful
) => {
  setFetching(true);
  const { user, userdocId } = await getUserObj(userId);
  if (user) {
    //userReference
    const userRef = doc(db, "users", userdocId);

    //Update naira Wallet
    await updateDoc(userRef, {
      nairaWallet: increment(amount),
    });
    // create transaction history
    const userTransferRef = collection(db, "transactions");
    await addDoc(userTransferRef, {
      userId: user.userId,
      amount: amount,
      transactionType: "credit(top-up)",
      wallet: "nairaWallet",
      date: date,
    });

    setFetching(false);
    setSucessful(true);

    await getUserObj(userId);
  } else {
    setError("something went wrong");
  }
};

//btc Top Up
export const btcTopUp = async (
  userId,
  amount,
  setError,
  setFetching,
  setSucessful
) => {
  setFetching(true);
  const { user, userdocId } = await getUserObj(userId);
  if (user) {
    //userReference
    const userRef = doc(db, "users", userdocId);

    //Update eth Wallet
    await updateDoc(userRef, {
      btcWallet: increment(amount),
    });

    //create transaction history
    const userTransferRef = collection(db, "transactions");
    await addDoc(userTransferRef, {
      userId: user.userId,
      amount: amount,
      transactionType: "credit(top-up)",
      wallet: "btcWallet",
      date: date,
    });
    setFetching(false);
    setSucessful(true);
    await getUserObj(userId);
  } else {
    setError("something went wrong");
  }
};

//eth Top Up
export const ethTopUp = async (
  userId,
  amount,
  setError,
  setFetching,
  setSucessful
) => {
  setFetching(true);
  const { user, userdocId } = await getUserObj(userId);
  if (user) {
    //userReference
    const userRef = doc(db, "users", userdocId);

    //Update eth Wallet
    await updateDoc(userRef, {
      ethWallet: increment(amount),
    });

    //create transaction history
    const userTransferRef = collection(db, "transactions");
    await addDoc(userTransferRef, {
      userId: user.userId,
      amount: amount,
      transactionType: "credit(top-up)",
      wallet: "ethWallet",
      date: date,
    });
    setFetching(false);
    setSucessful(true);
    await getUserObj(userId);
  } else {
    setError("something went wrong");
  }
};

//Transactions Request

export const getTransactions = async (userId, dispatch) => {
  let transactions =  [];
  const q = query(
    collection(db, "transactions"),
    where("userId", "==", userId)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
      transactions.push(doc.data() );
  });
  console.log(transactions);
  dispatch(setTransaction(transactions));
  return transactions;
};
