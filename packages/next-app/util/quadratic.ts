//import FundingCall from "../../components/Cards/FundingCall";

import {getAllCallsForFunds} from "../graph/functions";
import {CallForFunding} from "../graph/loudverse-graph-types";
import {all} from "deepmerge";


class Quadratic {
    matchAmounts: Map<String, bigint>;  // contract address, amount
    poolAddress: String;
    failedContracts: Array<CallForFunding>;

    constructor(fundingRound: String) {
        this.matchAmounts = new Map<String, bigint>();
        this.poolAddress = fundingRound;
        this.failedContracts = [];
    };

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
    public getMatchForContract(contract: CallForFunding) : bigint {
        if( ! this.matchAmounts.has(contract.id)) {
            this.matchAmounts.set(contract.id,this.computeMatchForContract(contract));
        }
        return this.matchAmounts.get(contract.id);
    };

    /**
     * Computes the match amount for a single contract, non-normalized
     * @private
     * @param contract
     */
    private computeMatchForContract(contract: CallForFunding) : bigint {
        const fundingResult = Quadratic.computeMatch(this.getCommunityFundForContract(contract));
        // did we meet the minimum?
        if(fundingResult.idealTotal < contract.minFundingAmount) {
            // minimum not met -- close
            console.log("  Minimum not met with ideal -- close contract " + contract.id);
            this.failedContracts.push(contract);
            this.matchAmounts.delete(contract.id);
        } else {
            // minimum met -- match
            console.log("  Adding match amount: " + fundingResult.matched + " to contract " + contract.id);
            this.matchAmounts.set(contract.id, fundingResult.matched);
        }
        return fundingResult.matched;
    }

    /**
     * Returns the quadratic match for
     * @private
     * @param contract
     */
    private getCommunityFundForContract(contract: CallForFunding) : Array<bigint> {

        let fundingAmounts = new Array<bigint>();
        if(this.poolAddress === "test2") {
            fundingAmounts = [BigInt(100), BigInt(200), BigInt(100), BigInt(300)];
        } else {
            for(let contribution of contract.contributions) {
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
    private static computeMatch(contributions: Array<bigint>) : { idealTotal: bigint; matched: bigint; contributed: bigint } {
        let matchAmount: number = Number(0);
        let contributedAmount: bigint = BigInt(0);
        // add up the community fund square roots
        for(let amount of contributions) {
            let amountNum: number = Number(amount);
            matchAmount += Math.sqrt(amountNum);
            contributedAmount += amount;
            //console.log("in loop.  amount=" + amount + " matchAmount=" + matchAmount + " contributedAmount=" + contributedAmount);
        }
        // square the result
        console.log("Square: " + (matchAmount * matchAmount));
        let idealTotal: bigint = BigInt(Math.floor(matchAmount * matchAmount));
        if(idealTotal <= contributedAmount) // no match needed
        {
            console.log("   Contributed: " + contributedAmount + ", Ideal total for contract: " + idealTotal + " -- NO MATCH");
            return {
                'contributed': contributedAmount,
                'matched' : BigInt(0),
                'idealTotal' : idealTotal
            };

        } else {
            console.log("   Contributed: " + contributedAmount + ", total for contract: " + idealTotal + ", match: " + (idealTotal - contributedAmount) );
            return {
                'contributed': contributedAmount,
                'matched': idealTotal - contributedAmount,
                'idealTotal': idealTotal
            }
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

    private normalizeFunding() {
        const matchFundsAvailable = this.getAvailableFundsForRound(this.poolAddress);
        let matchAccumulate = BigInt(0);
        for(let amount of this.matchAmounts.values()) {
            matchAccumulate += amount;
        }
        const adjustmentCoefficient: number = Number(matchFundsAvailable) / Number(matchAccumulate);
        console.log("Ideal match: " + matchAccumulate + ".  Available match pool is " + matchFundsAvailable);
        if(matchFundsAvailable > matchAccumulate) {
            console.log("Funding pool has sufficient funds.  No normalization needed");
        } else {
            console.log("Ideal match: " + matchAccumulate + ", match available: " + matchFundsAvailable + ", adjustment: " + adjustmentCoefficient);
        }
        for(let contract of this.matchAmounts.keys()) {
            // Do multiplication as number to avoid integer rounding to 0
            this.matchAmounts.set(contract, BigInt(Math.floor(Number(this.matchAmounts.get(contract)) * adjustmentCoefficient)));
        }
    };

    /**
     *
     * @private
     */
    private getAvailableFundsForRound(matchPoolAddress: String) : bigint {
        //if(matchPoolAddress === "test") {
            return BigInt(3 * 10 ^ 18);
            /*
        }
        else
        {
            return BigInt(0);
            // FIXME: Look up funding balance
        }
             */
    }

    private applyFunding() {
        for(const contract of this.matchAmounts.keys()) {
            console.log("Match address " + contract + " with amount " + this.matchAmounts.get(contract));
        }
    }

    // Shameless copy-pasta from https://golb.hplar.ch/2018/09/javascript-bigint.html
    private static rootNth(value, k = BigInt(2)) {
        if (value < 0) {
            throw 'negative number is not supported'
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

    private static getTestCallsForFunds() : Array<CallForFunding> {
        const mockCalls = new Array<CallForFunding>();
        mockCalls.push( {
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
            fundingState: 0
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
}

export default Quadratic;