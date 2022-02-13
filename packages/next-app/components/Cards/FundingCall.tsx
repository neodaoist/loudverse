import React from "react";
import { Box, Heading, Text } from "degen";
import styles from "./FundingCall.module.css";


const FundingCall = ({ callForFunding }: { callForFunding: CallForFundsGraphType }) => {
  return (
    <Box backgroundColor="backgroundSecondary" padding="4" borderRadius="medium" maxWidth="168">
      <div className={styles.titleRow}>
        <Heading>{callForFunding.title}</Heading>
        <Text>{callForFunding.category}</Text>
      </div>
      <Text>{callForFunding.description}</Text>
      <div>[Image]</div>
      <Text>$X funded by Y people so far</Text>
    </Box>
    // Still need:
    // image
    // stats
  );
};

export default FundingCall;
