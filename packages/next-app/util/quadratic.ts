//import FundingCall from "../../components/Cards/FundingCall";

class Quadratic {
    matchAmounts: Map<bigint, bigint>;  // contract address, amount
    poolAddress: bigint;

    constructor(fundingRound: bigint) {
        this.matchAmounts = new Map<bigint, bigint>();
        this.poolAddress = fundingRound;
        console.log("IN the constructor.  Yay!");
    };

    /** Entry point for ending a funding round -- typically called from Github action
     * @param matchPoolAddress
     */
    public doRoundEnd() {
        console.log("Processing round end for " + this.poolAddress);
        this.computeMatchForRound();
        this.normalizeFunding(this.poolAddress);
        this.applyFunding();
    }
    /**
     * Returns the match amount, in wei, for one contract.  Computes the match as needed as a side-effect
     * @param contractId
     */
    public getMatchForContract(contractId: bigint) : bigint {
        if( ! this.matchAmounts.has(contractId)) {
            this.matchAmounts.set(contractId,this.computeMatchForContract(contractId));
        }
        return this.matchAmounts.get(contractId);
    };

    /**
     * Computes the match amount for a single contract, non-normalized
     * @param contractId
     * @private
     */
    private computeMatchForContract(contractId: bigint) : bigint {
        return Quadratic.computeMatch(this.getCommunityFundForContract(contractId));
    }

    /**
     * Returns the quadratic match for
     * @param contractId
     * @private
     */
    private getCommunityFundForContract(contractId: bigint) : Array<bigint> {
        // FIXME: Call The Graph function here, hardcoded for now
        const fundingAmounts: Array<bigint> = [BigInt(100), BigInt(200), BigInt(100), BigInt(300)];
        return fundingAmounts;
    }

    /**
     * Computes the match amount (square of the sums of the square roots of the input)
     * @param contributions
     * @private
     */
    private static computeMatch(contributions: Array<bigint>) : bigint {
        let matchAmount: bigint = BigInt(0);
        // add up the community fund square roots
        for(let amount of contributions) {
            matchAmount += Quadratic.sqrt(amount);
        }
        // square the result
        return (matchAmount * matchAmount);
    }

    private computeMatchForRound() {

    };

    private normalizeFunding(matchPoolAddress: bigint) {
        const matchFundsAvailable = this.getAvailableFundsForRound(matchPoolAddress);
        console.log("Available match pool is " + matchFundsAvailable);
        let matchAccumulate = BigInt(0);
        for(let amount of this.matchAmounts.values()) {
            matchAccumulate += amount;
        }
        const adjustmentCoefficient: number = Number(matchFundsAvailable) / Number(matchAccumulate);
        if(matchFundsAvailable > matchAccumulate) {
            console.log("Funding pool has sufficient funds.  No normalization needed");
        } else {
            console.log("Ideal match: " + matchAccumulate + ", match available: " + matchFundsAvailable + ", adjustment: " + adjustmentCoefficient);
        }
        for(let contract of this.matchAmounts.keys()) {
            // Do multiplication as number to avoid integer rounding to 0
            this.matchAmounts.set(contract, BigInt(Number(this.matchAmounts.get(contract)) * adjustmentCoefficient));
        }
    };

    /**
     *
     * @private
     */
    private getAvailableFundsForRound(matchPoolAddress: bigint) : bigint {
        return BigInt(3 * 10^18);  // FIXME: Hardcoded
    }

    private applyFunding() {
        for(const contract of this.matchAmounts.keys()) {
            console.log("Match address ")
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

}

export default Quadratic;