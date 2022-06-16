import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Input, MediaPicker, Stack, Text } from "degen";
import { CallForFunding, Contribution } from "../../graph/loudverse-graph-types";
import ProgressBar from "../ProgressBar";
import { useAccount, useDisconnect, useNetwork, useSigner } from "wagmi";
import CallForFundsLogic from "../../abis/CallForFundsLogic.json";
import ERC20 from "../../abis/ERC20.json";
import { ethers } from "ethers";
import { uploadFinalDeliverable } from "../../utils";
import { polygonDAI } from "../../utils";
import { CallContext } from "../FullPageProject";

const FundingProgress = ({ callForFunding }: { callForFunding: CallForFunding }) => {
  const { data: accountData } = useAccount();
  const { data: signer } = useSigner();
  const { disconnect } = useDisconnect();
  const { activeChain } = useNetwork({
    chainId: 137,
  });

  const [isOwner, setIsOwner] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [txSuccess, setTxSuccess] = useState(false);
  const [amountToContribute, setAmountToContribute] = useState("0");
  const { cffContext, setCFFContext } = useContext(CallContext);

  const [formData, setFormData] = useState({
    file: null,
  });

  let callToAction;

  useEffect(() => {
    if (accountData?.address?.toLowerCase() === callForFunding?.creator?.id) {
      setIsOwner(true);
    } else {
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

  let percentFunded = (Number(cffContext?.lifetimeFundsReceived / cffContext?.minFundingAmount) * 100).toFixed(2);
  if (Number(percentFunded) > 100) {
    percentFunded = "100";
  }
  if (percentFunded === "NaN") {
    percentFunded = "0";
  }

  const initializeDAIWSigner = signer => {
    return new ethers.Contract(polygonDAI, ERC20.abi, signer);
  };

  const contributeDAI = async () => {
    setIsWaiting(true);
    try {
      const daiWrite = initializeDAIWSigner(signer);
      const tx = await daiWrite.transfer(callForFunding.id, ethers.utils.parseEther(amountToContribute));

      const receipt = await tx.wait();
      if (receipt) {
        const updatedCFF = cffContext;

        updatedCFF.contributions.push({
          user: { id: receipt.from },
          amount: ethers.utils.parseEther(amountToContribute).toString(),
          timestamp: tx.timestamp,
          txHash: receipt.transactionHash,
        } as Contribution);
        updatedCFF.lifetimeFundsReceived = ethers.BigNumber.from(updatedCFF.lifetimeFundsReceived).add(
          ethers.utils.parseEther(amountToContribute),
        );

        setCFFContext(prevState => ({
          ...prevState,
          updatedCFF,
        }));

        setTxSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
    setIsWaiting(false);
  };

  const initializeProxyWSigner = signer => {
    return new ethers.Contract(callForFunding?.id, CallForFundsLogic.abi, signer);
  };

  const startStream = async () => {
    const proxyWrite = initializeProxyWSigner(signer);
    const tx = await proxyWrite.startStream({ gasLimit: 10000000 });

    const receipt = await tx.wait();
    if (receipt) {
      console.log(receipt);
    }
  };

  const handleFile = async (file: File) => {
    setFormData(prevState => ({
      ...prevState,
      file: file,
    }));
  };

  const uploadWork = async () => {
    const proxyWrite = initializeProxyWSigner(signer);
    const deliverableURI = await uploadFinalDeliverable({ callForFunding: callForFunding, file: formData.file });
    //TODO SLICER???
    // const tx = await proxyWrite.deliver(deliverableURI, "0x3815f8c062539f5134586f3d923aeb99f51f3f77");

    // const receipt = await tx.wait();
    // if (receipt) {
    //   console.log(receipt);
    // }
  };

  if (isOwner && callForFunding?.fundingState === 2) {
    callToAction = (
      <Box justifySelf="center">
        <Button disabled={activeChain?.unsupported} onClick={() => startStream()}>
          Start Streaming Funds
        </Button>
      </Box>
    );
  } else if (isOwner && callForFunding?.fundingState === 3) {
    callToAction = (
      <Box justifyContent="center" display="flex">
        <Stack justify="center" direction="vertical">
          <MediaPicker label="Upload Work" compact onChange={file => handleFile(file)} />
          <Box display="flex" justifyContent="center">
            <Button disabled={true} onClick={() => uploadWork()}>
              Deliver Work
            </Button>
          </Box>
        </Stack>
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
        <Box marginLeft="4" alignSelf="flex-end">
          <Button
            disabled={isWaiting || txSuccess || activeChain?.unsupported}
            loading={isWaiting}
            onClick={() => {
              contributeDAI();
            }}
          >
            {txSuccess ? "Thank You!" : "Fund"}
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
      <ProgressBar percent={Number(percentFunded).toLocaleString()} />
      <Text align="center">
        Minimum Funding Amount:{" "}
        {(Number(ethers.utils.formatEther(callForFunding?.minFundingAmount)) ?? 0).toLocaleString()}
      </Text>
      <Box display="flex" justifyContent="center" marginY="4">
        {callToAction}
      </Box>
      <Box marginBottom="4">
        <Text size="large">
          {cffContext?.lifetimeFundsReceived
            ? Number(
                Number(ethers.utils.formatEther(callForFunding?.lifetimeFundsReceived ?? 0)).toFixed(2),
              ).toLocaleString()
            : (0).toLocaleString()}{" "}
          DAI from {cffContext?.contributions.length} funders.
          {/* <br /> with estimated Z match */}
        </Text>
      </Box>
      <Box marginBottom="4">
        <Text size="large">
          {/* Funding goal {Number(ethers.utils.formatEther(callForFunding?.minFundingAmount)).toFixed(3)} ETH */}
        </Text>
      </Box>
      <Box>
        <Text size="large">Round #1 ends 31 May 2022</Text>
      </Box>
    </Box>
  );
};

export default FundingProgress;
