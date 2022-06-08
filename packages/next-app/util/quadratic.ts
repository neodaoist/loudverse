import { getAllCallsForFunds } from "../graph/functions";
import { CallForFunding } from "../graph/loudverse-graph-types";
import { Contract, ethers } from "ethers";
import CFFLogicJSON from "../abis/CallForFundsLogic.json";
import { SigningKey } from "@ethersproject/signing-key";
// import { HexString } from "walletlink/dist/types";
import * as net from "net";

/**
 * Holds the state of proposed mathcing and funding for a single CallForFunding during computation and normalization
 */
interface FundingState {
  contributions: bigint;
  idealTotal: bigint;
  proposedMatch: bigint;
}

class Quadratic {
  fundingStates: Map<String, FundingState>; // contract address, amount
  private readonly poolAddress: String;
  failedContracts: Array<CallForFunding>;
  eligibleContracts: Set<CallForFunding>;
  private readonly poolKey: String;
  private readonly fundingAmount: bigint;
  private readonly maxPerCall: bigint;
  private readonly network: String;
  private readonly networkUrls: Map<String, String> = new Map<String, String>()
    .set("rinkeby", "https://rinkeby.infura.io/v3/d3276e4d49274a54be2a0039dadfbb02")
    .set("polygon", "tbd")
    .set("mumbai", "tdb")
    .set("dryrun", "test");

  constructor(fundingAmount: String, poolKey: String, maxPerCall: String, network: String) {
    this.fundingStates = new Map<String, FundingState>();
    this.failedContracts = [];
    this.eligibleContracts = new Set<CallForFunding>();
    this.poolKey = poolKey;
    this.maxPerCall = BigInt(Number(maxPerCall.toString()) * 10 ** 18);
    this.network = network;
    this.fundingAmount = BigInt(Number(fundingAmount.toString()) * 10 ** 18);
  }

  /** Entry point for ending a funding round -- typically called from Github action
   */
  public async doRoundEnd() {
    console.log("Processing round end for " + this.poolAddress);
    await this.computeMatchForRound();
    console.log("Normalizing...");
    await this.normalizeFunding();
    console.log("Applying...");
    await this.applyFunding();
    console.log("Round complete.");
  }
  /**
   * Returns the match amount, in wei, for one contract.  Computes the match as needed as a side-effect
   * @param contract
   */
  public getMatchForContract(contract: CallForFunding): bigint {
    if (!this.fundingStates.has(contract.id)) {
      this.fundingStates.set(contract.id, this.computeMatchForContract(contract));
    }
    return this.fundingStates.get(contract.id).proposedMatch;
  }

  /**
   * Computes the match amount for a single contract, non-normalized
   * @private
   * @param contract
   */
  private computeMatchForContract(contract: CallForFunding): FundingState {
    const fundingResult = Quadratic.computeMatch(this.getCommunityFundForContract(contract));
    // limit to max match, if a max is set
    if (this.maxPerCall > 0 && fundingResult.idealTotal > this.maxPerCall) {
      fundingResult.idealTotal = this.maxPerCall;
    }

    // did we meet the minimum?
    console.log("  Minimum: " + contract.minFundingAmount + ", Ideal total: " + fundingResult.idealTotal);
    /* Trying to add "scale up" logic for Round One
    if (fundingResult.idealTotal < contract.minFundingAmount) {
      // minimum not met -- close
      console.log("  Minimum not met with ideal -- close contract " + contract.id);
      this.failedContracts.push(contract);
      this.fundingStates.delete(contract.id);
    } else {
      // minimum met -- match
     */
      console.log("  Adding match amount: " + fundingResult.proposedMatch + " to contract " + contract.id);
      this.fundingStates.set(contract.id, fundingResult);
      this.eligibleContracts.add(contract);
//    }
    return fundingResult;
  }

  /**
   * Returns the quadratic match for a single CallForFunding
   * @private
   * @param contract
   */
  private getCommunityFundForContract(contract: CallForFunding): Array<bigint> {
    let fundingAmounts = new Array<bigint>();
    if (this.poolAddress === "test2") {
      //fundingAmounts = [BigInt(100), BigInt(200), BigInt(100), BigInt(300)];
      fundingAmounts = [
        BigInt(Math.floor(Math.random() * 100)),
        BigInt(Math.floor(Math.random() * 100)),
        BigInt(Math.floor(Math.random() * 100)),
        BigInt(Math.floor(Math.random() * 100)),
      ];
    } else {
      for (let contribution of contract.contributions) {
        fundingAmounts.push(contribution.amount);
      }
    }
    console.log("Contributions for contract " + contract.id + ": " + fundingAmounts);
    return fundingAmounts;
  }

