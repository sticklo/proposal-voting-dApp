import { BrowserProvider } from 'ethers';
import { useBoundStore } from '../store';
import { useToast } from '../components/hooks';

export const useEtherProvider = () => {
  const toast = useToast();
  const account = useBoundStore((state) => state.account);
  const handleAddAccount = useBoundStore((state) => state.addAccount);
  const handleRemoveAccount = useBoundStore((state) => state.removeAccount);

  const handleConnectAccount = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        handleAddAccount(address);
        console.log('Metamask Connected : ' + address);
      } catch (err: unknown) {}
    } else {
      toast({
        status: 'error',
        title: 'Metamask is not detected in the browser',
      });
    }
  };

  function handleAccountsChanged(accounts: any[]) {
    if (accounts.length > 0 && account !== accounts[0]) {
      handleAddAccount(accounts[0]);
    } else {
      handleRemoveAccount();
    }
  }
  return { handleAccountsChanged, handleConnectAccount };
};
