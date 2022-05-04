import { useEffect, useState } from "react";
import Link from "next/link";
import { useConnect, useAccount, useNetwork } from "wagmi";
import { Box, Button, Text } from "degen";
import { useDisconnect } from "wagmi";

const Wallet = ({ isCallsCta }: { isCallsCta?: boolean }) => {
  const { connect, connectors } = useConnect();
  const { data: accountData } = useAccount();
  const { disconnect } = useDisconnect();
  const { activeChain, switchNetwork } = useNetwork({
    chainId: 137,
  });

  const [showModal, setShowModal] = useState(false);
  const shortAddr = accountData?.address.substring(0, 6);

  useEffect(() => {
    if (accountData?.address && activeChain?.unsupported) {
      try {
        switchNetwork();
      } catch (error) {
        // user clicked disconnect wallet
      }
    }
  }, [activeChain, accountData, switchNetwork]);

  return (
    <>
      {showModal && (
        <Box
          zIndex="10"
          position="fixed"
          left="0"
          top="0"
          width="full"
          height="full"
          color="backgroundSecondary"
          backgroundColor="background"
          // make bg transparent
          paddingTop="32"
        >
          <Box display="grid" cols={2} justifyContent="center" justifySelf="center">
            {connectors.map(connector => {
              const handleClick = () => {
                connect(connector);
                setShowModal(false);
              };

              return (
                <Box key={connector.id} marginX="auto" marginY="2">
                  <Button size="small" disabled={!connector.ready} onClick={() => handleClick()}>
                    {connector.name}
                    {!connector.ready && " (unsupported)"}
                  </Button>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
      <Box>
        {/* isCallsCta is not currently in use */}
        {isCallsCta ? (
          !accountData ? (
            <Button size="small" onClick={() => setShowModal(true)}>
              Connect
            </Button>
          ) : (
            <Link href="/calls/create">
              <Button size="small">Post call for funds</Button>
            </Link>
          )
        ) : !accountData ? (
          <Button size="small" onClick={() => setShowModal(true)}>
            Connect Wallet
          </Button>
        ) : (
          <Box display="flex" alignItems="center">
            <Box paddingRight="4">
              <Text weight="semiBold" color="textTertiary">
                {shortAddr}
              </Text>
            </Box>
            <Button size="small" onClick={() => disconnect()}>
              Disconnect Wallet
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Wallet;
