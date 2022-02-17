const { waffle, ethers } = require("hardhat");
const fs = require("fs");

const NETWORK_MAP = {
  4: "rinkeby",
};

const rinkebyURL = `https://rinkeby.infura.io/v3/${process.env.INFURA_ID}`;

const isLocal = false;

async function main() {
  const chainId = (await waffle.provider.getNetwork()).chainId;

  console.log({ chainId });
  const networkName = NETWORK_MAP[chainId];

  console.log(`Deploying to ${networkName}`);

  const CrowdCommission = await ethers.getContractFactory("CrowdCommission");
  const crowdCommission = await CrowdCommission.deploy();
  await crowdCommission.deployed();

  const SmartArt = await ethers.getContractFactory("SmartArt");
  const smartArt = await SmartArt.deploy();
  await smartArt.deployed();

  const CallForFundsLogic = await ethers.getContractFactory(
    "CallForFundsLogic"
  );
  const logic = await CallForFundsLogic.deploy(
    crowdCommission.address,
    smartArt.address
  );
  await logic.deployed();

  const CallForFundsFactory = await ethers.getContractFactory(
    "CallForFundsFactory"
  );
  const factory = await CallForFundsFactory.deploy(logic.address);
  await factory.deployed(logic.address);

  const info = {
    Contracts: {
      logic: logic.address,
      factory: factory.address,
    },
  };

  console.log(info);

  if (!isLocal) {
    fs.writeFileSync(
      `${__dirname.slice(0, -8)}/networks/${networkName}.json`,
      JSON.stringify(info, null, 2)
    );
  }

  // wait for polygonscan before verifying
  await new Promise((resolve) => setTimeout(resolve, 60000));
  try {
    await run("verify:verify", {
      address: logic.address,
      contract: "contracts/CallForFundsLogic.sol:CallForFundsLogic",
    });

    await run("verify:verify", {
      address: factory.address,
      contract: "contracts/CallForFundsFactory.sol:CallForFundsFactory",
      constructorArguments: [logic.address],
    });
  } catch (error) {
    console.log(error);
  }

  // automate first 5 grants being created
  const deployer = new ethers.Wallet(
    process.env.PRIVATE_KEY,
    new ethers.providers.JsonRpcProvider(rinkebyURL)
  );

  await crowdCommission.connect(deployer).transferOwnership(logic.address);
  await smartArt.connect(deployer).transferOwnership(logic.address);

  const factoryWithSigner = factory.connect(deployer);

  const solarpunkProxy = await factoryWithSigner.createCallForFunds(
    "Solarpunk Strings", // _title
    "A musical Solarpunk experience with a Western Classical twist", // _description
    "https://infura-ipfs.io/ipfs/QmcqEeTAi7U7oFEVVLE3J8NWeF1mjAbTzqx15YbFFb98ZH", // _image
    "Music", // _category
    "Classical Music", // _genre
    "String Quartet", // _subgenre
    90, // _timelineInDays
    1, // _minFundingAmount
    "Recording as audio/mp3, Score as text/pdf" // _deliverableMedium
  );
  const solarpunkProxyReceipt = await solarpunkProxy.wait();
  console.log(JSON.stringify(solarpunkProxyReceipt.events[0]));

  const buffigweiProxy = await factoryWithSigner.createCallForFunds(
    "Buff Buffigwei", // _title
    "An immersive animation that tells the story when small becomes big", // _description
    "https://infura-ipfs.io/ipfs/QmcqEeTAi7U7oFEVVLE3J8NWeF1mjAbTzqx15YbFFb98ZH", // _image
    "Animation", // _category
    "TODO", // _genre
    "TODO", // _subgenre
    90, // _timelineInDays
    1, // _minFundingAmount
    "TODO" // _deliverableMedium
  );
  const buffigweiProxyReceipt = await buffigweiProxy.wait();
  console.log(buffigweiProxyReceipt);

  const temptedProxy = await factoryWithSigner.createCallForFunds(
    "Tempted from Afar", // _title
    "Reimaging desire in the digital age", // _description
    "https://infura-ipfs.io/ipfs/QmcqEeTAi7U7oFEVVLE3J8NWeF1mjAbTzqx15YbFFb98ZH", // _image
    "Dance", // _category
    "TODO", // _genre
    "TODO", // _subgenre
    90, // _timelineInDays
    1, // _minFundingAmount
    "TODO" // _deliverableMedium
  );
  const temptedProxyReceipt = await temptedProxy.wait();
  console.log(temptedProxyReceipt);

  const poetryProxy = await factoryWithSigner.createCallForFunds(
    "Those WERE the gwei we were looking for", // _title
    "TODO", // _description
    "https://infura-ipfs.io/ipfs/QmcqEeTAi7U7oFEVVLE3J8NWeF1mjAbTzqx15YbFFb98ZH", // _image
    "Poetry", // _category
    "TODO", // _genre
    "TODO", // _subgenre
    90, // _timelineInDays
    1, // _minFundingAmount
    "TODO" // _deliverableMedium
  );
  const poetryProxyReceipt = await poetryProxy.wait();
  console.log(poetryProxyReceipt);

  const carlosProxy = await factoryWithSigner.createCallForFunds(
    "¿Quien Llamo Carlo?", // _title
    "TODO", // _description
    "https://infura-ipfs.io/ipfs/QmcqEeTAi7U7oFEVVLE3J8NWeF1mjAbTzqx15YbFFb98ZH", // _image
    "Music", // _category
    "TODO", // _genre
    "TODO", // _subgenre
    90, // _timelineInDays
    1, // _minFundingAmount
    "TODO" // _deliverableMedium
  );
  const carlosProxyReceipt = await carlosProxy.wait();
  console.log(carlosProxyReceipt);

  const contributors = [];
  for (let i = 1; i < 21; i++) {
    const contributor = new ethers.Wallet(
      process.env[`KEY_${i}`],
      new ethers.providers.JsonRpcProvider(rinkebyURL)
    );

    contributors.push(contributor);
  }

  const SolarpunkAmounts = [
    0.085, 0.02, 0.01, 0.015, 0.012, 0, 0.002, 0.25, 0.01, 0.005, 0.005, 0.005,
    0.003, 0.018, 0.03, 0.04, 0.055, 0.009, 0, 0.005,
  ];

  const BuffigweiAmounts = [
    0.01, 0, 0.119, 0, 0.042, 0.005, 0.005, 0.005, 0.01, 0, 0.005, 0.1, 0.023,
    0.025, 0.005, 0, 0, 0, 0, 0,
  ];

  const TemptedAmounts = [
    0.011, 0.086, 0.005, 0, 0.02, 0, 0, 0.025, 0.1, 0, 0, 0.015, 0, 0, 0, 0.015,
    0, 0, 0, 0,
  ];
  const PoetryAmounts = [
    0.02, 0.005, 0.08, 0.045, 0.004, 0, 0.05, 0.02, 0.01, 0.003, 0.008, 0,
    0.016, 0.067, 0.042, 0.069, 0, 0.017, 0.075, 0,
  ];

  const CarlosAmounts = [
    0.005, 0.02, 0.08, 0.005, 0.019, 0, 0, 0, 0, 0, 0.005, 0.016, 0.07, 0.075,
    0.072, 0, 0, 0, 0.042, 0,
  ];

  for (let i = 0; i < 20; i++) {
    // solarpunk
    if (SolarpunkAmounts[i] !== 0) {
      const testValue = SolarpunkAmounts[i] / 100;
      console.log(testValue);
      const value = ethers.utils.parseEther(
        (SolarpunkAmounts[i] / 100).toFixed(10)
      );
      const tx = await contributors[i].sendTransaction({
        to: solarpunkProxyReceipt.events[0].args[0],
        value: value,
      });
      // console.log(tx);
    }

    // buffigwei
    if (BuffigweiAmounts[i] !== 0) {
      const value = ethers.utils.parseEther(
        (BuffigweiAmounts[i] / 100).toFixed(10)
      );
      const tx = await contributors[i].sendTransaction({
        to: buffigweiProxyReceipt.events[0].args[0],
        value: value,
      });
      // console.log(tx);
    }

    // tempted
    if (TemptedAmounts[i] !== 0) {
      const value = ethers.utils.parseEther(
        (TemptedAmounts[i] / 100).toFixed(10)
      );
      const tx = await contributors[i].sendTransaction({
        to: temptedProxyReceipt.events[0].args[0],
        value: value,
      });
      // console.log(tx);
    }

    // poetry
    if (PoetryAmounts[i] !== 0) {
      const value = ethers.utils.parseEther(
        (PoetryAmounts[i] / 100).toFixed(10)
      );
      const tx = await contributors[i].sendTransaction({
        to: poetryProxyReceipt.events[0].args[0],
        value: value,
      });
      // console.log(tx);
    }

    // carlos
    if (CarlosAmounts[i] !== 0) {
      const value = ethers.utils.parseEther(
        (CarlosAmounts[i] / 100).toFixed(10)
      );
      const tx = await contributors[i].sendTransaction({
        to: carlosProxyReceipt.events[0].args[0],
        value: value,
      });
      // console.log(tx);
    }
  }
}

main()
  // eslint-disable-next-line no-process-exit
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  });
