import React, { useEffect, useState } from "react";
import { Box, Button, Input, Text } from "degen";
import { CallForFunding } from "../../graph/loudverse-graph-types";
import ProgressBar from "../ProgressBar";
import { useAccount, useSigner, useTransaction } from "wagmi";
import CallForFundsLogic from "../../abis/CallForFundsLogic.json";
import { ethers } from "ethers";

const FundingProgress = ({ callForFunding }: { callForFunding: CallForFunding }) => {
  const [{ data: accountData }, disconnect] = useAccount();
  const [{ error, loading }, getSigner] = useSigner();
  const [isOwner, setIsOwner] = useState(false);
  const [amountToContribute, setAmountToContribute] = useState("0");
  const [{ data }, sendTransaction] = useTransaction({
    request: {
      to: callForFunding?.id,
      value: ethers.utils.parseEther(amountToContribute), // 1 ETH
    },
  });

  console.log(callForFunding?.minFundingAmount);

  let callToAction;

  useEffect(() => {
    console.log(`${accountData?.address}\n${callForFunding?.creator?.id}`);
    if (accountData?.address?.toLowerCase() === callForFunding?.creator?.id) {
      setIsOwner(true);
      console.log("YESSSS");
    } else {
      console.log(`nooo`);
    }
  }, [callForFunding, accountData?.address, disconnect]);

  const fundingState = () => {
    switch (callForFunding?.fundingState) {
      case 0:
        return "Open for Funding";
      case 1:
        return "Minimum Funding Amount Not Reached";
      case 2:
        return "Funding Matched";
      case 3:
        return "Funds Streaming";
      case 4:
        return "Work Delivered";
    }
  };

  let percentFunded = (callForFunding?.lifetimeFundsReceived / callForFunding?.minFundingAmount).toFixed(2);
  if (Number(percentFunded) > 1) {
    percentFunded = "100";
  }
  if (percentFunded === "NaN") {
    percentFunded = "0";
  }

  const initializeProxyWSigner = signer => {
    return new ethers.Contract(callForFunding?.id, CallForFundsLogic.abi, signer);
  };

  const startStream = async () => {
    const proxyWrite = initializeProxyWSigner(await getSigner());
    const tx = await proxyWrite.startStream({ gasLimit: 10000000 });

    const receipt = await tx.wait();
    if (receipt) {
      console.log(receipt);
    }
  };

  if (isOwner && callForFunding?.fundingState === 2) {
    callToAction = (
      <Box justifySelf="center">
        <Button onClick={() => startStream()}>Start Streaming Funds</Button>
      </Box>
    );
  } else if (accountData?.address && !isOwner) {
    callToAction = (
      <>
        <Input
          label="Amount"
          placeholder="Enter amount to contribute"
          onChange={e => {
            if (e.target.value !== ".") {
              setAmountToContribute(e.target.value);
            }
          }}
        />
        <Box marginLeft="4">
          <Button
            onClick={() => {
              sendTransaction();
            }}
          >
            Fund
          </Button>
        </Box>
      </>
    );
  } else if (!isOwner) {
    callToAction = (
      <>
        <Input label="Amount" placeholder="Connect to fund project" disabled />
        {/* <Box marginLeft="4">
          <Button>Connect Wallet</Button>
        </Box> */}
      </>
    );
  }

  return (
    <Box padding="4" backgroundColor="foregroundSecondary" borderRadius="medium">
      <Box marginTop="2" marginBottom="4">
        <Text size="extraLarge" weight="semiBold">
          {fundingState()}
        </Text>
      </Box>

      {/* <Text size="extraLarge">[------Progress Bar--------]</Text> */}
      <ProgressBar percent={percentFunded} />
      <Text align="center">Minimum Funding Amount: {ethers.utils.formatEther(callForFunding.minFundingAmount)}</Text>
      <Box display="flex" justifyContent="center" marginY="4">
        {callToAction}
      </Box>
      <Box marginBottom="4">
        <Text size="large">
          {callForFunding?.lifetimeFundsReceived
            ? Number(ethers.utils.formatEther(callForFunding?.lifetimeFundsReceived)).toFixed(3)
            : 0}{" "}
          ETH from {callForFunding?.contributions.length} funders. <br /> with estimated Z match
        </Text>
      </Box>
      <Box marginBottom="4">
        <Text size="large">
          {/* Funding goal {Number(ethers.utils.formatEther(callForFunding?.minFundingAmount)).toFixed(3)} ETH */}
        </Text>
      </Box>
      <Box>
        <Text size="large">8 days left until round ends</Text>
      </Box>
    </Box>
  );
};

export default FundingProgress;
