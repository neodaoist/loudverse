//import FundingCall from "../../components/Cards/FundingCall";


// export = Quadratic;

export class Quadratic {
    matchAmounts: Map<bigint, bigint>;  // contract address, amount

    constructor(fundingRound: bigint) {
        this.matchAmounts = new Map<bigint, bigint>();
    };

    /**
     * Returns the match amount, in wei, for one contract.  Computes the match as needed as a side-effect
     * @param contractId
     */
    public getMatchForContract(contractId: bigint) : bigint {
        if( ! this.matchAmounts.has(contractId)) {
            this.matchAmounts = this.computeMatchForContract(contractId);
        }
        return this.matchAmounts.get(contractId);
    };

    /**
     * Computes the match amount for a single contract, non-normalized
     * @param contractId
     * @private
     */
    private computeMatchForContract(contractId: bigint) {
        const communityFunding = this.getCommunityFundForContract(contractId);
        return undefined;
    }

    /**
     * Returns the quadratic match for
     * @param contractId
     * @private
     */
    private getCommunityFundForContract(contractId: bigint) : bigint {
        // FIXME: Call The Graph function here
        const fundingAmounts: Array<bigint> = [BigInt(100), BigInt(200), BigInt(100), BigInt(300)];
        return Quadratic.computeMatch(fundingAmounts);
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

    private normalizeFunding() {

    };

    private applyFunding() {
        //
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

