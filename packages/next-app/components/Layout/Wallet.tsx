import { useState } from "react";
import Link from "next/link";
import { useConnect, useAccount } from "wagmi";
import { Box, Button, Text } from "degen";

const Wallet = ({ isCallsCta }: { isCallsCta?: boolean }) => {
  const [{ data, error }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });
  const [showModal, setShowModal] = useState(false);
  const shortAddr = accountData?.address.substring(0, 6);

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
            {data.connectors.map(connector => {
              const handleClick = () => {
                connect(connector);
                setShowModal(false);
              };

              return (
                <Button size="small" disabled={!connector.ready} key={connector.id} onClick={() => handleClick()}>
                  {connector.name}
                  {!connector.ready && " (unsupported)"}
                </Button>
              );
            })}
          </Box>
        </Box>
      )}
      <Box>
        {isCallsCta ? (
          !accountData ? (
            <Button size="small" onClick={() => setShowModal(true)}>
              Connect
            </Button>
          ) : (
            <Link href="/calls/create">
              <Button size="small" onClick={disconnect}>
                Post call for funds
              </Button>
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
            <Button size="small" onClick={disconnect}>
              Disconnect Wallet
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Wallet;
