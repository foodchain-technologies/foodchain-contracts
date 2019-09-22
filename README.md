# The Foodchain Smart Contracts

This repository contains the smart contracts for [Foodchain](www.joinfoodchain.com), a crypto cooperative for the worlds food supply. It's early days yet, so what this codebase implements is fairly simple, it's the logic which distributes profits within the network to everyone who holds a stake in the network (via the Bushel token). More details on that specific mechanism are in the [Bushel distribution mechanism](# Bushel Distribution Mechanism) section. 

Currently this is a fairly centralized application, network participants trust Foodchain Technologies (who developed this contract and operate the existing network) to honestly report margins to the on chain contract. But this is just the first step to a decentralized organisation that we believe will outperform traditional centrlalized players in the industry. Stay tuned.

## Bushel Distribution Mechanism

Bushels are awarded to suppliers who bring valuable customers into the network. Specifically, the following dynamics are implemented:

- The Bushel token is created with an initial balance belonging to a smart wallet that represents the total network value, we call this smart wallet the treasury.
- Every time a customer pays an invoice on the Foodchain network, Foodchain Technologies (the company) looks up who the originating supplier (the supplier who referred the customer in question to the network) was and reports the margin made on the invoice, along with the ethereum address registered for the supplier, to the Bushel smart contract.
- The Bushel smart contract withdraws a number of Bushels from the treasury equal to the margin on the invoice (according to a price per bushel set in the Bushel ERC20 contract)
    - 50% of these tokens are transferred to the originating supplier
    - 50% are transferred to all the other token holders in the network in proportion to the percentage of the total bushels they hold (this includes the treasury account).

## Upgradable Contracts

This is an early phase of development, we still need to be able to experiment with different dynamics, as such these contracts are implemented as OpenZeppelin upgradable contracts. This means that we can change the logic of the contract easily and network participants must trust that Foodchain Technologies will do so in good faith. We are planning to move to an on chain governance process whereby upgrades would only be made after a vote by stakeholders has passed.

## Deployed Addresses

The token is deployed on mainnnet at `0x7912aFdf31bDdbA70f9285ED4cF9426e9ebbC613`

