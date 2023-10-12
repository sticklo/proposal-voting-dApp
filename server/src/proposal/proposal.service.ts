import { ForbiddenException, Injectable } from '@nestjs/common';
import { Contract, JsonRpcProvider } from 'ethers';
import { abi } from '../../../contract/artifacts/contracts/Proposal.sol/Voting.json';
import { BaseProposalDto, CreateProposalDto } from './dtos';

@Injectable()
export class ProposalService {
  // -------------------------------------------------------
  // GET PROPOSALS
  // -------------------------------------------------------

  async getProposals(dto: BaseProposalDto) {
    const contract = await this.getContract(dto.address);
    const proposals = await contract.getAllProposals();

    return proposals
      .map((p: any) => ({
        id: Number(p.id.toString()),
        title: p.title,
        description: p.description,
        voteCount: Number(p.voteCount.toString()),
      }))
      .reverse();
  }

  // -------------------------------------------------------
  // CREATE PROPOSAL
  // -------------------------------------------------------

  async createProposal({ address, ...dto }: CreateProposalDto) {
    const contract = await this.getContract(address);
    await contract.createNewProposal(dto);
    return true;
  }

  // -------------------------------------------------------
  // VOTE A PROPOSAL
  // -------------------------------------------------------

  async vote(dto: BaseProposalDto, proposalID: number) {
    try {
      const contract = await this.getContract(dto.address);
      await contract.vote(proposalID);
    } catch (err) {
      throw new ForbiddenException(err.reason);
    }
  }

  private async getContract(address: string) {
    try {
      const provider = new JsonRpcProvider(process.env.CONTRACT_NETWORK_URL);
      const signer = await provider.getSigner(address);
      return new Contract(process.env.CONTRACT_ADDRESS as string, abi, signer);
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }
}
