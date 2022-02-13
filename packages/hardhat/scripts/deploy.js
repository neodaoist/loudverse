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

  const GrantLogic = await ethers.getContractFactory("GrantLogic");
  const logic = await GrantLogic.deploy();
  await logic.deployed();

  const GrantFactory = await ethers.getContractFactory("GrantFactory");
  const factory = await GrantFactory.deploy(logic.address);
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
}

main()
  // eslint-disable-next-line no-process-exit
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  });
