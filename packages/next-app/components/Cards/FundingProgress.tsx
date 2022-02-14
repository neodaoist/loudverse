import React from "react";
import { Box, Button, Input, Text } from "degen";

const FundingProgress = ({ callForFunding }: { callForFunding: CallForFundsGraphType }) => {
  let userConnected = false;
  let isCallCreator = false;
  let callToAction;

  if (isCallCreator) {
    callToAction = <Button>Start Streaming Funds</Button>;
  } else if (userConnected) {
    callToAction = (
      <>
        <Input label="Amount" placeholder="Enter your funding amount" disabled />
        <Button>Fund</Button>
      </>
    );
  } else {
    callToAction = (
      <>
        <Input label="Amount" placeholder="Connect to fund project" disabled />
        <Button>Connect Wallet</Button>
      </>
    );
  }

  return (
    <Box backgroundColor="foregroundSecondary" padding="4">
      <Text size="extraLarge">[------Progress Bar--------]</Text>
      <Box display="flex" alignItems="flex-end" marginBottom="4">
        {callToAction}
      </Box>
      <Box marginBottom="4">
        <Text size="large">X DAI from Y funders, with estimated Z match</Text>
      </Box>
      <Box marginBottom="4">
        <Text size="large">Funding goal Z DAI</Text>
      </Box>
      <Box>
        <Text size="large">n days left until round ends</Text>
      </Box>
    </Box>
  );
};

export default FundingProgress;