  /**
   * Computes the match amount (square of the sums of the square roots of the input)
   * @param contributions
   * @private
   */
  private static computeMatch(contributions: Array<bigint>): FundingState {
    let matchAmount: number = Number(0);
    let contributedAmount: bigint = BigInt(0);
    // add up the community fund square roots
    for (let amount of contributions) {
      let amountNum: number = Number(amount);
      matchAmount += Math.sqrt(amountNum);
      contributedAmount += BigInt(amount);
      //console.log("in loop.  amount=" + amount + " matchAmount=" + matchAmount + " contributedAmount=" + contributedAmount);
    }
    // square the result
    //console.log("Square: " + (matchAmount * matchAmount));
    let idealTotal: bigint = BigInt(Math.floor(matchAmount * matchAmount));
    if (idealTotal <= contributedAmount) {
      // no match needed
      console.log("  Contributed: " + contributedAmount + ", Ideal total for contract: " + idealTotal + " -- NO MATCH");
      return {
        contributions: contributedAmount,
        proposedMatch: BigInt(0),
        idealTotal: idealTotal,
      };
    } else {
      console.log(
        "  Contributed: " +
          contributedAmount +
          ", total for contract: " +
          idealTotal +
          ", match: " +
          (idealTotal - contributedAmount),
      );

      return {
        contributions: contributedAmount,
        // This idea seems incompatible with normalize up behavior
        //proposedMatch: idealTotal - contributedAmount,
        proposedMatch: idealTotal,
        idealTotal: idealTotal,
      };
    }
  }

  private async computeMatchForRound() {
    let allCallsForRound;
    // Get contracts
    if (this.poolAddress === "test") {
      console.log("*** Using test data ***");
      allCallsForRound = Quadratic.getTestCallsForFunds();
    } else {
      const allCallsForRound = await getAllCallsForFunds();

      //allCallsForRound.then(contracts => {
      for (let contract of allCallsForRound) {
        this.computeMatchForContract(contract);
      }
      //}
    }
  }

  /**
   * Simple normalization -- compute the ratio between ideal match and actual pool amount, apply to each contract's match
   * @private
   */
  private normalizeFunding() {
    let lastround = false;
    console.log("Runoff: considering " + this.eligibleContracts.size + " calls for funds");
    if (this.eligibleContracts.size === 0) {
      return;
    }
    let matchAccumulate = BigInt(0);
    for (let contract of this.fundingStates.values()) {
      matchAccumulate += contract.proposedMatch;
    }
    const adjustmentCoefficient: number = Number(this.fundingAmount) / Number(matchAccumulate);
    console.log("Ideal match: " + matchAccumulate + ".  Available match pool is " + this.fundingAmount);
    if (this.fundingAmount > matchAccumulate) {

      console.log("Funding pool has sufficient funds.  Adjust upward to consume pool");
      lastround = true;
    } // else {
      console.log(
        "Ideal match: " +
          matchAccumulate +
          ", match available: " +
          this.fundingAmount +
          ", adjustment: " +
          adjustmentCoefficient,
      );
    // }
    // Adjust the match amounts
    for (let contract of this.fundingStates.keys()) {
      let fundingState = this.fundingStates.get(contract);
      // Do multiplication as number to avoid integer rounding to 0
      fundingState.proposedMatch = BigInt(Math.floor(Number(fundingState.proposedMatch) * adjustmentCoefficient));
      this.fundingStates.set(contract, fundingState);
    }

    // check if all contracts have met their minimums
    let minimumsMet = true;
    for (const contract of this.eligibleContracts) {
      const fundingState = this.fundingStates.get(contract.id)
      if(fundingState.contributions + fundingState.proposedMatch < contract.minFundingAmount) {
        console.log("Contract " + contract.title + "did not meet minimum after scaling.  Dropping...");
        this.failedContracts.push(contract);
        this.eligibleContracts.delete(contract);
        this.fundingStates.delete(contract.id);
        minimumsMet = false;
      }
    }
    if( ! minimumsMet) {
      // Run normalization one more time
      console.log("At least one call was removed for unmet minimums -- renormalize");
      this.normalizeFunding();
    }

    if(lastround) {
      return;
    }
    if (this.removeFarthestUnmet()) {
      // recurse
      this.normalizeFunding();
    }
  }

