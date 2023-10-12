import { IsEthereumAddress, IsString, MaxLength } from 'class-validator';

export class BaseProposalDto {
  @IsEthereumAddress()
  readonly address: string;
}

export class CreateProposalDto extends BaseProposalDto {
  @IsString()
  @MaxLength(70)
  readonly description: string;

  @IsString()
  @MaxLength(30)
  readonly title: string;
}
