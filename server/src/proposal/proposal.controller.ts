import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { BaseProposalDto, CreateProposalDto } from './dtos';

@Controller('proposals')
export class ProposalController {
  constructor(private readonly service: ProposalService) {}

  // -------------------------------------------------------
  // CREATE PROPOSAL
  // -------------------------------------------------------

  @Post()
  async createProposal(@Body() dto: CreateProposalDto) {
    await this.service.createProposal(dto);
    return true;
  }

  // -------------------------------------------------------
  // GET PROPOSALS
  // -------------------------------------------------------

  @Get()
  async getProposals(@Query() dto: BaseProposalDto) {
    const proposals = await this.service.getProposals(dto);
    return proposals;
  }

  // -------------------------------------------------------
  // VOTE A PROPOSAL
  // -------------------------------------------------------

  @Patch(':id/vote')
  async vote(@Param('id') proposalID: number, @Body() dto: BaseProposalDto) {
    await this.service.vote(dto, proposalID);
    return true;
  }
}
