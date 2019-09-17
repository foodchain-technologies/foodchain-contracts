# The Foodchain Smart Contracts

Foodchain is a co-operative network of food suppliers incentivised by a token called the Bushel. Bushels are awarded to suppliers who bring valuable customers into the network. Specifically, the following dynamics are implemented in a set of smart contracts:

- The Bushel token is created with an initial balance belonging to a smart wallet that represents the total network value, we call this smart wallet the treasury.
- Every time a customer pays an invoice on the Foodchain network, Foodchain Technologies (the company) looks up who the originating supplier (the supplier who referred the customer in question to the network) was and reports the margin made on the invoice, along with the ethereum address registered for the supplier, to the Bushel smart contract.
- The Bushel smart contract withdraws a number of Bushels from the treasury equal to the margin on the invoice (according to a price per bushel set in the Bushel ERC20 contract)
    - 50% of these tokens are transferred to the originating supplier
    - 50% are transferred to all the other token holders in the network in proportion to the percentage of the total bushels they hold (this includes the treasury account).
