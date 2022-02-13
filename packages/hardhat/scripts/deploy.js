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
  await factory.deployed();

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

  //TODO
  // automate first 5 grants being created
  // const deployer = new ethers.Wallet(
  //   process.env.PRIVATE_KEY,
  //   "https://rpc-mumbai.maticvigil.com"
  // );
  // const factoryWithSigner = factory.connect(deployer);
  // const grantProxy = factoryWithSigner.createCallForFunds();

  // wait for polygonscan before verifying
  await new Promise((resolve) => setTimeout(resolve, 60000));

  await run("verify:verify", {
    address: logic.address,
    contract: "contracts/CallForFundsLogic.sol:CallForFundsLogic",
    contractArguments: [],
  });

  await run("verify:verify", {
    address: factory.address,
    contract: "contracts/CallForFundsFactory.sol:CallForFundsFactory",
    contractArguments: [logic.address],
  });
}

main()
  // eslint-disable-next-line no-process-exit
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  });