  private async applyFunding() {
    console.log("--------");
    console.log("Round results:");
    console.log("Failed calls for funds:");

    const logicABI = CFFLogicJSON.abi;

    const networkUrl = this.networkUrls.get(this.network);

    let deployer;
    if (networkUrl === "test") {
      console.log("** DRYRUN -- Will not output to blockchain **");
    } else {
      deployer = new ethers.Wallet(
        this.poolKey.toString(),
        new ethers.providers.JsonRpcProvider(networkUrl.toString()),
      );
    }

    const initializeProxyWDeployer = ({ proxyAddress }: { proxyAddress: string }) => {
      return new ethers.Contract(proxyAddress, logicABI, deployer);
    };

    for (const contract of this.failedContracts) {
      console.log(contract.id + " (" + contract.title + ") min: " + contract.minFundingAmount);
    }
    console.log("---- Matches ----");
    let lcv = 1;
    for (const contract of this.eligibleContracts) {
      console.log(
        "Match address " +
          contract.id +
          " (" +
          contract.title +
          ") with amount " +
          this.fundingStates.get(contract.id).proposedMatch,
      );
      const funders: string[] = contract.contributions.map(contribution => {
        return contribution.user.id;
      });
      if (networkUrl != "test") {
        const tx = await initializeProxyWDeployer({ proxyAddress: contract.id }).matchCallForFunds(
          funders,
          lcv,
          ethers.utils.formatBytes32String(""),
          { gasLimit: 2000000, gasPrice: 100 },
        );
        console.log(tx.wait());
        lcv++;
      }
    }
    console.log("----------");
    console.log("Calling Bonus Funder (Chainlink VRFv2) to award bonus grant at random..."); // TODO: Invoke contract here instead of manual
  }

  // Shameless copy-pasta from https://golb.hplar.ch/2018/09/javascript-bigint.html
  private static rootNth(value, k = BigInt(2)) {
    if (value < 0) {
      throw "negative number is not supported";
    }

    let o = 0;
    let x = value;
    let limit = 100;

    while (x ** k !== k && x !== o && --limit) {
      o = x;
      x = ((k - BigInt(1)) * x + value / x ** (k - BigInt(1))) / k;
    }

    return x;
  }

  private static sqrt(value) {
    return Quadratic.rootNth(value);
  }

  private static getTestCallsForFunds(): Array<CallForFunding> {
    const mockCalls = new Array<CallForFunding>();
    mockCalls.push({
      contributions: undefined,
      creator: undefined,
      currentRoundFundsReceived: undefined,
      deliverableMedium: "",
      id: "test",
      image: "",
      lifetimeFundsReceived: undefined,
      minFundingAmount: "100 DAI",
      title: "Solarpunk Strings",
      description: "@wellwisher.eth is creating a musical solarpunk experience with a Western classical twist",
      category: "music",
      genre: "Classical Music",
      subgenre: "String Quartet",
      timelineInDays: 90,
      fundingState: 0,
      timestamp: 0,
    });
    const txLog = [
      {
        funder: "@funder1.eth",
        amount: "100",
        timestamp: "Sun Feb 13 2022 20:13:28",
      },
      {
        funder: "@funder2.eth",
        amount: "20",
        timestamp: "Sun Feb 13 2022 20:13:28",
      },
      {
        funder: "@funder3.eth",
        amount: "35",
        timestamp: "Sun Feb 13 2022 20:13:28",
      },
    ];
    //mockCalls[0].contributions = txLog;
    return mockCalls;
  }

  /**
   * Called in the case that we don't have enough in the funding pool to match all CallsForFunds.  Finds the CFF that's
   * farthest from meeting its minimum and removes it.
   * @private
   * @return true if any funds were removed, false if all funds meet their minimums with current matching
   */
  private removeFarthestUnmet(): boolean {
    let farthestDifference = BigInt(0);
    let candidate: CallForFunding = undefined;
    for (let contract of this.eligibleContracts) {
      const fundingState = this.fundingStates.get(contract.id);
      if (
        contract.minFundingAmount > fundingState.proposedMatch &&
        fundingState.proposedMatch - contract.minFundingAmount > farthestDifference
      ) {
        // farther than the current candidate
        farthestDifference = fundingState.proposedMatch - contract.minFundingAmount;
        candidate = contract;
      }
    }
    if (candidate != undefined) {
      console.log("Instant runoff: removing contract " + candidate.id + " (" + candidate.title + ")");
      this.failedContracts.push(candidate);
      this.fundingStates.delete(candidate.id);
      this.eligibleContracts.delete(candidate);
      return true;
    } else {
      console.log("Instant runoff: all contracts meet their minimum");
      return false;
    }
  }
}

export default Quadratic;
