# proposal-voting-dApp
A simple dApp that allows users to create, read and vote on proposals.
This dApp is built with React, Nest js & Solidity.

## Installation

Required: [Node](https://nodejs.org/) plus [npm](https://docs.npmjs.com/) and [Git](https://git-scm.com/downloads)


1. clone the repo

   ```bash
   git clone https://github.com/sticklo/proposal-voting-dApp
   ```


## Running Locally

```bash

run yarn project:install to install project dependencies 

## Contract Setup

open a separate local terminal and run yarn contract:launch-network to run a local network 
N.B: take note of the generated account numbers and their private keys in this terminal

open a new local terminal and run yarn contract:compile to contract the contract locally

run yarn contract:deploy to deploy the contract locally

copy the generated contract address 

## Server Setup

cd into server/config/envs and rename the .env.sample file to .env.development 

paste the generated contract address in the CONTRACT_ADDRESS field

open a new local terminal and run yarn server:dev to start the application server

## Client Setup

cd into client and rename the .env.sample file to .env

open a new local terminal and run yarn client:dev to start the client application

```

## Add Metamask test account to create a proposal

```bash

## Select a network
Toggle on the "show test network" option and select localhost

Click on the "add account" dropdown and select "import network"

Revert to the generated account numbers and private keys in your local terminal from when you ran yarn contract:launch-network, copy and paste any private key of your choice in the field that says "Enter your private key string here:". After pasting, click on "Import"

```
## Add Metamask test account to vote on a proposal

```bash
Repeat the steps above to create a new test account and make sure to switch to the new account to vote on an already created proposal

```

