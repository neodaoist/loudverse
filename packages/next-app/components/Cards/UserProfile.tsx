import React from "react";
import Image from "next/image";
import { Box, Text } from "degen";

const UserProfile = ({ userDetails }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="1/2"
      backgroundColor="foregroundSecondary"
      borderRadius="medium"
      padding="4"
    >
      <Box display="flex" marginBottom="8">
        <Image src={userDetails.image} width="80" height="80" />
        <Box marginLeft="4">
          <Box marginBottom="4">
            <Text size="extraLarge">{userDetails.name}</Text>
          </Box>
          <Text>{userDetails.tagline}</Text>
        </Box>
      </Box>
      <Box marginBottom="8">
        <Text variant="label">Website</Text>
        <Text variant="large">{userDetails.website}</Text>
      </Box>
      <Box marginBottom="8">
        <Text variant="label">Who am I?</Text>
        <Text variant="large">{userDetails.description}</Text>
      </Box>
      <Box marginBottom="8">
        <Text variant="label">Biggest Inspo</Text>
        <Text variant="large">{userDetails.inspiration}</Text>
      </Box>
      <Box>
        <Text variant="label">Favorite quote that describes me</Text>
        <Text variant="large">&quot;{userDetails.quote}&quot;</Text>
      </Box>
    </Box>
  );
};

export default UserProfile;
