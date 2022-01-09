export function seedDatabase(firebase) {
  const users = [
    {
      userId: "hiTnmPS5Y3hZWzyOWb65jNZUvBh1",
      username: "williams",
      fullName: "Williams Agbunu",
      emailAddress: "williamsagbunu@gmail.com",
      nairaWallet: 500000,
      ethWallet: 0,
      btcWallet: 0,
      dateCreated: Date.now(),
    },
    {
      userId: "2",
      username: "raphael",
      fullName: "Raffaello Sanzio da Urbino",
      emailAddress: "raphael@sanzio.com",
      nairaWallet: 200000,
      ethWallet: 0,
      btcWallet: 0,
      dateCreated: Date.now(),
    },
    {
      userId: "3",
      username: "dali",
      fullName: "Salvador Dalí",
      emailAddress: "salvador@dali.com",
      nairaWallet: 300000,
      ethWallet: 0,
      btcWallet: 0,
      dateCreated: Date.now(),
    },
    {
      userId: "4",
      username: "orwell",
      fullName: "George Orwell",
      emailAddress: "george@orwell.com",
      nairaWallet: 100000,
      ethWallet: 0,
      btcWallet: 0,
      dateCreated: Date.now(),
    },
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection("users").add(users[k]);
  }
}
