import Quadratic from "./quadratic";
//const Quadratic = require("./quadratic")

//function main() {
  const fundingRound = process.argv[2];
  console.log("End round triggered from GitHub Action for round " + fundingRound);
  new Quadratic(process.argv[2]).doRoundEnd();
  //console.log("Funding complete.")
//}

//if (require.main === module) {
//  main();
//}
