// SPDX-License-Identifier: MIT
// Specifies the license under which this contract is published.
pragma solidity >=0.4.22 <0.9.0;

// The Migrations contract is used for managing deployment migrations in Truffle.
contract Migrations {
    // The address of the contract owner (the one who deployed the contract)
    address public owner = msg.sender;

    // Stores the last completed migration step
    uint public last_completed_migration;

    // Modifier to restrict access to only the contract owner
    modifier restricted() {
        require(
            msg.sender == owner, // Checks if the sender is the contract owner
            "This function is restricted to the contract's owner"
        );
        _; // Proceeds with function execution if the requirement is met
    }

    // Function to update the last completed migration step
    // Can only be called by the contract owner due to the `restricted` modifier
    function setCompleted(uint completed) public restricted {
        last_completed_migration = completed;
    }
}
