import { ethers } from 'hardhat';

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.parseEther('0.001');

  const voting = await ethers.deployContract('Voting');

  await voting.waitForDeployment();

  console.log(
    `Lock with ${ethers.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${
      voting.target
    } at address ${await voting.getAddress()}`
  );

  const allProposals = await voting.getAllProposals();

  console.log('allProposals', allProposals);

  await voting.createNewProposal({
    title: 'first title',
    description: 'first description',
  });

  console.log('created');

  const allProposals2 = await voting.getAllProposals();

  console.log('allProposals2', allProposals2);

  await voting.vote(1);
  await voting.vote(1);
  await voting.vote(1);
  await voting.vote(1);
  await voting.vote(1);

  const allProposals3 = await voting.getAllProposals();

  console.log('allProposals3', allProposals3);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
