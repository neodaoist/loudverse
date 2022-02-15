import Quadratic from "./quadratic";
//const Quadratic = require("./quadratic")

//function main() {
  const fundingRound = BigInt(process.argv[2]);
  console.log("End round triggered from GitHub Action for round " + fundingRound);
  new Quadratic(BigInt(3)).doRoundEnd();
  console.log("After constructor")
  //new Quadratic(fundingRound).doRoundEnd();
//}

//if (require.main === module) {
//  main();
//}
