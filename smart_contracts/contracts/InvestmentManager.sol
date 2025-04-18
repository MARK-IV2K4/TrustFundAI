// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract InvestmentManager {
    address public owner;

    struct Investment {
        uint amount;
        uint timestamp;
    }

    mapping(address => Investment[]) private userInvestments;

    event Invested(address indexed investor, uint amount);
    event Withdrawn(address indexed investor, uint amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function invest() public payable {
        require(msg.value > 0, "Investment must be greater than zero");

        userInvestments[msg.sender].push(
            Investment({ amount: msg.value, timestamp: block.timestamp })
        );

        emit Invested(msg.sender, msg.value);
    }

    function withdraw(uint index) public {
        require(index < userInvestments[msg.sender].length, "Invalid index");
        Investment memory investment = userInvestments[msg.sender][index];
        require(investment.amount > 0, "Already withdrawn");

        uint amount = investment.amount;
        userInvestments[msg.sender][index].amount = 0;
        payable(msg.sender).transfer(amount);

        emit Withdrawn(msg.sender, amount);
    }

    function getInvestments(address user) external view returns (Investment[] memory) {
        return userInvestments[user];
    }

    function contractBalance() public view returns (uint) {
        return address(this).balance;
    }
}
