const { ethers } = require("hardhat");

const rinkebyURL = `https://rinkeby.infura.io/v3/${process.env.INFURA_ID}`;

const solarpunkAddress = "0xF876010BB6f4DC8974DfC582361622603e21Ff27";

async function main() {
  // automate first 5 grants being created
  const deployer = new ethers.Wallet(
    process.env.PRIVATE_KEY,
    new ethers.providers.JsonRpcProvider(rinkebyURL)
  );

  const contributors = [];
  for (let i = 1; i < 21; i++) {
    const contributor = new ethers.Wallet(
      process.env[`KEY_${i}`],
      new ethers.providers.JsonRpcProvider(rinkebyURL)
    );

    contributors.push(contributor);
  }

  const SolarpunkAmounts = [
    0.085, 0.02, 0.01, 0.015, 0.012, 0.05, 0.002, 0.01, 0.01, 0.005, 0.005,
    0.005, 0.003, 0.018, 0.03, 0.04, 0.055, 0.009, 0.05, 0.005,
  ];

  for (let i = 0; i < 20; i++) {
    const testValue = SolarpunkAmounts[i] / 100;
    console.log(testValue);
    const value = ethers.utils.parseEther(
      (SolarpunkAmounts[i] / 10).toFixed(10)
    );
    const tx = await contributors[i].sendTransaction({
      to: solarpunkAddress,
      value: value,
    });
  }
}

main();
