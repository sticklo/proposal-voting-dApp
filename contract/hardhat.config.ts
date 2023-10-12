import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const { CONTRACT_NETWORK_URL, CONTRACT_PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: '0.8.19',
  // defaultNetwork: 'sepolia',
  // defaultNetwork: 'volta',
  // networks: {
  //   hardhat: {},
  //   sepolia: {
  //     url: CONTRACT_NETWORK_URL,
  //     accounts: [`0x${CONTRACT_PRIVATE_KEY}`],
  //     gas: 210000000,
  //     gasPrice: 800000000000,
  //   },
  // },
};

export default config;
