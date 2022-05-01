import { Box, Heading, Stack, Text } from "degen";
import UserProfile from "./Cards/UserProfile";
import UserStats from "./Cards/UserStats";
import ProjectHistory from "./Cards/ProjectHistory";
import { User } from "../graph/loudverse-graph-types";
import userImage from "../public/wellwisher.png";

const FullPageUser = () =>
  // { user }: { user: User }

  {
    // Dummy data
    const user = {
      image: userImage,
      name: "@wellwisher.eth",
      tagline: "A composer with a flair for the pragmatic",
      website: "https://wellwisher.xyz",
      description: "Contemporary classical composer",
      inspiration: "Dmitri Shostakovich",
      quote: "Don't try to prove yourself. Improve yourself.",
    };
    const stats = {
      raised: "1.337",
      projects: "2",
      collaborators: "3",
      current: "Solarpunk Strings",
    };
    const history = [
      {
        project: "Solarpunk Synth",
        date: "February 2022",
        category: "music",
        raised: "5,480",
        token: "DAI",
        funders: "42",
      },
      {
        project: "My Heart, Your Sleeve",
        date: "January 2022",
        category: "music",
        raised: "3",
        token: "DAI",
        funders: "18",
      },
    ];

    return (
      <Box>
        <Box marginBottom="4">
          <Heading level="2">User Profile</Heading>
        </Box>
        <Box display="flex" width="full">
          <Stack direction="horizontal" flex={1}>
            <UserProfile userDetails={user} />
            <Stack flex={1}>
              <UserStats stats={stats} />
              <ProjectHistory history={history} />
            </Stack>
          </Stack>
        </Box>
      </Box>
    );
  };

export default FullPageUser;
