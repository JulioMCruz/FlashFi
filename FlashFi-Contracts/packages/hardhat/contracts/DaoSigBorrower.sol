// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IDaoMultiSig {
    function flashLoan(address token, uint256 amount) external;
}

contract MockFlashLoanReceiver {
    address public owner;
    
    event FlashLoanReceived(address token, uint256 amount, uint256 fee);
    event FlashLoanRepaid(address token, uint256 repayAmount);

    constructor() {
        owner = msg.sender;
    }

    // Function to initiate a flash loan
    function executeFlashLoan(
        address lender,
        address token,
        uint256 amount
    ) external {
        require(msg.sender == owner, "Only owner");
        
        // Pre-approve the repayment plus potential fee
        uint256 feeAmount = (amount * 100) / 10000; // 1% fee
        uint256 totalRepayment = amount + feeAmount;
        
        // Ensure we have enough balance for the fee
        require(
            IERC20(token).balanceOf(address(this)) >= feeAmount,
            "Insufficient balance for fee"
        );
        
        // Execute flash loan
        IDaoMultiSig(lender).flashLoan(token, amount);
    }

    // Callback function that will be called by the lending contract
    function executeOperation(
        address token,
        uint256 amount,
        uint256 fee
    ) external {
        emit FlashLoanReceived(token, amount, fee);

        // Calculate total repayment
        uint256 repayAmount = amount + fee;

        // Ensure we have enough balance for repayment
        require(
            IERC20(token).balanceOf(address(this)) >= fee,
            "Insufficient balance for fee"
        );

        // Transfer the borrowed amount + fee back to the lender
        IERC20(token).transfer(msg.sender, repayAmount);

        emit FlashLoanRepaid(token, repayAmount);
    }

    // Function to check token balance
    function getBalance(address token) external view returns (uint256) {
        return IERC20(token).balanceOf(address(this));
    }
}