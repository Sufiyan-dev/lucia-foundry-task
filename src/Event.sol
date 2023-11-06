// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

struct MyStruct {
    uint256 field1;
    uint256 field2;
}


contract Event {
	event Log(string message, uint val);
	event IndexedLog(address indexed sender, uint val);

    event LogMyStruct(MyStruct myStruct);


	// declared NOT as a read only function
	// we're storing new data on the blockchain
	function example() external {
		emit Log("foo", 1234);
		emit IndexedLog(msg.sender, 789);
	}

	function logStruct(uint256 field1Value, uint256 field2Value) external {
        MyStruct memory myInstance = MyStruct(field1Value, field2Value); // change this to bytes later
        emit LogMyStruct(myInstance);
    }
	
}