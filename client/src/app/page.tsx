'use client';

import { Box, Button, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useEtherProvider } from './hooks';
import { useBoundStore } from './store';
import CreateProposalForm from './components/CreateProposalForm';
import DisplayProposals from './components/DisplayProposals';

export default function Home() {
  const { handleAccountsChanged, handleConnectAccount } = useEtherProvider();
  const account = useBoundStore((state) => state.account);
  const handleAddAccount = useBoundStore((state) => state.addAccount);

  useEffect(() => {
    if (window.ethereum) {
      if (!account && window.ethereum.selectedAddress) {
        handleAddAccount(window.ethereum.selectedAddress);
      }
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          'accountsChanged',
          handleAccountsChanged
        );
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleAccountsChanged]);

  return (
    <Box as="main">
      {account ? (
        <Box mx="auto" px={{ base: 2 }} w="60%">
          <Box>
            {' '}
            <p onClick={handleConnectAccount}>Wallet address: {account}</p>
          </Box>
          <Box>
            <CreateProposalForm />
          </Box>
          <Box>
            <DisplayProposals />
          </Box>
        </Box>
      ) : (
        
        <Flex alignItems="center" justifyContent="center" minH={'100vh'}>
          <Button bg="white" onClick={handleConnectAccount}>
            Login with Metamask
          </Button>
        </Flex>
      )}
    </Box>
  );
}
