// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Voting {
    // Model a Proposal
    struct Proposal {
        uint256 createdAt;
        string description;
        uint256 id;
        address owner;
        string title;
        uint256 voteCount;
    }

    struct CreateProposal {
        string description;
        string title;
    }

    Proposal[] public proposals;
    mapping(uint256 => mapping(address => bool)) public voters;

    function createNewProposal(CreateProposal memory dto) public {
        proposals.push(
            Proposal({
                createdAt: block.timestamp,
                description: dto.description,
                id: proposals.length + 1,
                owner: msg.sender,
                title: dto.title,
                voteCount: 0
            })
        );
    }

    function getAllProposals() public view returns (Proposal[] memory) {
        return proposals;
    }

    function getProposal(
        uint256 proposalId
    ) public view returns (Proposal memory) {
        require(proposalId - 1 < proposals.length, "Invalid proposal ID");
        return proposals[proposalId - 1];
    }

    function vote(uint256 proposalId) public {
        Proposal memory proposal = getProposal(proposalId);
        require(
            proposal.owner != msg.sender,
            "You cannot vote on your proposal"
        );

        require(!voters[proposalId][msg.sender], "You have already voted");

        proposals[proposalId - 1].voteCount++;
        voters[proposalId][msg.sender] = true;
    }
}
