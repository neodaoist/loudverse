const { waffle, ethers } = require("hardhat");
const fs = require("fs");

const NETWORK_MAP = {
  4: "rinkeby",
  80001: "mumbai",
};

const rinkebyURL = `https://rinkeby.infura.io/v3/${process.env.INFURA_ID}`;
// const mumbaiURL = `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_ID}`;
const mumbaiURL = `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_ID}`;
const maticURL = `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_ID}`;

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
  await factory.deployed();

  const bonusFunderFactory = await ethers.getContractFactory("BonusFunder");
  const bonusFunder = await bonusFunderFactory.deploy(factory.address);
  await bonusFunder.deployed();

  const info = {
    Contracts: {
      logic: logic.address,
      factory: factory.address,
      crowdCommission: crowdCommission.address,
      smartArt: smartArt.address,
      bonusFunder: bonusFunder.address,
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

  // automate first 5 grants being created
  const deployer = new ethers.Wallet(
    process.env.PRIVATE_KEY,
    new ethers.providers.JsonRpcProvider(mumbaiURL)
  );

  await logic.connect(deployer).setFactory(factory.address);

  await crowdCommission.connect(deployer).transferOwnership(logic.address);
  await smartArt.connect(deployer).transferOwnership(logic.address);

  const factoryWithSigner = factory.connect(deployer);

  const solarpunkProxy = await factoryWithSigner.createCallForFunds(
    "B is 4 Bufficorn", // _title
    "vitalik.eth is commissioning digital art to accompany a children’s storybook", // _description
    "https://infura-ipfs.io/ipfs/bafybeiajw4y5t7bw5qzrqjleo4i5lhb6p7or3mesxwsa3s53yetani5qbi", // _image
    "digital art", // _category
    "generative art", // _genre
    "fractal/algorithmic", // _subgenre
    90, // _timelineInDays
    1, // _minFundingAmount
    "image/jpeg", // _deliverableMedium
    "videoURI" // videoURI
  );
  const solarpunkProxyReceipt = await solarpunkProxy.wait();

  // const buffigweiProxy = await factoryWithSigner.createCallForFunds(
  //   "¿Quien Llamo Carlo?", // _title
  //   "carlo-davidoff.eth is producing multilingual synthwave about identity lost and recovered", // _description
  //   "https://infura-ipfs.io/ipfs/bafybeiaxrxtb3p5wyw3kba5domyec77suy5q52hqfy7vpfqzyuajbvytli", // _image
  //   "music", // _category
  //   "electronic", // _genre
  //   "synthwave", // _subgenre
  //   90, // _timelineInDays
  //   ethers.utils.parseUnits("0.5", "ether"), // _minFundingAmount
  //   "audio/mp3" // _deliverableMedium
  // );

  // const buffigweiProxyReceipt = await buffigweiProxy.wait();

  // const temptedProxy = await factoryWithSigner.createCallForFunds(
  //   "those WERE the buffigwei we were looking for", // _title
  //   "DroidDetecta42.eth is writing an epic poem that revisits a post-crypto Tatooine", // _description
  //   "https://infura-ipfs.io/ipfs/bafybeiem42ao4uyh3ul47oamchykik4tvjapl4gtoyspyskdjzik7grq4y", // _image
  //   "poetry", // _category
  //   "fan fiction poetry", // _genre
  //   "Star Wars fan fiction", // _subgenre
  //   90, // _timelineInDays
  //   1, // _minFundingAmount
  //   "text/pdf" // _deliverableMedium
  // );
  // const temptedProxyReceipt = await temptedProxy.wait();

  // const poetryProxy = await factoryWithSigner.createCallForFunds(
  //   "Tempted from Afar", // _title
  //   "SilverSaraah.eth is reimagining desire in the digital age", // _description
  //   "https://infura-ipfs.io/ipfs/bafkreigaaje35y5fswkz5rssoezq3ribu6mjayf7fxbgfyfue36veimxpq", // _image
  //   "dance", // _category
  //   "modern dance", // _genre
  //   "interpretive modern dance", // _subgenre
  //   90, // _timelineInDays
  //   1, // _minFundingAmount
  //   "video/mp4" // _deliverableMedium
  // );
  // const poetryProxyReceipt = await poetryProxy.wait();

  // const carlosProxy = await factoryWithSigner.createCallForFunds(
  //   "Buff Buffigwei", // _title
  //   "stonelifter.eth is creating immersive animations to tell stories of small becoming big", // _description
  //   "https://infura-ipfs.io/ipfs/bafkreidh6cpdo65dyqot2pfx6glzx4h3z2emrkgtvbhdp7xyjfazycgfky", // _image
  //   "animation", // _category
  //   "generative animation", // _genre
  //   "dynamic painting", // _subgenre
  //   90, // _timelineInDays
  //   ethers.utils.parseUnits("1", "ether"), // _minFundingAmount
  //   "video/mp4" // _deliverableMedium
  // );
  // const carlosProxyReceipt = await carlosProxy.wait();

  // const contributors = [];
  // for (let i = 1; i < 21; i++) {
  //   const contributor = new ethers.Wallet(
  //     process.env[`KEY_${i}`],
  //     new ethers.providers.JsonRpcProvider(mumbaiURL)
  //   );

  //   contributors.push(contributor);

  //   await deployer.sendTransaction({
  //     to: contributor.address,
  //     value: ethers.utils.parseEther(".1"),
  //   });
  // }

  // const SolarpunkAmounts = [
  //   0.085, 0.02, 0.01, 0.015, 0.012, 0, 0.002, 0.1, 0.01, 0.005, 0.005, 0.005,
  //   0.003, 0.018, 0.03, 0.04, 0.055, 0.009, 0, 0.005,
  // ];

  // const BuffigweiAmounts = [
  //   0.01, 0, 0.0919, 0, 0.042, 0.005, 0.005, 0.005, 0.01, 0, 0.005, 0.1, 0.023,
  //   0.025, 0.005, 0, 0, 0, 0, 0,
  // ];

  // const TemptedAmounts = [
  //   0.011, 0.086, 0.005, 0, 0.02, 0, 0, 0.025, 0.1, 0, 0, 0.015, 0, 0, 0, 0.015,
  //   0, 0, 0, 0,
  // ];
  // const PoetryAmounts = [
  //   0.02, 0.005, 0.08, 0.045, 0.004, 0, 0.05, 0.02, 0.01, 0.003, 0.008, 0,
  //   0.016, 0.067, 0.042, 0.069, 0, 0.017, 0.075, 0,
  // ];

  // const CarlosAmounts = [
  //   0.005, 0.02, 0.08, 0.005, 0.019, 0, 0, 0, 0, 0, 0.005, 0.016, 0.07, 0.075,
  //   0.072, 0, 0, 0, 0.042, 0,
  // ];

  // for (let i = 0; i < 20; i++) {
  //   // solarpunk
  //   if (SolarpunkAmounts[i] !== 0) {
  //     const value = ethers.utils.parseEther(
  //       (SolarpunkAmounts[i] / 10).toFixed(10)
  //     );
  //     const tx = await contributors[i].sendTransaction({
  //       to: solarpunkProxyReceipt.events[0].args[0],
  //       value: value,
  //     });
  //     // console.log(tx);
  //   }

  //   // buffigwei
  //   if (BuffigweiAmounts[i] !== 0) {
  //     const value = ethers.utils.parseEther(
  //       (BuffigweiAmounts[i] / 10).toFixed(10)
  //     );
  //     const tx = await contributors[i].sendTransaction({
  //       to: buffigweiProxyReceipt.events[0].args[0],
  //       value: value,
  //     });
  //     // console.log(tx);
  //   }

  //   // tempted
  //   if (TemptedAmounts[i] !== 0) {
  //     const value = ethers.utils.parseEther(
  //       (TemptedAmounts[i] / 10).toFixed(10)
  //     );
  //     const tx = await contributors[i].sendTransaction({
  //       to: temptedProxyReceipt.events[0].args[0],
  //       value: value,
  //     });
  //     // console.log(tx);
  //   }

  //   // poetry
  //   if (PoetryAmounts[i] !== 0) {
  //     const value = ethers.utils.parseEther(
  //       (PoetryAmounts[i] / 10).toFixed(10)
  //     );
  //     const tx = await contributors[i].sendTransaction({
  //       to: poetryProxyReceipt.events[0].args[0],
  //       value: value,
  //     });
  //     // console.log(tx);
  //   }

  //   // carlos
  //   if (CarlosAmounts[i] !== 0) {
  //     const value = ethers.utils.parseEther(
  //       (CarlosAmounts[i] / 10).toFixed(10)
  //     );
  //     const tx = await contributors[i].sendTransaction({
  //       to: carlosProxyReceipt.events[0].args[0],
  //       value: value,
  //     });
  //     // console.log(tx);
  //   }
  // }

  // await new Promise((resolve) => setTimeout(resolve, 30000));

  try {
    await run("verify:verify", {
      address: logic.address,
      contract: "contracts/CallForFundsLogic.sol:CallForFundsLogic",
      constructorArguments: [crowdCommission.address, smartArt.address],
    });
  } catch (error) {
    console.log(error);
  }

  try {
    await run("verify:verify", {
      address: factory.address,
      contract: "contracts/CallForFundsFactory.sol:CallForFundsFactory",
      constructorArguments: [logic.address],
    });
  } catch (error) {
    console.log(error);
  }
  try {
    await run("verify:verify", {
      address: crowdCommission.address,
      contract: "contracts/CrowdCommission.sol:CrowdCommission",
    });
  } catch (error) {
    console.log(error);
  }
  try {
    await run("verify:verify", {
      address: smartArt.address,
      contract: "contracts/SmartArt.sol:SmartArt",
    });
  } catch (error) {
    console.log(error);
  }
  try {
    await run("verify:verify", {
      address: bonusFunder.address,
      contract: "contracts/BonusFunder.sol:BonusFunder",
      constructorArguments: [factory.address],
    });
  } catch (error) {
    console.log(error);
  }

  try {
    await run("verify:verify", {
      address: solarpunkProxyReceipt.events[0].args[0],
      contract: "contracts/CallForFundsProxy.sol:CallForFundsProxy",
      constructorArguments: [
        deployer.address,
        "B is 4 Bufficorn", // _title
        "vitalik.eth is commissioning digital art to accompany a children’s storybook", // _description
        "https://infura-ipfs.io/ipfs/bafybeiajw4y5t7bw5qzrqjleo4i5lhb6p7or3mesxwsa3s53yetani5qbi", // _image
        "digital art", // _category
        "generative art", // _genre
        "fractal/algorithmic", // _subgenre
        "image/jpeg", // _deliverableMedium
        90, // _timelineInDays
        1, // _minFundingAmount
        "videoURI",
      ],
    });
  } catch (error) {
    console.log(error);
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
