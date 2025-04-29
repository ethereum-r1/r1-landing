//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "forge-std/Script.sol";
import "forge-std/StdJson.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract VerifyAll is Script {
    using stdJson for string;

    function run() external {
        string memory root = vm.projectRoot();
        string memory deploymentsPath = string.concat(root, "/deployments/");
        string memory chainId = vm.toString(block.chainid);
        string memory deploymentPath = string.concat(deploymentsPath, chainId, ".json");

        // Check if deployment file exists
        try vm.readFile(deploymentPath) returns (string memory json) {
            for (uint i = 0; i < json.readStringArray("$.names").length; i++) {
                string memory contractName = json.readStringArray("$.names")[i];
                address contractAddress = json.readAddress(string.concat("$.contracts.", contractName, ".address"));
                
                if (vm.keyExists(json, string.concat("$.contracts.", contractName, ".args"))) {
                    bytes memory constructorArgs = json.readBytes(string.concat("$.contracts.", contractName, ".args"));
                    string memory constructorArgsHex = vm.toString(constructorArgs);
                    
                    string memory verifyCommand = string.concat(
                        "forge verify-contract --chain-id ", 
                        chainId, 
                        " --constructor-args ", 
                        constructorArgsHex, 
                        " ", 
                        Strings.toHexString(contractAddress), 
                        " ", 
                        contractName
                    );
                    
                    console.log(verifyCommand);
                } else {
                    string memory verifyCommand = string.concat(
                        "forge verify-contract --chain-id ", 
                        chainId, 
                        " ", 
                        Strings.toHexString(contractAddress), 
                        " ", 
                        contractName
                    );
                    
                    console.log(verifyCommand);
                }
            }
        } catch {
            console.log("No deployments found for this chain");
        }
    }
}