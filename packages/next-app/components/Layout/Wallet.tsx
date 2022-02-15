import { useConnect, useAccount } from "wagmi";
import { Box, Button } from "degen";
import { useState } from "react";

const Wallet = () => {
  const [{ data, error }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });

  const [showModal, setShowModal] = useState(false);

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
                <Button disabled={!connector.ready} key={connector.id} onClick={() => handleClick()}>
                  {connector.name}
                  {!connector.ready && " (unsupported)"}
                </Button>
              );
            })}
          </Box>
        </Box>
      )}
      <Box>
        {!accountData ? (
          <Button onClick={() => setShowModal(true)}>Connect Wallet</Button>
        ) : (
          <Button onClick={disconnect}>Disconnect Wallet</Button>
        )}
      </Box>
    </>
  );
};

export default Wallet;
