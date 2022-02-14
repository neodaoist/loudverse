const { ethers, waffle } = require("hardhat");
const fs = require("fs");

const NETWORK_MAP = {
  137: "matic",
  80001: "mumbai",
};

const isLocal = false;

async function main() {
  const chainId = (await waffle.provider.getNetwork()).chainId;

  console.log({ chainId });
  const networkName = NETWORK_MAP[chainId];

  console.log(`Deploying to ${networkName}`);

  const CallForFundsLogic = await ethers.getContractFactory(
    "CallForFundsLogic"
  );
  const logic = await CallForFundsLogic.deploy();
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

  // await run("verify:verify", {
  //   address: logic.address,
  //   contract: "contracts/CallForFundsLogic.sol:CallForFundsLogic",
  // });

  await run("verify:verify", {
    address: factory.address,
    contract: "contracts/CallForFundsFactory.sol:CallForFundsFactory",
    constructorArguments: [logic.address],
  });

  // automate first 5 grants being created
  const deployer = new ethers.Wallet(
    process.env.PRIVATE_KEY,
    new ethers.providers.JsonRpcProvider(
      "https://polygon-mumbai.infura.io/v3/d3276e4d49274a54be2a0039dadfbb02"
    )
  );
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
  console.log(solarpunkProxyReceipt);

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
}

main()
  // eslint-disable-next-line no-process-exit
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  });
