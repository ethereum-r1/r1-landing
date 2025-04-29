//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "forge-std/Test.sol";
import {YourContract} from "../src/YourContract.sol";

contract YourContractTest is Test {
    YourContract public yourContract;
    address public owner;

    function setUp() public {
        owner = makeAddr("owner");
        yourContract = new YourContract(owner);
    }

    function testInitialGreeting() public {
        assertEq(yourContract.greeting(), "Building Unstoppable Apps!!!");
    }

    function testSetGreeting() public {
        yourContract.setGreeting("New Greeting");
        assertEq(yourContract.greeting(), "New Greeting");
        assertEq(yourContract.totalCounter(), 1);
        assertEq(yourContract.userGreetingCounter(address(this)), 1);
        assertEq(yourContract.premium(), false);
    }

    function testSetGreetingWithValue() public {
        yourContract.setGreeting{value: 1 ether}("Premium Greeting");
        assertEq(yourContract.greeting(), "Premium Greeting");
        assertEq(yourContract.premium(), true);
    }

    function testWithdrawAsOwner() public {
        vm.deal(address(yourContract), 1 ether);
        uint256 ownerBalanceBefore = owner.balance;
        
        vm.prank(owner);
        yourContract.withdraw();
        
        assertEq(address(yourContract).balance, 0);
        assertEq(owner.balance, ownerBalanceBefore + 1 ether);
    }

    function testWithdrawAsNonOwner() public {
        vm.deal(address(yourContract), 1 ether);
        
        vm.expectRevert("Not the Owner");
        yourContract.withdraw();
    }
}