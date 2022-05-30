// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SRTSignature {

    struct Document {
        string  docId;
        string  docSig;
        uint256 updated_time;
    }

    mapping(string => Document) public docMap;

    function pushDocument(string memory docId, string memory docSig) public {
        docMap[docId].docId  = docId;
        docMap[docId].docSig = docSig;
        docMap[docId].updated_time = block.timestamp;
    }

    function verifyDocument(string memory docId, string memory docSig) public view returns(bool){
        string memory sig = docMap[docId].docSig;
        if (keccak256(abi.encodePacked((sig))) == keccak256(abi.encodePacked((docSig))))
            return true;
        else
            return false;

    }
}