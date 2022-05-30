App = {
    web3Provider: null,
    contracts: {},

    init: async function () {

        return await App.initWeb3();
    },

    initWeb3: async function () {
        // Modern dapp browsers...
        // if (window.ethereum) {
        //     App.web3Provider = window.ethereum;
        //     console.log('1')
        //     try {
        //         // Request account access
        //         await window.ethereum.enable();
        //     } catch (error) {
        //         // User denied account access...
        //         console.error("User denied account access")
        //     }
        // } else if (window.web3) {
        //     console.log('2')
        //     App.web3Provider = window.web3.currentProvider;
        // } else {
        //     console.log('3')
        //     App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        // }
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');

        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },

    initContract: function () {
        console.log('work')
        getContract = function () {
            console.log('get json success')
            
            var SRTSignatureArtifact = src();
            
            App.contracts.SRTSignature = TruffleContract(SRTSignatureArtifact);

            // Set the provider for SRTSignature contract
            App.contracts.SRTSignature.setProvider(App.web3Provider);

            // Not implemented yet
            return App.markSigned();
        }
        getContract();

        return App.bindEvents();
    },

    bindEvents: function () {
        $(document).on('click', '.btn-sign', App.handleSign);
        $(document).on('click', '.btn-verify', App.handleVerify);
    },

    markSigned: function () {
        // Note implemented yet

    },

    handleSign: function (event) {
        event.preventDefault();

        var signature = "";
        var srtSignatureInstance;

        App.contracts.SRTSignature.deployed().then(function (instance) {
            srtSignatureInstance = instance;

            docId = "SRT01/2565"
            signature = "0x4581176e4289792499b0a657f1de073b090ce22de207999f95f15a9ad719676c24c03534227f320424aa0a56c3a45af1599678c17af8d5900886eea8363eefb01c"
            // docId = "SRT02/2565"
            // signature = "0x84e4f828108360a9d879800d1e42ff7b3f9f0aa14c34b0360aa16b55684d3bc903baef9bba41454047d0c9ca7ddf88b865cf0dc6325d162bba49185f5cd6c3501b"

            console.log("\nfunction pushDocument()")
            console.log("docId:", docId);
            console.log("signature:", signature);

            return srtSignatureInstance.pushDocument(docId, signature, { from: "0x8c86E4d8E36Be220B15EE89AC6A310B441313aE4" });
        }).then(function (result) {
            console.log("Successfully submitted a signature into the chain.");
            return App.markSigned();
        }).catch(function (err) {
            console.log('Error : '+err.message);
        });
    },

    handleVerify: function (event) {
        event.preventDefault();

        var docId = "SRT01/2565";
        var signature = "0x4581176e4289792499b0a657f1de073b090ce22de207999f95f15a9ad719676c24c03534227f320424aa0a56c3a45af1599678c17af8d5900886eea8363eefb01c";
        // var docId = "SRT02/2565"
        // var signature = "0x84e4f828108360a9d879800d1e42ff7b3f9f0aa14c34b0360aa16b55684d3bc903baef9bba41454047d0c9ca7ddf88b865cf0dc6325d162bba49185f5cd6c3501b";

        var srtSignatureInstance;

        App.contracts.SRTSignature.deployed().then(function (instance) {
            srtSignatureInstance = instance;
            return srtSignatureInstance.verifyDocument(docId, signature);
        }).then(function (result) {
            console.log("\nfunction verifyDocument()")
            console.log("docId:", docId);
            console.log("signature:", signature);
            console.log("result:", result);
            return App.markSigned();
        }).catch(function (err) {
            console.log(err.message);
        });
    }

};

$(function () {
    $(window).load(function () {
        App.init();
    });
});


src = function(){
    return {
        "contractName": "SRTSignature",
        "abi": [
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "name": "docMap",
            "outputs": [
              {
                "internalType": "string",
                "name": "docId",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "docSig",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "updated_time",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          },
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "docId",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "docSig",
                "type": "string"
              }
            ],
            "name": "pushDocument",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "docId",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "docSig",
                "type": "string"
              }
            ],
            "name": "verifyDocument",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          }
        ],
        "metadata": "{\"compiler\":{\"version\":\"0.8.14+commit.80d49f37\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"name\":\"docMap\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"docId\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"docSig\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"updated_time\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"docId\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"docSig\",\"type\":\"string\"}],\"name\":\"pushDocument\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"docId\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"docSig\",\"type\":\"string\"}],\"name\":\"verifyDocument\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"project:/contracts/SRTSignature.sol\":\"SRTSignature\"},\"evmVersion\":\"london\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":false,\"runs\":200},\"remappings\":[]},\"sources\":{\"project:/contracts/SRTSignature.sol\":{\"keccak256\":\"0x7ba68247422016abd371f747d859fabaf5306c8db49cd87ee152d71ed8654599\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://59e226a8813993a4c46a7bfce2bf2470e2b24b8ecb7607b767dcdfe671218ec9\",\"dweb:/ipfs/QmRuCqqEYHj9y5hByZC45NQug7aHoqeC299MLQqRj84Ecs\"]}},\"version\":1}",
        "bytecode": "0x608060405234801561001057600080fd5b50610885806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063a4ca650b14610046578063c4b9067d14610076578063f3bc423014610092575b600080fd5b610060600480360381019061005b91906105bf565b6100c4565b60405161006d9190610652565b60405180910390f35b610090600480360381019061008b91906105bf565b6101dc565b005b6100ac60048036038101906100a7919061066d565b610272565b6040516100bb93929190610757565b60405180910390f35b6000806000846040516100d791906107d8565b908152602001604051809103902060010180546100f39061081e565b80601f016020809104026020016040519081016040528092919081815260200182805461011f9061081e565b801561016c5780601f106101415761010080835404028352916020019161016c565b820191906000526020600020905b81548152906001019060200180831161014f57829003601f168201915b505050505090508260405160200161018491906107d8565b60405160208183030381529060405280519060200120816040516020016101ab91906107d8565b60405160208183030381529060405280519060200120036101d05760019150506101d6565b60009150505b92915050565b816000836040516101ed91906107d8565b908152602001604051809103902060000190805190602001906102119291906103c2565b508060008360405161022391906107d8565b908152602001604051809103902060010190805190602001906102479291906103c2565b504260008360405161025991906107d8565b9081526020016040518091039020600201819055505050565b6000818051602081018201805184825260208301602085012081835280955050505050506000915090508060000180546102ab9061081e565b80601f01602080910402602001604051908101604052809291908181526020018280546102d79061081e565b80156103245780601f106102f957610100808354040283529160200191610324565b820191906000526020600020905b81548152906001019060200180831161030757829003601f168201915b5050505050908060010180546103399061081e565b80601f01602080910402602001604051908101604052809291908181526020018280546103659061081e565b80156103b25780601f10610387576101008083540402835291602001916103b2565b820191906000526020600020905b81548152906001019060200180831161039557829003601f168201915b5050505050908060020154905083565b8280546103ce9061081e565b90600052602060002090601f0160209004810192826103f05760008555610437565b82601f1061040957805160ff1916838001178555610437565b82800160010185558215610437579182015b8281111561043657825182559160200191906001019061041b565b5b5090506104449190610448565b5090565b5b80821115610461576000816000905550600101610449565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6104cc82610483565b810181811067ffffffffffffffff821117156104eb576104ea610494565b5b80604052505050565b60006104fe610465565b905061050a82826104c3565b919050565b600067ffffffffffffffff82111561052a57610529610494565b5b61053382610483565b9050602081019050919050565b82818337600083830152505050565b600061056261055d8461050f565b6104f4565b90508281526020810184848401111561057e5761057d61047e565b5b610589848285610540565b509392505050565b600082601f8301126105a6576105a5610479565b5b81356105b684826020860161054f565b91505092915050565b600080604083850312156105d6576105d561046f565b5b600083013567ffffffffffffffff8111156105f4576105f3610474565b5b61060085828601610591565b925050602083013567ffffffffffffffff81111561062157610620610474565b5b61062d85828601610591565b9150509250929050565b60008115159050919050565b61064c81610637565b82525050565b60006020820190506106676000830184610643565b92915050565b6000602082840312156106835761068261046f565b5b600082013567ffffffffffffffff8111156106a1576106a0610474565b5b6106ad84828501610591565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156106f05780820151818401526020810190506106d5565b838111156106ff576000848401525b50505050565b6000610710826106b6565b61071a81856106c1565b935061072a8185602086016106d2565b61073381610483565b840191505092915050565b6000819050919050565b6107518161073e565b82525050565b600060608201905081810360008301526107718186610705565b905081810360208301526107858185610705565b90506107946040830184610748565b949350505050565b600081905092915050565b60006107b2826106b6565b6107bc818561079c565b93506107cc8185602086016106d2565b80840191505092915050565b60006107e482846107a7565b915081905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061083657607f821691505b602082108103610849576108486107ef565b5b5091905056fea264697066735822122085dd93f9dbe4299f3de68c942acb94b9e57b4644325d9ce816ef526541f94eb764736f6c634300080e0033",
        "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106100415760003560e01c8063a4ca650b14610046578063c4b9067d14610076578063f3bc423014610092575b600080fd5b610060600480360381019061005b91906105bf565b6100c4565b60405161006d9190610652565b60405180910390f35b610090600480360381019061008b91906105bf565b6101dc565b005b6100ac60048036038101906100a7919061066d565b610272565b6040516100bb93929190610757565b60405180910390f35b6000806000846040516100d791906107d8565b908152602001604051809103902060010180546100f39061081e565b80601f016020809104026020016040519081016040528092919081815260200182805461011f9061081e565b801561016c5780601f106101415761010080835404028352916020019161016c565b820191906000526020600020905b81548152906001019060200180831161014f57829003601f168201915b505050505090508260405160200161018491906107d8565b60405160208183030381529060405280519060200120816040516020016101ab91906107d8565b60405160208183030381529060405280519060200120036101d05760019150506101d6565b60009150505b92915050565b816000836040516101ed91906107d8565b908152602001604051809103902060000190805190602001906102119291906103c2565b508060008360405161022391906107d8565b908152602001604051809103902060010190805190602001906102479291906103c2565b504260008360405161025991906107d8565b9081526020016040518091039020600201819055505050565b6000818051602081018201805184825260208301602085012081835280955050505050506000915090508060000180546102ab9061081e565b80601f01602080910402602001604051908101604052809291908181526020018280546102d79061081e565b80156103245780601f106102f957610100808354040283529160200191610324565b820191906000526020600020905b81548152906001019060200180831161030757829003601f168201915b5050505050908060010180546103399061081e565b80601f01602080910402602001604051908101604052809291908181526020018280546103659061081e565b80156103b25780601f10610387576101008083540402835291602001916103b2565b820191906000526020600020905b81548152906001019060200180831161039557829003601f168201915b5050505050908060020154905083565b8280546103ce9061081e565b90600052602060002090601f0160209004810192826103f05760008555610437565b82601f1061040957805160ff1916838001178555610437565b82800160010185558215610437579182015b8281111561043657825182559160200191906001019061041b565b5b5090506104449190610448565b5090565b5b80821115610461576000816000905550600101610449565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6104cc82610483565b810181811067ffffffffffffffff821117156104eb576104ea610494565b5b80604052505050565b60006104fe610465565b905061050a82826104c3565b919050565b600067ffffffffffffffff82111561052a57610529610494565b5b61053382610483565b9050602081019050919050565b82818337600083830152505050565b600061056261055d8461050f565b6104f4565b90508281526020810184848401111561057e5761057d61047e565b5b610589848285610540565b509392505050565b600082601f8301126105a6576105a5610479565b5b81356105b684826020860161054f565b91505092915050565b600080604083850312156105d6576105d561046f565b5b600083013567ffffffffffffffff8111156105f4576105f3610474565b5b61060085828601610591565b925050602083013567ffffffffffffffff81111561062157610620610474565b5b61062d85828601610591565b9150509250929050565b60008115159050919050565b61064c81610637565b82525050565b60006020820190506106676000830184610643565b92915050565b6000602082840312156106835761068261046f565b5b600082013567ffffffffffffffff8111156106a1576106a0610474565b5b6106ad84828501610591565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156106f05780820151818401526020810190506106d5565b838111156106ff576000848401525b50505050565b6000610710826106b6565b61071a81856106c1565b935061072a8185602086016106d2565b61073381610483565b840191505092915050565b6000819050919050565b6107518161073e565b82525050565b600060608201905081810360008301526107718186610705565b905081810360208301526107858185610705565b90506107946040830184610748565b949350505050565b600081905092915050565b60006107b2826106b6565b6107bc818561079c565b93506107cc8185602086016106d2565b80840191505092915050565b60006107e482846107a7565b915081905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061083657607f821691505b602082108103610849576108486107ef565b5b5091905056fea264697066735822122085dd93f9dbe4299f3de68c942acb94b9e57b4644325d9ce816ef526541f94eb764736f6c634300080e0033",
        "immutableReferences": {},
        "generatedSources": [],
        "deployedGeneratedSources": [
          {
            "ast": {
              "nodeType": "YulBlock",
              "src": "0:7457:2",
              "statements": [
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "47:35:2",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "57:19:2",
                        "value": {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "73:2:2",
                              "type": "",
                              "value": "64"
                            }
                          ],
                          "functionName": {
                            "name": "mload",
                            "nodeType": "YulIdentifier",
                            "src": "67:5:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "67:9:2"
                        },
                        "variableNames": [
                          {
                            "name": "memPtr",
                            "nodeType": "YulIdentifier",
                            "src": "57:6:2"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "allocate_unbounded",
                  "nodeType": "YulFunctionDefinition",
                  "returnVariables": [
                    {
                      "name": "memPtr",
                      "nodeType": "YulTypedName",
                      "src": "40:6:2",
                      "type": ""
                    }
                  ],
                  "src": "7:75:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "177:28:2",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "194:1:2",
                              "type": "",
                              "value": "0"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "197:1:2",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "revert",
                            "nodeType": "YulIdentifier",
                            "src": "187:6:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "187:12:2"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "187:12:2"
                      }
                    ]
                  },
                  "name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
                  "nodeType": "YulFunctionDefinition",
                  "src": "88:117:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "300:28:2",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "317:1:2",
                              "type": "",
                              "value": "0"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "320:1:2",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "revert",
                            "nodeType": "YulIdentifier",
                            "src": "310:6:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "310:12:2"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "310:12:2"
                      }
                    ]
                  },
                  "name": "revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db",
                  "nodeType": "YulFunctionDefinition",
                  "src": "211:117:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "423:28:2",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "440:1:2",
                              "type": "",
                              "value": "0"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "443:1:2",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "revert",
                            "nodeType": "YulIdentifier",
                            "src": "433:6:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "433:12:2"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "433:12:2"
                      }
                    ]
                  },
                  "name": "revert_error_1b9f4a0a5773e33b91aa01db23bf8c55fce1411167c872835e7fa00a4f17d46d",
                  "nodeType": "YulFunctionDefinition",
                  "src": "334:117:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "546:28:2",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "563:1:2",
                              "type": "",
                              "value": "0"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "566:1:2",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "revert",
                            "nodeType": "YulIdentifier",
                            "src": "556:6:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "556:12:2"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "556:12:2"
                      }
                    ]
                  },
                  "name": "revert_error_987264b3b1d58a9c7f8255e93e81c77d86d6299019c33110a076957a3e06e2ae",
                  "nodeType": "YulFunctionDefinition",
                  "src": "457:117:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "628:54:2",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "638:38:2",
                        "value": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "value",
                                  "nodeType": "YulIdentifier",
                                  "src": "656:5:2"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "663:2:2",
                                  "type": "",
                                  "value": "31"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "652:3:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "652:14:2"
                            },
                            {
                              "arguments": [
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "672:2:2",
                                  "type": "",
                                  "value": "31"
                                }
                              ],
                              "functionName": {
                                "name": "not",
                                "nodeType": "YulIdentifier",
                                "src": "668:3:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "668:7:2"
                            }
                          ],
                          "functionName": {
                            "name": "and",
                            "nodeType": "YulIdentifier",
                            "src": "648:3:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "648:28:2"
                        },
                        "variableNames": [
                          {
                            "name": "result",
                            "nodeType": "YulIdentifier",
                            "src": "638:6:2"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "round_up_to_mul_of_32",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "value",
                      "nodeType": "YulTypedName",
                      "src": "611:5:2",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "result",
                      "nodeType": "YulTypedName",
                      "src": "621:6:2",
                      "type": ""
                    }
                  ],
                  "src": "580:102:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "716:152:2",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "733:1:2",
                              "type": "",
                              "value": "0"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "736:77:2",
                              "type": "",
                              "value": "35408467139433450592217433187231851964531694900788300625387963629091585785856"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "726:6:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "726:88:2"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "726:88:2"
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "830:1:2",
                              "type": "",
                              "value": "4"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "833:4:2",
                              "type": "",
                              "value": "0x41"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "823:6:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "823:15:2"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "823:15:2"
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "854:1:2",
                              "type": "",
                              "value": "0"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "857:4:2",
                              "type": "",
                              "value": "0x24"
                            }
                          ],
                          "functionName": {
                            "name": "revert",
                            "nodeType": "YulIdentifier",
                            "src": "847:6:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "847:15:2"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "847:15:2"
                      }
                    ]
                  },
                  "name": "panic_error_0x41",
                  "nodeType": "YulFunctionDefinition",
                  "src": "688:180:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "917:238:2",
                    "statements": [
                      {
                        "nodeType": "YulVariableDeclaration",
                        "src": "927:58:2",
                        "value": {
                          "arguments": [
                            {
                              "name": "memPtr",
                              "nodeType": "YulIdentifier",
                              "src": "949:6:2"
                            },
                            {
                              "arguments": [
                                {
                                  "name": "size",
                                  "nodeType": "YulIdentifier",
                                  "src": "979:4:2"
                                }
                              ],
                              "functionName": {
                                "name": "round_up_to_mul_of_32",
                                "nodeType": "YulIdentifier",
                                "src": "957:21:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "957:27:2"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "945:3:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "945:40:2"
                        },
                        "variables": [
                          {
                            "name": "newFreePtr",
                            "nodeType": "YulTypedName",
                            "src": "931:10:2",
                            "type": ""
                          }
                        ]
                      },
                      {
                        "body": {
                          "nodeType": "YulBlock",
                          "src": "1096:22:2",
                          "statements": [
                            {
                              "expression": {
                                "arguments": [],
                                "functionName": {
                                  "name": "panic_error_0x41",
                                  "nodeType": "YulIdentifier",
                                  "src": "1098:16:2"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "1098:18:2"
                              },
                              "nodeType": "YulExpressionStatement",
                              "src": "1098:18:2"
                            }
                          ]
                        },
                        "condition": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "newFreePtr",
                                  "nodeType": "YulIdentifier",
                                  "src": "1039:10:2"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "1051:18:2",
                                  "type": "",
                                  "value": "0xffffffffffffffff"
                                }
                              ],
                              "functionName": {
                                "name": "gt",
                                "nodeType": "YulIdentifier",
                                "src": "1036:2:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "1036:34:2"
                            },
                            {
                              "arguments": [
                                {
                                  "name": "newFreePtr",
                                  "nodeType": "YulIdentifier",
                                  "src": "1075:10:2"
                                },
                                {
                                  "name": "memPtr",
                                  "nodeType": "YulIdentifier",
                                  "src": "1087:6:2"
                                }
                              ],
                              "functionName": {
                                "name": "lt",
                                "nodeType": "YulIdentifier",
                                "src": "1072:2:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "1072:22:2"
                            }
                          ],
                          "functionName": {
                            "name": "or",
                            "nodeType": "YulIdentifier",
                            "src": "1033:2:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "1033:62:2"
                        },
                        "nodeType": "YulIf",
                        "src": "1030:88:2"
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "1134:2:2",
                              "type": "",
                              "value": "64"
                            },
                            {
                              "name": "newFreePtr",
                              "nodeType": "YulIdentifier",
                              "src": "1138:10:2"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "1127:6:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "1127:22:2"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "1127:22:2"
                      }
                    ]
                  },
                  "name": "finalize_allocation",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "memPtr",
                      "nodeType": "YulTypedName",
                      "src": "903:6:2",
                      "type": ""
                    },
                    {
                      "name": "size",
                      "nodeType": "YulTypedName",
                      "src": "911:4:2",
                      "type": ""
                    }
                  ],
                  "src": "874:281:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "1202:88:2",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "1212:30:2",
                        "value": {
                          "arguments": [],
                          "functionName": {
                            "name": "allocate_unbounded",
                            "nodeType": "YulIdentifier",
                            "src": "1222:18:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "1222:20:2"
                        },
                        "variableNames": [
                          {
                            "name": "memPtr",
                            "nodeType": "YulIdentifier",
                            "src": "1212:6:2"
                          }
                        ]
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "name": "memPtr",
                              "nodeType": "YulIdentifier",
                              "src": "1271:6:2"
                            },
                            {
                              "name": "size",
                              "nodeType": "YulIdentifier",
                              "src": "1279:4:2"
                            }
                          ],
                          "functionName": {
                            "name": "finalize_allocation",
                            "nodeType": "YulIdentifier",
                            "src": "1251:19:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "1251:33:2"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "1251:33:2"
                      }
                    ]
                  },
                  "name": "allocate_memory",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "size",
                      "nodeType": "YulTypedName",
                      "src": "1186:4:2",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "memPtr",
                      "nodeType": "YulTypedName",
                      "src": "1195:6:2",
                      "type": ""
                    }
                  ],
                  "src": "1161:129:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "1363:241:2",
                    "statements": [
                      {
                        "body": {
                          "nodeType": "YulBlock",
                          "src": "1468:22:2",
                          "statements": [
                            {
                              "expression": {
                                "arguments": [],
                                "functionName": {
                                  "name": "panic_error_0x41",
                                  "nodeType": "YulIdentifier",
                                  "src": "1470:16:2"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "1470:18:2"
                              },
                              "nodeType": "YulExpressionStatement",
                              "src": "1470:18:2"
                            }
                          ]
                        },
                        "condition": {
                          "arguments": [
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "1440:6:2"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "1448:18:2",
                              "type": "",
                              "value": "0xffffffffffffffff"
                            }
                          ],
                          "functionName": {
                            "name": "gt",
                            "nodeType": "YulIdentifier",
                            "src": "1437:2:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "1437:30:2"
                        },
                        "nodeType": "YulIf",
                        "src": "1434:56:2"
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "1500:37:2",
                        "value": {
                          "arguments": [
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "1530:6:2"
                            }
                          ],
                          "functionName": {
                            "name": "round_up_to_mul_of_32",
                            "nodeType": "YulIdentifier",
                            "src": "1508:21:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "1508:29:2"
                        },
                        "variableNames": [
                          {
                            "name": "size",
                            "nodeType": "YulIdentifier",
                            "src": "1500:4:2"
                          }
                        ]
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "1574:23:2",
                        "value": {
                          "arguments": [
                            {
                              "name": "size",
                              "nodeType": "YulIdentifier",
                              "src": "1586:4:2"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "1592:4:2",
                              "type": "",
                              "value": "0x20"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "1582:3:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "1582:15:2"
                        },
                        "variableNames": [
                          {
                            "name": "size",
                            "nodeType": "YulIdentifier",
                            "src": "1574:4:2"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "array_allocation_size_t_string_memory_ptr",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "length",
                      "nodeType": "YulTypedName",
                      "src": "1347:6:2",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "size",
                      "nodeType": "YulTypedName",
                      "src": "1358:4:2",
                      "type": ""
                    }
                  ],
                  "src": "1296:308:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "1661:103:2",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [
                            {
                              "name": "dst",
                              "nodeType": "YulIdentifier",
                              "src": "1684:3:2"
                            },
                            {
                              "name": "src",
                              "nodeType": "YulIdentifier",
                              "src": "1689:3:2"
                            },
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "1694:6:2"
                            }
                          ],
                          "functionName": {
                            "name": "calldatacopy",
                            "nodeType": "YulIdentifier",
                            "src": "1671:12:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "1671:30:2"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "1671:30:2"
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "dst",
                                  "nodeType": "YulIdentifier",
                                  "src": "1742:3:2"
                                },
                                {
                                  "name": "length",
                                  "nodeType": "YulIdentifier",
                                  "src": "1747:6:2"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "1738:3:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "1738:16:2"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "1756:1:2",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "1731:6:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "1731:27:2"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "1731:27:2"
                      }
                    ]
                  },
                  "name": "copy_calldata_to_memory",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "src",
                      "nodeType": "YulTypedName",
                      "src": "1643:3:2",
                      "type": ""
                    },
                    {
                      "name": "dst",
                      "nodeType": "YulTypedName",
                      "src": "1648:3:2",
                      "type": ""
                    },
                    {
                      "name": "length",
                      "nodeType": "YulTypedName",
                      "src": "1653:6:2",
                      "type": ""
                    }
                  ],
                  "src": "1610:154:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "1854:328:2",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "1864:75:2",
                        "value": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "length",
                                  "nodeType": "YulIdentifier",
                                  "src": "1931:6:2"
                                }
                              ],
                              "functionName": {
                                "name": "array_allocation_size_t_string_memory_ptr",
                                "nodeType": "YulIdentifier",
                                "src": "1889:41:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "1889:49:2"
                            }
                          ],
                          "functionName": {
                            "name": "allocate_memory",
                            "nodeType": "YulIdentifier",
                            "src": "1873:15:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "1873:66:2"
                        },
                        "variableNames": [
                          {
                            "name": "array",
                            "nodeType": "YulIdentifier",
                            "src": "1864:5:2"
                          }
                        ]
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "name": "array",
                              "nodeType": "YulIdentifier",
                              "src": "1955:5:2"
                            },
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "1962:6:2"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "1948:6:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "1948:21:2"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "1948:21:2"
                      },
                      {
                        "nodeType": "YulVariableDeclaration",
                        "src": "1978:27:2",
                        "value": {
                          "arguments": [
                            {
                              "name": "array",
                              "nodeType": "YulIdentifier",
                              "src": "1993:5:2"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "2000:4:2",
                              "type": "",
                              "value": "0x20"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "1989:3:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "1989:16:2"
                        },
                        "variables": [
                          {
                            "name": "dst",
                            "nodeType": "YulTypedName",
                            "src": "1982:3:2",
                            "type": ""
                          }
                        ]
                      },
                      {
                        "body": {
                          "nodeType": "YulBlock",
                          "src": "2043:83:2",
                          "statements": [
                            {
                              "expression": {
                                "arguments": [],
                                "functionName": {
                                  "name": "revert_error_987264b3b1d58a9c7f8255e93e81c77d86d6299019c33110a076957a3e06e2ae",
                                  "nodeType": "YulIdentifier",
                                  "src": "2045:77:2"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "2045:79:2"
                              },
                              "nodeType": "YulExpressionStatement",
                              "src": "2045:79:2"
                            }
                          ]
                        },
                        "condition": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "src",
                                  "nodeType": "YulIdentifier",
                                  "src": "2024:3:2"
                                },
                                {
                                  "name": "length",
                                  "nodeType": "YulIdentifier",
                                  "src": "2029:6:2"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "2020:3:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "2020:16:2"
                            },
                            {
                              "name": "end",
                              "nodeType": "YulIdentifier",
                              "src": "2038:3:2"
                            }
                          ],
                          "functionName": {
                            "name": "gt",
                            "nodeType": "YulIdentifier",
                            "src": "2017:2:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "2017:25:2"
                        },
                        "nodeType": "YulIf",
                        "src": "2014:112:2"
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "name": "src",
                              "nodeType": "YulIdentifier",
                              "src": "2159:3:2"
                            },
                            {
                              "name": "dst",
                              "nodeType": "YulIdentifier",
                              "src": "2164:3:2"
                            },
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "2169:6:2"
                            }
                          ],
                          "functionName": {
                            "name": "copy_calldata_to_memory",
                            "nodeType": "YulIdentifier",
                            "src": "2135:23:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "2135:41:2"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "2135:41:2"
                      }
                    ]
                  },
                  "name": "abi_decode_available_length_t_string_memory_ptr",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "src",
                      "nodeType": "YulTypedName",
                      "src": "1827:3:2",
                      "type": ""
                    },
                    {
                      "name": "length",
                      "nodeType": "YulTypedName",
                      "src": "1832:6:2",
                      "type": ""
                    },
                    {
                      "name": "end",
                      "nodeType": "YulTypedName",
                      "src": "1840:3:2",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "array",
                      "nodeType": "YulTypedName",
                      "src": "1848:5:2",
                      "type": ""
                    }
                  ],
                  "src": "1770:412:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "2264:278:2",
                    "statements": [
                      {
                        "body": {
                          "nodeType": "YulBlock",
                          "src": "2313:83:2",
                          "statements": [
                            {
                              "expression": {
                                "arguments": [],
                                "functionName": {
                                  "name": "revert_error_1b9f4a0a5773e33b91aa01db23bf8c55fce1411167c872835e7fa00a4f17d46d",
                                  "nodeType": "YulIdentifier",
                                  "src": "2315:77:2"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "2315:79:2"
                              },
                              "nodeType": "YulExpressionStatement",
                              "src": "2315:79:2"
                            }
                          ]
                        },
                        "condition": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "arguments": [
                                    {
                                      "name": "offset",
                                      "nodeType": "YulIdentifier",
                                      "src": "2292:6:2"
                                    },
                                    {
                                      "kind": "number",
                                      "nodeType": "YulLiteral",
                                      "src": "2300:4:2",
                                      "type": "",
                                      "value": "0x1f"
                                    }
                                  ],
                                  "functionName": {
                                    "name": "add",
                                    "nodeType": "YulIdentifier",
                                    "src": "2288:3:2"
                                  },
                                  "nodeType": "YulFunctionCall",
                                  "src": "2288:17:2"
                                },
                                {
                                  "name": "end",
                                  "nodeType": "YulIdentifier",
                                  "src": "2307:3:2"
                                }
                              ],
                              "functionName": {
                                "name": "slt",
                                "nodeType": "YulIdentifier",
                                "src": "2284:3:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "2284:27:2"
                            }
                          ],
                          "functionName": {
                            "name": "iszero",
                            "nodeType": "YulIdentifier",
                            "src": "2277:6:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "2277:35:2"
                        },
                        "nodeType": "YulIf",
                        "src": "2274:122:2"
                      },
                      {
                        "nodeType": "YulVariableDeclaration",
                        "src": "2405:34:2",
                        "value": {
                          "arguments": [
                            {
                              "name": "offset",
                              "nodeType": "YulIdentifier",
                              "src": "2432:6:2"
                            }
                          ],
                          "functionName": {
                            "name": "calldataload",
                            "nodeType": "YulIdentifier",
                            "src": "2419:12:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "2419:20:2"
                        },
                        "variables": [
                          {
                            "name": "length",
                            "nodeType": "YulTypedName",
                            "src": "2409:6:2",
                            "type": ""
                          }
                        ]
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "2448:88:2",
                        "value": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "offset",
                                  "nodeType": "YulIdentifier",
                                  "src": "2509:6:2"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "2517:4:2",
                                  "type": "",
                                  "value": "0x20"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "2505:3:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "2505:17:2"
                            },
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "2524:6:2"
                            },
                            {
                              "name": "end",
                              "nodeType": "YulIdentifier",
                              "src": "2532:3:2"
                            }
                          ],
                          "functionName": {
                            "name": "abi_decode_available_length_t_string_memory_ptr",
                            "nodeType": "YulIdentifier",
                            "src": "2457:47:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "2457:79:2"
                        },
                        "variableNames": [
                          {
                            "name": "array",
                            "nodeType": "YulIdentifier",
                            "src": "2448:5:2"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "abi_decode_t_string_memory_ptr",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "offset",
                      "nodeType": "YulTypedName",
                      "src": "2242:6:2",
                      "type": ""
                    },
                    {
                      "name": "end",
                      "nodeType": "YulTypedName",
                      "src": "2250:3:2",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "array",
                      "nodeType": "YulTypedName",
                      "src": "2258:5:2",
                      "type": ""
                    }
                  ],
                  "src": "2202:340:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "2651:731:2",
                    "statements": [
                      {
                        "body": {
                          "nodeType": "YulBlock",
                          "src": "2697:83:2",
                          "statements": [
                            {
                              "expression": {
                                "arguments": [],
                                "functionName": {
                                  "name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
                                  "nodeType": "YulIdentifier",
                                  "src": "2699:77:2"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "2699:79:2"
                              },
                              "nodeType": "YulExpressionStatement",
                              "src": "2699:79:2"
                            }
                          ]
                        },
                        "condition": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "dataEnd",
                                  "nodeType": "YulIdentifier",
                                  "src": "2672:7:2"
                                },
                                {
                                  "name": "headStart",
                                  "nodeType": "YulIdentifier",
                                  "src": "2681:9:2"
                                }
                              ],
                              "functionName": {
                                "name": "sub",
                                "nodeType": "YulIdentifier",
                                "src": "2668:3:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "2668:23:2"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "2693:2:2",
                              "type": "",
                              "value": "64"
                            }
                          ],
                          "functionName": {
                            "name": "slt",
                            "nodeType": "YulIdentifier",
                            "src": "2664:3:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "2664:32:2"
                        },
                        "nodeType": "YulIf",
                        "src": "2661:119:2"
                      },
                      {
                        "nodeType": "YulBlock",
                        "src": "2790:287:2",
                        "statements": [
                          {
                            "nodeType": "YulVariableDeclaration",
                            "src": "2805:45:2",
                            "value": {
                              "arguments": [
                                {
                                  "arguments": [
                                    {
                                      "name": "headStart",
                                      "nodeType": "YulIdentifier",
                                      "src": "2836:9:2"
                                    },
                                    {
                                      "kind": "number",
                                      "nodeType": "YulLiteral",
                                      "src": "2847:1:2",
                                      "type": "",
                                      "value": "0"
                                    }
                                  ],
                                  "functionName": {
                                    "name": "add",
                                    "nodeType": "YulIdentifier",
                                    "src": "2832:3:2"
                                  },
                                  "nodeType": "YulFunctionCall",
                                  "src": "2832:17:2"
                                }
                              ],
                              "functionName": {
                                "name": "calldataload",
                                "nodeType": "YulIdentifier",
                                "src": "2819:12:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "2819:31:2"
                            },
                            "variables": [
                              {
                                "name": "offset",
                                "nodeType": "YulTypedName",
                                "src": "2809:6:2",
                                "type": ""
                              }
                            ]
                          },
                          {
                            "body": {
                              "nodeType": "YulBlock",
                              "src": "2897:83:2",
                              "statements": [
                                {
                                  "expression": {
                                    "arguments": [],
                                    "functionName": {
                                      "name": "revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db",
                                      "nodeType": "YulIdentifier",
                                      "src": "2899:77:2"
                                    },
                                    "nodeType": "YulFunctionCall",
                                    "src": "2899:79:2"
                                  },
                                  "nodeType": "YulExpressionStatement",
                                  "src": "2899:79:2"
                                }
                              ]
                            },
                            "condition": {
                              "arguments": [
                                {
                                  "name": "offset",
                                  "nodeType": "YulIdentifier",
                                  "src": "2869:6:2"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "2877:18:2",
                                  "type": "",
                                  "value": "0xffffffffffffffff"
                                }
                              ],
                              "functionName": {
                                "name": "gt",
                                "nodeType": "YulIdentifier",
                                "src": "2866:2:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "2866:30:2"
                            },
                            "nodeType": "YulIf",
                            "src": "2863:117:2"
                          },
                          {
                            "nodeType": "YulAssignment",
                            "src": "2994:73:2",
                            "value": {
                              "arguments": [
                                {
                                  "arguments": [
                                    {
                                      "name": "headStart",
                                      "nodeType": "YulIdentifier",
                                      "src": "3039:9:2"
                                    },
                                    {
                                      "name": "offset",
                                      "nodeType": "YulIdentifier",
                                      "src": "3050:6:2"
                                    }
                                  ],
                                  "functionName": {
                                    "name": "add",
                                    "nodeType": "YulIdentifier",
                                    "src": "3035:3:2"
                                  },
                                  "nodeType": "YulFunctionCall",
                                  "src": "3035:22:2"
                                },
                                {
                                  "name": "dataEnd",
                                  "nodeType": "YulIdentifier",
                                  "src": "3059:7:2"
                                }
                              ],
                              "functionName": {
                                "name": "abi_decode_t_string_memory_ptr",
                                "nodeType": "YulIdentifier",
                                "src": "3004:30:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "3004:63:2"
                            },
                            "variableNames": [
                              {
                                "name": "value0",
                                "nodeType": "YulIdentifier",
                                "src": "2994:6:2"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "nodeType": "YulBlock",
                        "src": "3087:288:2",
                        "statements": [
                          {
                            "nodeType": "YulVariableDeclaration",
                            "src": "3102:46:2",
                            "value": {
                              "arguments": [
                                {
                                  "arguments": [
                                    {
                                      "name": "headStart",
                                      "nodeType": "YulIdentifier",
                                      "src": "3133:9:2"
                                    },
                                    {
                                      "kind": "number",
                                      "nodeType": "YulLiteral",
                                      "src": "3144:2:2",
                                      "type": "",
                                      "value": "32"
                                    }
                                  ],
                                  "functionName": {
                                    "name": "add",
                                    "nodeType": "YulIdentifier",
                                    "src": "3129:3:2"
                                  },
                                  "nodeType": "YulFunctionCall",
                                  "src": "3129:18:2"
                                }
                              ],
                              "functionName": {
                                "name": "calldataload",
                                "nodeType": "YulIdentifier",
                                "src": "3116:12:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "3116:32:2"
                            },
                            "variables": [
                              {
                                "name": "offset",
                                "nodeType": "YulTypedName",
                                "src": "3106:6:2",
                                "type": ""
                              }
                            ]
                          },
                          {
                            "body": {
                              "nodeType": "YulBlock",
                              "src": "3195:83:2",
                              "statements": [
                                {
                                  "expression": {
                                    "arguments": [],
                                    "functionName": {
                                      "name": "revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db",
                                      "nodeType": "YulIdentifier",
                                      "src": "3197:77:2"
                                    },
                                    "nodeType": "YulFunctionCall",
                                    "src": "3197:79:2"
                                  },
                                  "nodeType": "YulExpressionStatement",
                                  "src": "3197:79:2"
                                }
                              ]
                            },
                            "condition": {
                              "arguments": [
                                {
                                  "name": "offset",
                                  "nodeType": "YulIdentifier",
                                  "src": "3167:6:2"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "3175:18:2",
                                  "type": "",
                                  "value": "0xffffffffffffffff"
                                }
                              ],
                              "functionName": {
                                "name": "gt",
                                "nodeType": "YulIdentifier",
                                "src": "3164:2:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "3164:30:2"
                            },
                            "nodeType": "YulIf",
                            "src": "3161:117:2"
                          },
                          {
                            "nodeType": "YulAssignment",
                            "src": "3292:73:2",
                            "value": {
                              "arguments": [
                                {
                                  "arguments": [
                                    {
                                      "name": "headStart",
                                      "nodeType": "YulIdentifier",
                                      "src": "3337:9:2"
                                    },
                                    {
                                      "name": "offset",
                                      "nodeType": "YulIdentifier",
                                      "src": "3348:6:2"
                                    }
                                  ],
                                  "functionName": {
                                    "name": "add",
                                    "nodeType": "YulIdentifier",
                                    "src": "3333:3:2"
                                  },
                                  "nodeType": "YulFunctionCall",
                                  "src": "3333:22:2"
                                },
                                {
                                  "name": "dataEnd",
                                  "nodeType": "YulIdentifier",
                                  "src": "3357:7:2"
                                }
                              ],
                              "functionName": {
                                "name": "abi_decode_t_string_memory_ptr",
                                "nodeType": "YulIdentifier",
                                "src": "3302:30:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "3302:63:2"
                            },
                            "variableNames": [
                              {
                                "name": "value1",
                                "nodeType": "YulIdentifier",
                                "src": "3292:6:2"
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  "name": "abi_decode_tuple_t_string_memory_ptrt_string_memory_ptr",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "headStart",
                      "nodeType": "YulTypedName",
                      "src": "2613:9:2",
                      "type": ""
                    },
                    {
                      "name": "dataEnd",
                      "nodeType": "YulTypedName",
                      "src": "2624:7:2",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "value0",
                      "nodeType": "YulTypedName",
                      "src": "2636:6:2",
                      "type": ""
                    },
                    {
                      "name": "value1",
                      "nodeType": "YulTypedName",
                      "src": "2644:6:2",
                      "type": ""
                    }
                  ],
                  "src": "2548:834:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "3430:48:2",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "3440:32:2",
                        "value": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "value",
                                  "nodeType": "YulIdentifier",
                                  "src": "3465:5:2"
                                }
                              ],
                              "functionName": {
                                "name": "iszero",
                                "nodeType": "YulIdentifier",
                                "src": "3458:6:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "3458:13:2"
                            }
                          ],
                          "functionName": {
                            "name": "iszero",
                            "nodeType": "YulIdentifier",
                            "src": "3451:6:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "3451:21:2"
                        },
                        "variableNames": [
                          {
                            "name": "cleaned",
                            "nodeType": "YulIdentifier",
                            "src": "3440:7:2"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "cleanup_t_bool",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "value",
                      "nodeType": "YulTypedName",
                      "src": "3412:5:2",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "cleaned",
                      "nodeType": "YulTypedName",
                      "src": "3422:7:2",
                      "type": ""
                    }
                  ],
                  "src": "3388:90:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "3543:50:2",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [
                            {
                              "name": "pos",
                              "nodeType": "YulIdentifier",
                              "src": "3560:3:2"
                            },
                            {
                              "arguments": [
                                {
                                  "name": "value",
                                  "nodeType": "YulIdentifier",
                                  "src": "3580:5:2"
                                }
                              ],
                              "functionName": {
                                "name": "cleanup_t_bool",
                                "nodeType": "YulIdentifier",
                                "src": "3565:14:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "3565:21:2"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "3553:6:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "3553:34:2"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "3553:34:2"
                      }
                    ]
                  },
                  "name": "abi_encode_t_bool_to_t_bool_fromStack",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "value",
                      "nodeType": "YulTypedName",
                      "src": "3531:5:2",
                      "type": ""
                    },
                    {
                      "name": "pos",
                      "nodeType": "YulTypedName",
                      "src": "3538:3:2",
                      "type": ""
                    }
                  ],
                  "src": "3484:109:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "3691:118:2",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "3701:26:2",
                        "value": {
                          "arguments": [
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "3713:9:2"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "3724:2:2",
                              "type": "",
                              "value": "32"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "3709:3:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "3709:18:2"
                        },
                        "variableNames": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "3701:4:2"
                          }
                        ]
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "name": "value0",
                              "nodeType": "YulIdentifier",
                              "src": "3775:6:2"
                            },
                            {
                              "arguments": [
                                {
                                  "name": "headStart",
                                  "nodeType": "YulIdentifier",
                                  "src": "3788:9:2"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "3799:1:2",
                                  "type": "",
                                  "value": "0"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "3784:3:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "3784:17:2"
                            }
                          ],
                          "functionName": {
                            "name": "abi_encode_t_bool_to_t_bool_fromStack",
                            "nodeType": "YulIdentifier",
                            "src": "3737:37:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "3737:65:2"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "3737:65:2"
                      }
                    ]
                  },
                  "name": "abi_encode_tuple_t_bool__to_t_bool__fromStack_reversed",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "headStart",
                      "nodeType": "YulTypedName",
                      "src": "3663:9:2",
                      "type": ""
                    },
                    {
                      "name": "value0",
                      "nodeType": "YulTypedName",
                      "src": "3675:6:2",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "tail",
                      "nodeType": "YulTypedName",
                      "src": "3686:4:2",
                      "type": ""
                    }
                  ],
                  "src": "3599:210:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "3891:433:2",
                    "statements": [
                      {
                        "body": {
                          "nodeType": "YulBlock",
                          "src": "3937:83:2",
                          "statements": [
                            {
                              "expression": {
                                "arguments": [],
                                "functionName": {
                                  "name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
                                  "nodeType": "YulIdentifier",
                                  "src": "3939:77:2"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "3939:79:2"
                              },
                              "nodeType": "YulExpressionStatement",
                              "src": "3939:79:2"
                            }
                          ]
                        },
                        "condition": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "dataEnd",
                                  "nodeType": "YulIdentifier",
                                  "src": "3912:7:2"
                                },
                                {
                                  "name": "headStart",
                                  "nodeType": "YulIdentifier",
                                  "src": "3921:9:2"
                                }
                              ],
                              "functionName": {
                                "name": "sub",
                                "nodeType": "YulIdentifier",
                                "src": "3908:3:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "3908:23:2"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "3933:2:2",
                              "type": "",
                              "value": "32"
                            }
                          ],
                          "functionName": {
                            "name": "slt",
                            "nodeType": "YulIdentifier",
                            "src": "3904:3:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "3904:32:2"
                        },
                        "nodeType": "YulIf",
                        "src": "3901:119:2"
                      },
                      {
                        "nodeType": "YulBlock",
                        "src": "4030:287:2",
                        "statements": [
                          {
                            "nodeType": "YulVariableDeclaration",
                            "src": "4045:45:2",
                            "value": {
                              "arguments": [
                                {
                                  "arguments": [
                                    {
                                      "name": "headStart",
                                      "nodeType": "YulIdentifier",
                                      "src": "4076:9:2"
                                    },
                                    {
                                      "kind": "number",
                                      "nodeType": "YulLiteral",
                                      "src": "4087:1:2",
                                      "type": "",
                                      "value": "0"
                                    }
                                  ],
                                  "functionName": {
                                    "name": "add",
                                    "nodeType": "YulIdentifier",
                                    "src": "4072:3:2"
                                  },
                                  "nodeType": "YulFunctionCall",
                                  "src": "4072:17:2"
                                }
                              ],
                              "functionName": {
                                "name": "calldataload",
                                "nodeType": "YulIdentifier",
                                "src": "4059:12:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "4059:31:2"
                            },
                            "variables": [
                              {
                                "name": "offset",
                                "nodeType": "YulTypedName",
                                "src": "4049:6:2",
                                "type": ""
                              }
                            ]
                          },
                          {
                            "body": {
                              "nodeType": "YulBlock",
                              "src": "4137:83:2",
                              "statements": [
                                {
                                  "expression": {
                                    "arguments": [],
                                    "functionName": {
                                      "name": "revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db",
                                      "nodeType": "YulIdentifier",
                                      "src": "4139:77:2"
                                    },
                                    "nodeType": "YulFunctionCall",
                                    "src": "4139:79:2"
                                  },
                                  "nodeType": "YulExpressionStatement",
                                  "src": "4139:79:2"
                                }
                              ]
                            },
                            "condition": {
                              "arguments": [
                                {
                                  "name": "offset",
                                  "nodeType": "YulIdentifier",
                                  "src": "4109:6:2"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "4117:18:2",
                                  "type": "",
                                  "value": "0xffffffffffffffff"
                                }
                              ],
                              "functionName": {
                                "name": "gt",
                                "nodeType": "YulIdentifier",
                                "src": "4106:2:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "4106:30:2"
                            },
                            "nodeType": "YulIf",
                            "src": "4103:117:2"
                          },
                          {
                            "nodeType": "YulAssignment",
                            "src": "4234:73:2",
                            "value": {
                              "arguments": [
                                {
                                  "arguments": [
                                    {
                                      "name": "headStart",
                                      "nodeType": "YulIdentifier",
                                      "src": "4279:9:2"
                                    },
                                    {
                                      "name": "offset",
                                      "nodeType": "YulIdentifier",
                                      "src": "4290:6:2"
                                    }
                                  ],
                                  "functionName": {
                                    "name": "add",
                                    "nodeType": "YulIdentifier",
                                    "src": "4275:3:2"
                                  },
                                  "nodeType": "YulFunctionCall",
                                  "src": "4275:22:2"
                                },
                                {
                                  "name": "dataEnd",
                                  "nodeType": "YulIdentifier",
                                  "src": "4299:7:2"
                                }
                              ],
                              "functionName": {
                                "name": "abi_decode_t_string_memory_ptr",
                                "nodeType": "YulIdentifier",
                                "src": "4244:30:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "4244:63:2"
                            },
                            "variableNames": [
                              {
                                "name": "value0",
                                "nodeType": "YulIdentifier",
                                "src": "4234:6:2"
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  "name": "abi_decode_tuple_t_string_memory_ptr",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "headStart",
                      "nodeType": "YulTypedName",
                      "src": "3861:9:2",
                      "type": ""
                    },
                    {
                      "name": "dataEnd",
                      "nodeType": "YulTypedName",
                      "src": "3872:7:2",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "value0",
                      "nodeType": "YulTypedName",
                      "src": "3884:6:2",
                      "type": ""
                    }
                  ],
                  "src": "3815:509:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "4389:40:2",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "4400:22:2",
                        "value": {
                          "arguments": [
                            {
                              "name": "value",
                              "nodeType": "YulIdentifier",
                              "src": "4416:5:2"
                            }
                          ],
                          "functionName": {
                            "name": "mload",
                            "nodeType": "YulIdentifier",
                            "src": "4410:5:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "4410:12:2"
                        },
                        "variableNames": [
                          {
                            "name": "length",
                            "nodeType": "YulIdentifier",
                            "src": "4400:6:2"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "array_length_t_string_memory_ptr",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "value",
                      "nodeType": "YulTypedName",
                      "src": "4372:5:2",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "length",
                      "nodeType": "YulTypedName",
                      "src": "4382:6:2",
                      "type": ""
                    }
                  ],
                  "src": "4330:99:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "4531:73:2",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [
                            {
                              "name": "pos",
                              "nodeType": "YulIdentifier",
                              "src": "4548:3:2"
                            },
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "4553:6:2"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "4541:6:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "4541:19:2"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "4541:19:2"
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "4569:29:2",
                        "value": {
                          "arguments": [
                            {
                              "name": "pos",
                              "nodeType": "YulIdentifier",
                              "src": "4588:3:2"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "4593:4:2",
                              "type": "",
                              "value": "0x20"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "4584:3:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "4584:14:2"
                        },
                        "variableNames": [
                          {
                            "name": "updated_pos",
                            "nodeType": "YulIdentifier",
                            "src": "4569:11:2"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "pos",
                      "nodeType": "YulTypedName",
                      "src": "4503:3:2",
                      "type": ""
                    },
                    {
                      "name": "length",
                      "nodeType": "YulTypedName",
                      "src": "4508:6:2",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "updated_pos",
                      "nodeType": "YulTypedName",
                      "src": "4519:11:2",
                      "type": ""
                    }
                  ],
                  "src": "4435:169:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "4659:258:2",
                    "statements": [
                      {
                        "nodeType": "YulVariableDeclaration",
                        "src": "4669:10:2",
                        "value": {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "4678:1:2",
                          "type": "",
                          "value": "0"
                        },
                        "variables": [
                          {
                            "name": "i",
                            "nodeType": "YulTypedName",
                            "src": "4673:1:2",
                            "type": ""
                          }
                        ]
                      },
                      {
                        "body": {
                          "nodeType": "YulBlock",
                          "src": "4738:63:2",
                          "statements": [
                            {
                              "expression": {
                                "arguments": [
                                  {
                                    "arguments": [
                                      {
                                        "name": "dst",
                                        "nodeType": "YulIdentifier",
                                        "src": "4763:3:2"
                                      },
                                      {
                                        "name": "i",
                                        "nodeType": "YulIdentifier",
                                        "src": "4768:1:2"
                                      }
                                    ],
                                    "functionName": {
                                      "name": "add",
                                      "nodeType": "YulIdentifier",
                                      "src": "4759:3:2"
                                    },
                                    "nodeType": "YulFunctionCall",
                                    "src": "4759:11:2"
                                  },
                                  {
                                    "arguments": [
                                      {
                                        "arguments": [
                                          {
                                            "name": "src",
                                            "nodeType": "YulIdentifier",
                                            "src": "4782:3:2"
                                          },
                                          {
                                            "name": "i",
                                            "nodeType": "YulIdentifier",
                                            "src": "4787:1:2"
                                          }
                                        ],
                                        "functionName": {
                                          "name": "add",
                                          "nodeType": "YulIdentifier",
                                          "src": "4778:3:2"
                                        },
                                        "nodeType": "YulFunctionCall",
                                        "src": "4778:11:2"
                                      }
                                    ],
                                    "functionName": {
                                      "name": "mload",
                                      "nodeType": "YulIdentifier",
                                      "src": "4772:5:2"
                                    },
                                    "nodeType": "YulFunctionCall",
                                    "src": "4772:18:2"
                                  }
                                ],
                                "functionName": {
                                  "name": "mstore",
                                  "nodeType": "YulIdentifier",
                                  "src": "4752:6:2"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "4752:39:2"
                              },
                              "nodeType": "YulExpressionStatement",
                              "src": "4752:39:2"
                            }
                          ]
                        },
                        "condition": {
                          "arguments": [
                            {
                              "name": "i",
                              "nodeType": "YulIdentifier",
                              "src": "4699:1:2"
                            },
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "4702:6:2"
                            }
                          ],
                          "functionName": {
                            "name": "lt",
                            "nodeType": "YulIdentifier",
                            "src": "4696:2:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "4696:13:2"
                        },
                        "nodeType": "YulForLoop",
                        "post": {
                          "nodeType": "YulBlock",
                          "src": "4710:19:2",
                          "statements": [
                            {
                              "nodeType": "YulAssignment",
                              "src": "4712:15:2",
                              "value": {
                                "arguments": [
                                  {
                                    "name": "i",
                                    "nodeType": "YulIdentifier",
                                    "src": "4721:1:2"
                                  },
                                  {
                                    "kind": "number",
                                    "nodeType": "YulLiteral",
                                    "src": "4724:2:2",
                                    "type": "",
                                    "value": "32"
                                  }
                                ],
                                "functionName": {
                                  "name": "add",
                                  "nodeType": "YulIdentifier",
                                  "src": "4717:3:2"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "4717:10:2"
                              },
                              "variableNames": [
                                {
                                  "name": "i",
                                  "nodeType": "YulIdentifier",
                                  "src": "4712:1:2"
                                }
                              ]
                            }
                          ]
                        },
                        "pre": {
                          "nodeType": "YulBlock",
                          "src": "4692:3:2",
                          "statements": []
                        },
                        "src": "4688:113:2"
                      },
                      {
                        "body": {
                          "nodeType": "YulBlock",
                          "src": "4835:76:2",
                          "statements": [
                            {
                              "expression": {
                                "arguments": [
                                  {
                                    "arguments": [
                                      {
                                        "name": "dst",
                                        "nodeType": "YulIdentifier",
                                        "src": "4885:3:2"
                                      },
                                      {
                                        "name": "length",
                                        "nodeType": "YulIdentifier",
                                        "src": "4890:6:2"
                                      }
                                    ],
                                    "functionName": {
                                      "name": "add",
                                      "nodeType": "YulIdentifier",
                                      "src": "4881:3:2"
                                    },
                                    "nodeType": "YulFunctionCall",
                                    "src": "4881:16:2"
                                  },
                                  {
                                    "kind": "number",
                                    "nodeType": "YulLiteral",
                                    "src": "4899:1:2",
                                    "type": "",
                                    "value": "0"
                                  }
                                ],
                                "functionName": {
                                  "name": "mstore",
                                  "nodeType": "YulIdentifier",
                                  "src": "4874:6:2"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "4874:27:2"
                              },
                              "nodeType": "YulExpressionStatement",
                              "src": "4874:27:2"
                            }
                          ]
                        },
                        "condition": {
                          "arguments": [
                            {
                              "name": "i",
                              "nodeType": "YulIdentifier",
                              "src": "4816:1:2"
                            },
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "4819:6:2"
                            }
                          ],
                          "functionName": {
                            "name": "gt",
                            "nodeType": "YulIdentifier",
                            "src": "4813:2:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "4813:13:2"
                        },
                        "nodeType": "YulIf",
                        "src": "4810:101:2"
                      }
                    ]
                  },
                  "name": "copy_memory_to_memory",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "src",
                      "nodeType": "YulTypedName",
                      "src": "4641:3:2",
                      "type": ""
                    },
                    {
                      "name": "dst",
                      "nodeType": "YulTypedName",
                      "src": "4646:3:2",
                      "type": ""
                    },
                    {
                      "name": "length",
                      "nodeType": "YulTypedName",
                      "src": "4651:6:2",
                      "type": ""
                    }
                  ],
                  "src": "4610:307:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "5015:272:2",
                    "statements": [
                      {
                        "nodeType": "YulVariableDeclaration",
                        "src": "5025:53:2",
                        "value": {
                          "arguments": [
                            {
                              "name": "value",
                              "nodeType": "YulIdentifier",
                              "src": "5072:5:2"
                            }
                          ],
                          "functionName": {
                            "name": "array_length_t_string_memory_ptr",
                            "nodeType": "YulIdentifier",
                            "src": "5039:32:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5039:39:2"
                        },
                        "variables": [
                          {
                            "name": "length",
                            "nodeType": "YulTypedName",
                            "src": "5029:6:2",
                            "type": ""
                          }
                        ]
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "5087:78:2",
                        "value": {
                          "arguments": [
                            {
                              "name": "pos",
                              "nodeType": "YulIdentifier",
                              "src": "5153:3:2"
                            },
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "5158:6:2"
                            }
                          ],
                          "functionName": {
                            "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                            "nodeType": "YulIdentifier",
                            "src": "5094:58:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5094:71:2"
                        },
                        "variableNames": [
                          {
                            "name": "pos",
                            "nodeType": "YulIdentifier",
                            "src": "5087:3:2"
                          }
                        ]
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "value",
                                  "nodeType": "YulIdentifier",
                                  "src": "5200:5:2"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "5207:4:2",
                                  "type": "",
                                  "value": "0x20"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "5196:3:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "5196:16:2"
                            },
                            {
                              "name": "pos",
                              "nodeType": "YulIdentifier",
                              "src": "5214:3:2"
                            },
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "5219:6:2"
                            }
                          ],
                          "functionName": {
                            "name": "copy_memory_to_memory",
                            "nodeType": "YulIdentifier",
                            "src": "5174:21:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5174:52:2"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "5174:52:2"
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "5235:46:2",
                        "value": {
                          "arguments": [
                            {
                              "name": "pos",
                              "nodeType": "YulIdentifier",
                              "src": "5246:3:2"
                            },
                            {
                              "arguments": [
                                {
                                  "name": "length",
                                  "nodeType": "YulIdentifier",
                                  "src": "5273:6:2"
                                }
                              ],
                              "functionName": {
                                "name": "round_up_to_mul_of_32",
                                "nodeType": "YulIdentifier",
                                "src": "5251:21:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "5251:29:2"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "5242:3:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5242:39:2"
                        },
                        "variableNames": [
                          {
                            "name": "end",
                            "nodeType": "YulIdentifier",
                            "src": "5235:3:2"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_fromStack",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "value",
                      "nodeType": "YulTypedName",
                      "src": "4996:5:2",
                      "type": ""
                    },
                    {
                      "name": "pos",
                      "nodeType": "YulTypedName",
                      "src": "5003:3:2",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "end",
                      "nodeType": "YulTypedName",
                      "src": "5011:3:2",
                      "type": ""
                    }
                  ],
                  "src": "4923:364:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "5338:32:2",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "5348:16:2",
                        "value": {
                          "name": "value",
                          "nodeType": "YulIdentifier",
                          "src": "5359:5:2"
                        },
                        "variableNames": [
                          {
                            "name": "cleaned",
                            "nodeType": "YulIdentifier",
                            "src": "5348:7:2"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "cleanup_t_uint256",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "value",
                      "nodeType": "YulTypedName",
                      "src": "5320:5:2",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "cleaned",
                      "nodeType": "YulTypedName",
                      "src": "5330:7:2",
                      "type": ""
                    }
                  ],
                  "src": "5293:77:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "5441:53:2",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [
                            {
                              "name": "pos",
                              "nodeType": "YulIdentifier",
                              "src": "5458:3:2"
                            },
                            {
                              "arguments": [
                                {
                                  "name": "value",
                                  "nodeType": "YulIdentifier",
                                  "src": "5481:5:2"
                                }
                              ],
                              "functionName": {
                                "name": "cleanup_t_uint256",
                                "nodeType": "YulIdentifier",
                                "src": "5463:17:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "5463:24:2"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "5451:6:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5451:37:2"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "5451:37:2"
                      }
                    ]
                  },
                  "name": "abi_encode_t_uint256_to_t_uint256_fromStack",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "value",
                      "nodeType": "YulTypedName",
                      "src": "5429:5:2",
                      "type": ""
                    },
                    {
                      "name": "pos",
                      "nodeType": "YulTypedName",
                      "src": "5436:3:2",
                      "type": ""
                    }
                  ],
                  "src": "5376:118:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "5694:430:2",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "5704:26:2",
                        "value": {
                          "arguments": [
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "5716:9:2"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "5727:2:2",
                              "type": "",
                              "value": "96"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "5712:3:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5712:18:2"
                        },
                        "variableNames": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "5704:4:2"
                          }
                        ]
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "headStart",
                                  "nodeType": "YulIdentifier",
                                  "src": "5751:9:2"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "5762:1:2",
                                  "type": "",
                                  "value": "0"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "5747:3:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "5747:17:2"
                            },
                            {
                              "arguments": [
                                {
                                  "name": "tail",
                                  "nodeType": "YulIdentifier",
                                  "src": "5770:4:2"
                                },
                                {
                                  "name": "headStart",
                                  "nodeType": "YulIdentifier",
                                  "src": "5776:9:2"
                                }
                              ],
                              "functionName": {
                                "name": "sub",
                                "nodeType": "YulIdentifier",
                                "src": "5766:3:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "5766:20:2"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "5740:6:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5740:47:2"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "5740:47:2"
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "5796:86:2",
                        "value": {
                          "arguments": [
                            {
                              "name": "value0",
                              "nodeType": "YulIdentifier",
                              "src": "5868:6:2"
                            },
                            {
                              "name": "tail",
                              "nodeType": "YulIdentifier",
                              "src": "5877:4:2"
                            }
                          ],
                          "functionName": {
                            "name": "abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_fromStack",
                            "nodeType": "YulIdentifier",
                            "src": "5804:63:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5804:78:2"
                        },
                        "variableNames": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "5796:4:2"
                          }
                        ]
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "headStart",
                                  "nodeType": "YulIdentifier",
                                  "src": "5903:9:2"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "5914:2:2",
                                  "type": "",
                                  "value": "32"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "5899:3:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "5899:18:2"
                            },
                            {
                              "arguments": [
                                {
                                  "name": "tail",
                                  "nodeType": "YulIdentifier",
                                  "src": "5923:4:2"
                                },
                                {
                                  "name": "headStart",
                                  "nodeType": "YulIdentifier",
                                  "src": "5929:9:2"
                                }
                              ],
                              "functionName": {
                                "name": "sub",
                                "nodeType": "YulIdentifier",
                                "src": "5919:3:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "5919:20:2"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "5892:6:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5892:48:2"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "5892:48:2"
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "5949:86:2",
                        "value": {
                          "arguments": [
                            {
                              "name": "value1",
                              "nodeType": "YulIdentifier",
                              "src": "6021:6:2"
                            },
                            {
                              "name": "tail",
                              "nodeType": "YulIdentifier",
                              "src": "6030:4:2"
                            }
                          ],
                          "functionName": {
                            "name": "abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_fromStack",
                            "nodeType": "YulIdentifier",
                            "src": "5957:63:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5957:78:2"
                        },
                        "variableNames": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "5949:4:2"
                          }
                        ]
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "name": "value2",
                              "nodeType": "YulIdentifier",
                              "src": "6089:6:2"
                            },
                            {
                              "arguments": [
                                {
                                  "name": "headStart",
                                  "nodeType": "YulIdentifier",
                                  "src": "6102:9:2"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "6113:2:2",
                                  "type": "",
                                  "value": "64"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "6098:3:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "6098:18:2"
                            }
                          ],
                          "functionName": {
                            "name": "abi_encode_t_uint256_to_t_uint256_fromStack",
                            "nodeType": "YulIdentifier",
                            "src": "6045:43:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "6045:72:2"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "6045:72:2"
                      }
                    ]
                  },
                  "name": "abi_encode_tuple_t_string_memory_ptr_t_string_memory_ptr_t_uint256__to_t_string_memory_ptr_t_string_memory_ptr_t_uint256__fromStack_reversed",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "headStart",
                      "nodeType": "YulTypedName",
                      "src": "5650:9:2",
                      "type": ""
                    },
                    {
                      "name": "value2",
                      "nodeType": "YulTypedName",
                      "src": "5662:6:2",
                      "type": ""
                    },
                    {
                      "name": "value1",
                      "nodeType": "YulTypedName",
                      "src": "5670:6:2",
                      "type": ""
                    },
                    {
                      "name": "value0",
                      "nodeType": "YulTypedName",
                      "src": "5678:6:2",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "tail",
                      "nodeType": "YulTypedName",
                      "src": "5689:4:2",
                      "type": ""
                    }
                  ],
                  "src": "5500:624:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "6244:34:2",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "6254:18:2",
                        "value": {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "6269:3:2"
                        },
                        "variableNames": [
                          {
                            "name": "updated_pos",
                            "nodeType": "YulIdentifier",
                            "src": "6254:11:2"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "array_storeLengthForEncoding_t_string_memory_ptr_nonPadded_inplace_fromStack",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "pos",
                      "nodeType": "YulTypedName",
                      "src": "6216:3:2",
                      "type": ""
                    },
                    {
                      "name": "length",
                      "nodeType": "YulTypedName",
                      "src": "6221:6:2",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "updated_pos",
                      "nodeType": "YulTypedName",
                      "src": "6232:11:2",
                      "type": ""
                    }
                  ],
                  "src": "6130:148:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "6394:267:2",
                    "statements": [
                      {
                        "nodeType": "YulVariableDeclaration",
                        "src": "6404:53:2",
                        "value": {
                          "arguments": [
                            {
                              "name": "value",
                              "nodeType": "YulIdentifier",
                              "src": "6451:5:2"
                            }
                          ],
                          "functionName": {
                            "name": "array_length_t_string_memory_ptr",
                            "nodeType": "YulIdentifier",
                            "src": "6418:32:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "6418:39:2"
                        },
                        "variables": [
                          {
                            "name": "length",
                            "nodeType": "YulTypedName",
                            "src": "6408:6:2",
                            "type": ""
                          }
                        ]
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "6466:96:2",
                        "value": {
                          "arguments": [
                            {
                              "name": "pos",
                              "nodeType": "YulIdentifier",
                              "src": "6550:3:2"
                            },
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "6555:6:2"
                            }
                          ],
                          "functionName": {
                            "name": "array_storeLengthForEncoding_t_string_memory_ptr_nonPadded_inplace_fromStack",
                            "nodeType": "YulIdentifier",
                            "src": "6473:76:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "6473:89:2"
                        },
                        "variableNames": [
                          {
                            "name": "pos",
                            "nodeType": "YulIdentifier",
                            "src": "6466:3:2"
                          }
                        ]
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "value",
                                  "nodeType": "YulIdentifier",
                                  "src": "6597:5:2"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "6604:4:2",
                                  "type": "",
                                  "value": "0x20"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "6593:3:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "6593:16:2"
                            },
                            {
                              "name": "pos",
                              "nodeType": "YulIdentifier",
                              "src": "6611:3:2"
                            },
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "6616:6:2"
                            }
                          ],
                          "functionName": {
                            "name": "copy_memory_to_memory",
                            "nodeType": "YulIdentifier",
                            "src": "6571:21:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "6571:52:2"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "6571:52:2"
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "6632:23:2",
                        "value": {
                          "arguments": [
                            {
                              "name": "pos",
                              "nodeType": "YulIdentifier",
                              "src": "6643:3:2"
                            },
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "6648:6:2"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "6639:3:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "6639:16:2"
                        },
                        "variableNames": [
                          {
                            "name": "end",
                            "nodeType": "YulIdentifier",
                            "src": "6632:3:2"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_nonPadded_inplace_fromStack",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "value",
                      "nodeType": "YulTypedName",
                      "src": "6375:5:2",
                      "type": ""
                    },
                    {
                      "name": "pos",
                      "nodeType": "YulTypedName",
                      "src": "6382:3:2",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "end",
                      "nodeType": "YulTypedName",
                      "src": "6390:3:2",
                      "type": ""
                    }
                  ],
                  "src": "6284:377:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "6803:139:2",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "6814:102:2",
                        "value": {
                          "arguments": [
                            {
                              "name": "value0",
                              "nodeType": "YulIdentifier",
                              "src": "6903:6:2"
                            },
                            {
                              "name": "pos",
                              "nodeType": "YulIdentifier",
                              "src": "6912:3:2"
                            }
                          ],
                          "functionName": {
                            "name": "abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_nonPadded_inplace_fromStack",
                            "nodeType": "YulIdentifier",
                            "src": "6821:81:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "6821:95:2"
                        },
                        "variableNames": [
                          {
                            "name": "pos",
                            "nodeType": "YulIdentifier",
                            "src": "6814:3:2"
                          }
                        ]
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "6926:10:2",
                        "value": {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "6933:3:2"
                        },
                        "variableNames": [
                          {
                            "name": "end",
                            "nodeType": "YulIdentifier",
                            "src": "6926:3:2"
                          }
                        ]
                      }
                    ]
                  },
                  "name": "abi_encode_tuple_packed_t_string_memory_ptr__to_t_string_memory_ptr__nonPadded_inplace_fromStack_reversed",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "pos",
                      "nodeType": "YulTypedName",
                      "src": "6782:3:2",
                      "type": ""
                    },
                    {
                      "name": "value0",
                      "nodeType": "YulTypedName",
                      "src": "6788:6:2",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "end",
                      "nodeType": "YulTypedName",
                      "src": "6799:3:2",
                      "type": ""
                    }
                  ],
                  "src": "6667:275:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "6976:152:2",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "6993:1:2",
                              "type": "",
                              "value": "0"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "6996:77:2",
                              "type": "",
                              "value": "35408467139433450592217433187231851964531694900788300625387963629091585785856"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "6986:6:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "6986:88:2"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "6986:88:2"
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "7090:1:2",
                              "type": "",
                              "value": "4"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "7093:4:2",
                              "type": "",
                              "value": "0x22"
                            }
                          ],
                          "functionName": {
                            "name": "mstore",
                            "nodeType": "YulIdentifier",
                            "src": "7083:6:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "7083:15:2"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "7083:15:2"
                      },
                      {
                        "expression": {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "7114:1:2",
                              "type": "",
                              "value": "0"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "7117:4:2",
                              "type": "",
                              "value": "0x24"
                            }
                          ],
                          "functionName": {
                            "name": "revert",
                            "nodeType": "YulIdentifier",
                            "src": "7107:6:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "7107:15:2"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "7107:15:2"
                      }
                    ]
                  },
                  "name": "panic_error_0x22",
                  "nodeType": "YulFunctionDefinition",
                  "src": "6948:180:2"
                },
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "7185:269:2",
                    "statements": [
                      {
                        "nodeType": "YulAssignment",
                        "src": "7195:22:2",
                        "value": {
                          "arguments": [
                            {
                              "name": "data",
                              "nodeType": "YulIdentifier",
                              "src": "7209:4:2"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "7215:1:2",
                              "type": "",
                              "value": "2"
                            }
                          ],
                          "functionName": {
                            "name": "div",
                            "nodeType": "YulIdentifier",
                            "src": "7205:3:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "7205:12:2"
                        },
                        "variableNames": [
                          {
                            "name": "length",
                            "nodeType": "YulIdentifier",
                            "src": "7195:6:2"
                          }
                        ]
                      },
                      {
                        "nodeType": "YulVariableDeclaration",
                        "src": "7226:38:2",
                        "value": {
                          "arguments": [
                            {
                              "name": "data",
                              "nodeType": "YulIdentifier",
                              "src": "7256:4:2"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "7262:1:2",
                              "type": "",
                              "value": "1"
                            }
                          ],
                          "functionName": {
                            "name": "and",
                            "nodeType": "YulIdentifier",
                            "src": "7252:3:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "7252:12:2"
                        },
                        "variables": [
                          {
                            "name": "outOfPlaceEncoding",
                            "nodeType": "YulTypedName",
                            "src": "7230:18:2",
                            "type": ""
                          }
                        ]
                      },
                      {
                        "body": {
                          "nodeType": "YulBlock",
                          "src": "7303:51:2",
                          "statements": [
                            {
                              "nodeType": "YulAssignment",
                              "src": "7317:27:2",
                              "value": {
                                "arguments": [
                                  {
                                    "name": "length",
                                    "nodeType": "YulIdentifier",
                                    "src": "7331:6:2"
                                  },
                                  {
                                    "kind": "number",
                                    "nodeType": "YulLiteral",
                                    "src": "7339:4:2",
                                    "type": "",
                                    "value": "0x7f"
                                  }
                                ],
                                "functionName": {
                                  "name": "and",
                                  "nodeType": "YulIdentifier",
                                  "src": "7327:3:2"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "7327:17:2"
                              },
                              "variableNames": [
                                {
                                  "name": "length",
                                  "nodeType": "YulIdentifier",
                                  "src": "7317:6:2"
                                }
                              ]
                            }
                          ]
                        },
                        "condition": {
                          "arguments": [
                            {
                              "name": "outOfPlaceEncoding",
                              "nodeType": "YulIdentifier",
                              "src": "7283:18:2"
                            }
                          ],
                          "functionName": {
                            "name": "iszero",
                            "nodeType": "YulIdentifier",
                            "src": "7276:6:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "7276:26:2"
                        },
                        "nodeType": "YulIf",
                        "src": "7273:81:2"
                      },
                      {
                        "body": {
                          "nodeType": "YulBlock",
                          "src": "7406:42:2",
                          "statements": [
                            {
                              "expression": {
                                "arguments": [],
                                "functionName": {
                                  "name": "panic_error_0x22",
                                  "nodeType": "YulIdentifier",
                                  "src": "7420:16:2"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "7420:18:2"
                              },
                              "nodeType": "YulExpressionStatement",
                              "src": "7420:18:2"
                            }
                          ]
                        },
                        "condition": {
                          "arguments": [
                            {
                              "name": "outOfPlaceEncoding",
                              "nodeType": "YulIdentifier",
                              "src": "7370:18:2"
                            },
                            {
                              "arguments": [
                                {
                                  "name": "length",
                                  "nodeType": "YulIdentifier",
                                  "src": "7393:6:2"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "7401:2:2",
                                  "type": "",
                                  "value": "32"
                                }
                              ],
                              "functionName": {
                                "name": "lt",
                                "nodeType": "YulIdentifier",
                                "src": "7390:2:2"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "7390:14:2"
                            }
                          ],
                          "functionName": {
                            "name": "eq",
                            "nodeType": "YulIdentifier",
                            "src": "7367:2:2"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "7367:38:2"
                        },
                        "nodeType": "YulIf",
                        "src": "7364:84:2"
                      }
                    ]
                  },
                  "name": "extract_byte_array_length",
                  "nodeType": "YulFunctionDefinition",
                  "parameters": [
                    {
                      "name": "data",
                      "nodeType": "YulTypedName",
                      "src": "7169:4:2",
                      "type": ""
                    }
                  ],
                  "returnVariables": [
                    {
                      "name": "length",
                      "nodeType": "YulTypedName",
                      "src": "7178:6:2",
                      "type": ""
                    }
                  ],
                  "src": "7134:320:2"
                }
              ]
            },
            "contents": "{\n\n    function allocate_unbounded() -> memPtr {\n        memPtr := mload(64)\n    }\n\n    function revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() {\n        revert(0, 0)\n    }\n\n    function revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db() {\n        revert(0, 0)\n    }\n\n    function revert_error_1b9f4a0a5773e33b91aa01db23bf8c55fce1411167c872835e7fa00a4f17d46d() {\n        revert(0, 0)\n    }\n\n    function revert_error_987264b3b1d58a9c7f8255e93e81c77d86d6299019c33110a076957a3e06e2ae() {\n        revert(0, 0)\n    }\n\n    function round_up_to_mul_of_32(value) -> result {\n        result := and(add(value, 31), not(31))\n    }\n\n    function panic_error_0x41() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x41)\n        revert(0, 0x24)\n    }\n\n    function finalize_allocation(memPtr, size) {\n        let newFreePtr := add(memPtr, round_up_to_mul_of_32(size))\n        // protect against overflow\n        if or(gt(newFreePtr, 0xffffffffffffffff), lt(newFreePtr, memPtr)) { panic_error_0x41() }\n        mstore(64, newFreePtr)\n    }\n\n    function allocate_memory(size) -> memPtr {\n        memPtr := allocate_unbounded()\n        finalize_allocation(memPtr, size)\n    }\n\n    function array_allocation_size_t_string_memory_ptr(length) -> size {\n        // Make sure we can allocate memory without overflow\n        if gt(length, 0xffffffffffffffff) { panic_error_0x41() }\n\n        size := round_up_to_mul_of_32(length)\n\n        // add length slot\n        size := add(size, 0x20)\n\n    }\n\n    function copy_calldata_to_memory(src, dst, length) {\n        calldatacopy(dst, src, length)\n        // clear end\n        mstore(add(dst, length), 0)\n    }\n\n    function abi_decode_available_length_t_string_memory_ptr(src, length, end) -> array {\n        array := allocate_memory(array_allocation_size_t_string_memory_ptr(length))\n        mstore(array, length)\n        let dst := add(array, 0x20)\n        if gt(add(src, length), end) { revert_error_987264b3b1d58a9c7f8255e93e81c77d86d6299019c33110a076957a3e06e2ae() }\n        copy_calldata_to_memory(src, dst, length)\n    }\n\n    // string\n    function abi_decode_t_string_memory_ptr(offset, end) -> array {\n        if iszero(slt(add(offset, 0x1f), end)) { revert_error_1b9f4a0a5773e33b91aa01db23bf8c55fce1411167c872835e7fa00a4f17d46d() }\n        let length := calldataload(offset)\n        array := abi_decode_available_length_t_string_memory_ptr(add(offset, 0x20), length, end)\n    }\n\n    function abi_decode_tuple_t_string_memory_ptrt_string_memory_ptr(headStart, dataEnd) -> value0, value1 {\n        if slt(sub(dataEnd, headStart), 64) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := calldataload(add(headStart, 0))\n            if gt(offset, 0xffffffffffffffff) { revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db() }\n\n            value0 := abi_decode_t_string_memory_ptr(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := calldataload(add(headStart, 32))\n            if gt(offset, 0xffffffffffffffff) { revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db() }\n\n            value1 := abi_decode_t_string_memory_ptr(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function cleanup_t_bool(value) -> cleaned {\n        cleaned := iszero(iszero(value))\n    }\n\n    function abi_encode_t_bool_to_t_bool_fromStack(value, pos) {\n        mstore(pos, cleanup_t_bool(value))\n    }\n\n    function abi_encode_tuple_t_bool__to_t_bool__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        abi_encode_t_bool_to_t_bool_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    function abi_decode_tuple_t_string_memory_ptr(headStart, dataEnd) -> value0 {\n        if slt(sub(dataEnd, headStart), 32) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := calldataload(add(headStart, 0))\n            if gt(offset, 0xffffffffffffffff) { revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db() }\n\n            value0 := abi_decode_t_string_memory_ptr(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function array_length_t_string_memory_ptr(value) -> length {\n\n        length := mload(value)\n\n    }\n\n    function array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, length) -> updated_pos {\n        mstore(pos, length)\n        updated_pos := add(pos, 0x20)\n    }\n\n    function copy_memory_to_memory(src, dst, length) {\n        let i := 0\n        for { } lt(i, length) { i := add(i, 32) }\n        {\n            mstore(add(dst, i), mload(add(src, i)))\n        }\n        if gt(i, length)\n        {\n            // clear end\n            mstore(add(dst, length), 0)\n        }\n    }\n\n    function abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_fromStack(value, pos) -> end {\n        let length := array_length_t_string_memory_ptr(value)\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, length)\n        copy_memory_to_memory(add(value, 0x20), pos, length)\n        end := add(pos, round_up_to_mul_of_32(length))\n    }\n\n    function cleanup_t_uint256(value) -> cleaned {\n        cleaned := value\n    }\n\n    function abi_encode_t_uint256_to_t_uint256_fromStack(value, pos) {\n        mstore(pos, cleanup_t_uint256(value))\n    }\n\n    function abi_encode_tuple_t_string_memory_ptr_t_string_memory_ptr_t_uint256__to_t_string_memory_ptr_t_string_memory_ptr_t_uint256__fromStack_reversed(headStart , value2, value1, value0) -> tail {\n        tail := add(headStart, 96)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_fromStack(value0,  tail)\n\n        mstore(add(headStart, 32), sub(tail, headStart))\n        tail := abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_fromStack(value1,  tail)\n\n        abi_encode_t_uint256_to_t_uint256_fromStack(value2,  add(headStart, 64))\n\n    }\n\n    function array_storeLengthForEncoding_t_string_memory_ptr_nonPadded_inplace_fromStack(pos, length) -> updated_pos {\n        updated_pos := pos\n    }\n\n    function abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_nonPadded_inplace_fromStack(value, pos) -> end {\n        let length := array_length_t_string_memory_ptr(value)\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_nonPadded_inplace_fromStack(pos, length)\n        copy_memory_to_memory(add(value, 0x20), pos, length)\n        end := add(pos, length)\n    }\n\n    function abi_encode_tuple_packed_t_string_memory_ptr__to_t_string_memory_ptr__nonPadded_inplace_fromStack_reversed(pos , value0) -> end {\n\n        pos := abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_nonPadded_inplace_fromStack(value0,  pos)\n\n        end := pos\n    }\n\n    function panic_error_0x22() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x22)\n        revert(0, 0x24)\n    }\n\n    function extract_byte_array_length(data) -> length {\n        length := div(data, 2)\n        let outOfPlaceEncoding := and(data, 1)\n        if iszero(outOfPlaceEncoding) {\n            length := and(length, 0x7f)\n        }\n\n        if eq(outOfPlaceEncoding, lt(length, 32)) {\n            panic_error_0x22()\n        }\n    }\n\n}\n",
            "id": 2,
            "language": "Yul",
            "name": "#utility.yul"
          }
        ],
        "sourceMap": "57:704:1:-:0;;;;;;;;;;;;;;;;;;;",
        "deployedSourceMap": "57:704:1:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;456:303;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;240:210;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;192:41;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;;;:::i;:::-;;;;;;;;456:303;543:4;558:17;578:6;585:5;578:13;;;;;;:::i;:::-;;;;;;;;;;;;;:20;;558:40;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;678:6;660:26;;;;;;;;:::i;:::-;;;;;;;;;;;;;650:37;;;;;;640:3;622:23;;;;;;;;:::i;:::-;;;;;;;;;;;;;612:34;;;;;;:75;608:143;;708:4;701:11;;;;;608:143;746:5;739:12;;;456:303;;;;;:::o;240:210::-;345:5;322:6;329:5;322:13;;;;;;:::i;:::-;;;;;;;;;;;;;:19;;:28;;;;;;;;;;;;:::i;:::-;;383:6;360;367:5;360:13;;;;;;:::i;:::-;;;;;;;;;;;;;:20;;:29;;;;;;;;;;;;:::i;:::-;;428:15;399:6;406:5;399:13;;;;;;:::i;:::-;;;;;;;;;;;;;:26;;:44;;;;240:210;;:::o;192:41::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;-1:-1:-1:-;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;:::o;7:75:2:-;40:6;73:2;67:9;57:19;;7:75;:::o;88:117::-;197:1;194;187:12;211:117;320:1;317;310:12;334:117;443:1;440;433:12;457:117;566:1;563;556:12;580:102;621:6;672:2;668:7;663:2;656:5;652:14;648:28;638:38;;580:102;;;:::o;688:180::-;736:77;733:1;726:88;833:4;830:1;823:15;857:4;854:1;847:15;874:281;957:27;979:4;957:27;:::i;:::-;949:6;945:40;1087:6;1075:10;1072:22;1051:18;1039:10;1036:34;1033:62;1030:88;;;1098:18;;:::i;:::-;1030:88;1138:10;1134:2;1127:22;917:238;874:281;;:::o;1161:129::-;1195:6;1222:20;;:::i;:::-;1212:30;;1251:33;1279:4;1271:6;1251:33;:::i;:::-;1161:129;;;:::o;1296:308::-;1358:4;1448:18;1440:6;1437:30;1434:56;;;1470:18;;:::i;:::-;1434:56;1508:29;1530:6;1508:29;:::i;:::-;1500:37;;1592:4;1586;1582:15;1574:23;;1296:308;;;:::o;1610:154::-;1694:6;1689:3;1684;1671:30;1756:1;1747:6;1742:3;1738:16;1731:27;1610:154;;;:::o;1770:412::-;1848:5;1873:66;1889:49;1931:6;1889:49;:::i;:::-;1873:66;:::i;:::-;1864:75;;1962:6;1955:5;1948:21;2000:4;1993:5;1989:16;2038:3;2029:6;2024:3;2020:16;2017:25;2014:112;;;2045:79;;:::i;:::-;2014:112;2135:41;2169:6;2164:3;2159;2135:41;:::i;:::-;1854:328;1770:412;;;;;:::o;2202:340::-;2258:5;2307:3;2300:4;2292:6;2288:17;2284:27;2274:122;;2315:79;;:::i;:::-;2274:122;2432:6;2419:20;2457:79;2532:3;2524:6;2517:4;2509:6;2505:17;2457:79;:::i;:::-;2448:88;;2264:278;2202:340;;;;:::o;2548:834::-;2636:6;2644;2693:2;2681:9;2672:7;2668:23;2664:32;2661:119;;;2699:79;;:::i;:::-;2661:119;2847:1;2836:9;2832:17;2819:31;2877:18;2869:6;2866:30;2863:117;;;2899:79;;:::i;:::-;2863:117;3004:63;3059:7;3050:6;3039:9;3035:22;3004:63;:::i;:::-;2994:73;;2790:287;3144:2;3133:9;3129:18;3116:32;3175:18;3167:6;3164:30;3161:117;;;3197:79;;:::i;:::-;3161:117;3302:63;3357:7;3348:6;3337:9;3333:22;3302:63;:::i;:::-;3292:73;;3087:288;2548:834;;;;;:::o;3388:90::-;3422:7;3465:5;3458:13;3451:21;3440:32;;3388:90;;;:::o;3484:109::-;3565:21;3580:5;3565:21;:::i;:::-;3560:3;3553:34;3484:109;;:::o;3599:210::-;3686:4;3724:2;3713:9;3709:18;3701:26;;3737:65;3799:1;3788:9;3784:17;3775:6;3737:65;:::i;:::-;3599:210;;;;:::o;3815:509::-;3884:6;3933:2;3921:9;3912:7;3908:23;3904:32;3901:119;;;3939:79;;:::i;:::-;3901:119;4087:1;4076:9;4072:17;4059:31;4117:18;4109:6;4106:30;4103:117;;;4139:79;;:::i;:::-;4103:117;4244:63;4299:7;4290:6;4279:9;4275:22;4244:63;:::i;:::-;4234:73;;4030:287;3815:509;;;;:::o;4330:99::-;4382:6;4416:5;4410:12;4400:22;;4330:99;;;:::o;4435:169::-;4519:11;4553:6;4548:3;4541:19;4593:4;4588:3;4584:14;4569:29;;4435:169;;;;:::o;4610:307::-;4678:1;4688:113;4702:6;4699:1;4696:13;4688:113;;;4787:1;4782:3;4778:11;4772:18;4768:1;4763:3;4759:11;4752:39;4724:2;4721:1;4717:10;4712:15;;4688:113;;;4819:6;4816:1;4813:13;4810:101;;;4899:1;4890:6;4885:3;4881:16;4874:27;4810:101;4659:258;4610:307;;;:::o;4923:364::-;5011:3;5039:39;5072:5;5039:39;:::i;:::-;5094:71;5158:6;5153:3;5094:71;:::i;:::-;5087:78;;5174:52;5219:6;5214:3;5207:4;5200:5;5196:16;5174:52;:::i;:::-;5251:29;5273:6;5251:29;:::i;:::-;5246:3;5242:39;5235:46;;5015:272;4923:364;;;;:::o;5293:77::-;5330:7;5359:5;5348:16;;5293:77;;;:::o;5376:118::-;5463:24;5481:5;5463:24;:::i;:::-;5458:3;5451:37;5376:118;;:::o;5500:624::-;5689:4;5727:2;5716:9;5712:18;5704:26;;5776:9;5770:4;5766:20;5762:1;5751:9;5747:17;5740:47;5804:78;5877:4;5868:6;5804:78;:::i;:::-;5796:86;;5929:9;5923:4;5919:20;5914:2;5903:9;5899:18;5892:48;5957:78;6030:4;6021:6;5957:78;:::i;:::-;5949:86;;6045:72;6113:2;6102:9;6098:18;6089:6;6045:72;:::i;:::-;5500:624;;;;;;:::o;6130:148::-;6232:11;6269:3;6254:18;;6130:148;;;;:::o;6284:377::-;6390:3;6418:39;6451:5;6418:39;:::i;:::-;6473:89;6555:6;6550:3;6473:89;:::i;:::-;6466:96;;6571:52;6616:6;6611:3;6604:4;6597:5;6593:16;6571:52;:::i;:::-;6648:6;6643:3;6639:16;6632:23;;6394:267;6284:377;;;;:::o;6667:275::-;6799:3;6821:95;6912:3;6903:6;6821:95;:::i;:::-;6814:102;;6933:3;6926:10;;6667:275;;;;:::o;6948:180::-;6996:77;6993:1;6986:88;7093:4;7090:1;7083:15;7117:4;7114:1;7107:15;7134:320;7178:6;7215:1;7209:4;7205:12;7195:22;;7262:1;7256:4;7252:12;7283:18;7273:81;;7339:4;7331:6;7327:17;7317:27;;7273:81;7401:2;7393:6;7390:14;7370:18;7367:38;7364:84;;7420:18;;:::i;:::-;7364:84;7185:269;7134:320;;;:::o",
        "source": "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract SRTSignature {\n\n    struct Document {\n        string  docId;\n        string  docSig;\n        uint256 updated_time;\n    }\n\n    mapping(string => Document) public docMap;\n\n    function pushDocument(string memory docId, string memory docSig) public {\n        docMap[docId].docId  = docId;\n        docMap[docId].docSig = docSig;\n        docMap[docId].updated_time = block.timestamp;\n    }\n\n    function verifyDocument(string memory docId, string memory docSig) public view returns(bool){\n        string memory sig = docMap[docId].docSig;\n        if (keccak256(abi.encodePacked((sig))) == keccak256(abi.encodePacked((docSig))))\n            return true;\n        else\n            return false;\n\n    }\n}",
        "sourcePath": "/Users/bunyasan/learning/login/project/public/app/Blockchain/contracts/SRTSignature.sol",
        "ast": {
          "absolutePath": "project:/contracts/SRTSignature.sol",
          "exportedSymbols": {
            "SRTSignature": [
              114
            ]
          },
          "id": 115,
          "license": "MIT",
          "nodeType": "SourceUnit",
          "nodes": [
            {
              "id": 34,
              "literals": [
                "solidity",
                "^",
                "0.8",
                ".0"
              ],
              "nodeType": "PragmaDirective",
              "src": "32:23:1"
            },
            {
              "abstract": false,
              "baseContracts": [],
              "canonicalName": "SRTSignature",
              "contractDependencies": [],
              "contractKind": "contract",
              "fullyImplemented": true,
              "id": 114,
              "linearizedBaseContracts": [
                114
              ],
              "name": "SRTSignature",
              "nameLocation": "66:12:1",
              "nodeType": "ContractDefinition",
              "nodes": [
                {
                  "canonicalName": "SRTSignature.Document",
                  "id": 41,
                  "members": [
                    {
                      "constant": false,
                      "id": 36,
                      "mutability": "mutable",
                      "name": "docId",
                      "nameLocation": "120:5:1",
                      "nodeType": "VariableDeclaration",
                      "scope": 41,
                      "src": "112:13:1",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage_ptr",
                        "typeString": "string"
                      },
                      "typeName": {
                        "id": 35,
                        "name": "string",
                        "nodeType": "ElementaryTypeName",
                        "src": "112:6:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_storage_ptr",
                          "typeString": "string"
                        }
                      },
                      "visibility": "internal"
                    },
                    {
                      "constant": false,
                      "id": 38,
                      "mutability": "mutable",
                      "name": "docSig",
                      "nameLocation": "143:6:1",
                      "nodeType": "VariableDeclaration",
                      "scope": 41,
                      "src": "135:14:1",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage_ptr",
                        "typeString": "string"
                      },
                      "typeName": {
                        "id": 37,
                        "name": "string",
                        "nodeType": "ElementaryTypeName",
                        "src": "135:6:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_storage_ptr",
                          "typeString": "string"
                        }
                      },
                      "visibility": "internal"
                    },
                    {
                      "constant": false,
                      "id": 40,
                      "mutability": "mutable",
                      "name": "updated_time",
                      "nameLocation": "167:12:1",
                      "nodeType": "VariableDeclaration",
                      "scope": 41,
                      "src": "159:20:1",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 39,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "159:7:1",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "visibility": "internal"
                    }
                  ],
                  "name": "Document",
                  "nameLocation": "93:8:1",
                  "nodeType": "StructDefinition",
                  "scope": 114,
                  "src": "86:100:1",
                  "visibility": "public"
                },
                {
                  "constant": false,
                  "functionSelector": "f3bc4230",
                  "id": 46,
                  "mutability": "mutable",
                  "name": "docMap",
                  "nameLocation": "227:6:1",
                  "nodeType": "VariableDeclaration",
                  "scope": 114,
                  "src": "192:41:1",
                  "stateVariable": true,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_mapping$_t_string_memory_ptr_$_t_struct$_Document_$41_storage_$",
                    "typeString": "mapping(string => struct SRTSignature.Document)"
                  },
                  "typeName": {
                    "id": 45,
                    "keyType": {
                      "id": 42,
                      "name": "string",
                      "nodeType": "ElementaryTypeName",
                      "src": "200:6:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_string_storage_ptr",
                        "typeString": "string"
                      }
                    },
                    "nodeType": "Mapping",
                    "src": "192:27:1",
                    "typeDescriptions": {
                      "typeIdentifier": "t_mapping$_t_string_memory_ptr_$_t_struct$_Document_$41_storage_$",
                      "typeString": "mapping(string => struct SRTSignature.Document)"
                    },
                    "valueType": {
                      "id": 44,
                      "nodeType": "UserDefinedTypeName",
                      "pathNode": {
                        "id": 43,
                        "name": "Document",
                        "nodeType": "IdentifierPath",
                        "referencedDeclaration": 41,
                        "src": "210:8:1"
                      },
                      "referencedDeclaration": 41,
                      "src": "210:8:1",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Document_$41_storage_ptr",
                        "typeString": "struct SRTSignature.Document"
                      }
                    }
                  },
                  "visibility": "public"
                },
                {
                  "body": {
                    "id": 75,
                    "nodeType": "Block",
                    "src": "312:138:1",
                    "statements": [
                      {
                        "expression": {
                          "id": 58,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftHandSide": {
                            "expression": {
                              "baseExpression": {
                                "id": 53,
                                "name": "docMap",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 46,
                                "src": "322:6:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_mapping$_t_string_memory_ptr_$_t_struct$_Document_$41_storage_$",
                                  "typeString": "mapping(string memory => struct SRTSignature.Document storage ref)"
                                }
                              },
                              "id": 55,
                              "indexExpression": {
                                "id": 54,
                                "name": "docId",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 48,
                                "src": "329:5:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_string_memory_ptr",
                                  "typeString": "string memory"
                                }
                              },
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "322:13:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_Document_$41_storage",
                                "typeString": "struct SRTSignature.Document storage ref"
                              }
                            },
                            "id": 56,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": true,
                            "memberName": "docId",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 36,
                            "src": "322:19:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_string_storage",
                              "typeString": "string storage ref"
                            }
                          },
                          "nodeType": "Assignment",
                          "operator": "=",
                          "rightHandSide": {
                            "id": 57,
                            "name": "docId",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 48,
                            "src": "345:5:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_string_memory_ptr",
                              "typeString": "string memory"
                            }
                          },
                          "src": "322:28:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_string_storage",
                            "typeString": "string storage ref"
                          }
                        },
                        "id": 59,
                        "nodeType": "ExpressionStatement",
                        "src": "322:28:1"
                      },
                      {
                        "expression": {
                          "id": 65,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftHandSide": {
                            "expression": {
                              "baseExpression": {
                                "id": 60,
                                "name": "docMap",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 46,
                                "src": "360:6:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_mapping$_t_string_memory_ptr_$_t_struct$_Document_$41_storage_$",
                                  "typeString": "mapping(string memory => struct SRTSignature.Document storage ref)"
                                }
                              },
                              "id": 62,
                              "indexExpression": {
                                "id": 61,
                                "name": "docId",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 48,
                                "src": "367:5:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_string_memory_ptr",
                                  "typeString": "string memory"
                                }
                              },
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "360:13:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_Document_$41_storage",
                                "typeString": "struct SRTSignature.Document storage ref"
                              }
                            },
                            "id": 63,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": true,
                            "memberName": "docSig",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 38,
                            "src": "360:20:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_string_storage",
                              "typeString": "string storage ref"
                            }
                          },
                          "nodeType": "Assignment",
                          "operator": "=",
                          "rightHandSide": {
                            "id": 64,
                            "name": "docSig",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 50,
                            "src": "383:6:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_string_memory_ptr",
                              "typeString": "string memory"
                            }
                          },
                          "src": "360:29:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_string_storage",
                            "typeString": "string storage ref"
                          }
                        },
                        "id": 66,
                        "nodeType": "ExpressionStatement",
                        "src": "360:29:1"
                      },
                      {
                        "expression": {
                          "id": 73,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftHandSide": {
                            "expression": {
                              "baseExpression": {
                                "id": 67,
                                "name": "docMap",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 46,
                                "src": "399:6:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_mapping$_t_string_memory_ptr_$_t_struct$_Document_$41_storage_$",
                                  "typeString": "mapping(string memory => struct SRTSignature.Document storage ref)"
                                }
                              },
                              "id": 69,
                              "indexExpression": {
                                "id": 68,
                                "name": "docId",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 48,
                                "src": "406:5:1",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_string_memory_ptr",
                                  "typeString": "string memory"
                                }
                              },
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "399:13:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_Document_$41_storage",
                                "typeString": "struct SRTSignature.Document storage ref"
                              }
                            },
                            "id": 70,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": true,
                            "memberName": "updated_time",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 40,
                            "src": "399:26:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "Assignment",
                          "operator": "=",
                          "rightHandSide": {
                            "expression": {
                              "id": 71,
                              "name": "block",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4294967292,
                              "src": "428:5:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_magic_block",
                                "typeString": "block"
                              }
                            },
                            "id": 72,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "timestamp",
                            "nodeType": "MemberAccess",
                            "src": "428:15:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "399:44:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 74,
                        "nodeType": "ExpressionStatement",
                        "src": "399:44:1"
                      }
                    ]
                  },
                  "functionSelector": "c4b9067d",
                  "id": 76,
                  "implemented": true,
                  "kind": "function",
                  "modifiers": [],
                  "name": "pushDocument",
                  "nameLocation": "249:12:1",
                  "nodeType": "FunctionDefinition",
                  "parameters": {
                    "id": 51,
                    "nodeType": "ParameterList",
                    "parameters": [
                      {
                        "constant": false,
                        "id": 48,
                        "mutability": "mutable",
                        "name": "docId",
                        "nameLocation": "276:5:1",
                        "nodeType": "VariableDeclaration",
                        "scope": 76,
                        "src": "262:19:1",
                        "stateVariable": false,
                        "storageLocation": "memory",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory_ptr",
                          "typeString": "string"
                        },
                        "typeName": {
                          "id": 47,
                          "name": "string",
                          "nodeType": "ElementaryTypeName",
                          "src": "262:6:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_string_storage_ptr",
                            "typeString": "string"
                          }
                        },
                        "visibility": "internal"
                      },
                      {
                        "constant": false,
                        "id": 50,
                        "mutability": "mutable",
                        "name": "docSig",
                        "nameLocation": "297:6:1",
                        "nodeType": "VariableDeclaration",
                        "scope": 76,
                        "src": "283:20:1",
                        "stateVariable": false,
                        "storageLocation": "memory",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory_ptr",
                          "typeString": "string"
                        },
                        "typeName": {
                          "id": 49,
                          "name": "string",
                          "nodeType": "ElementaryTypeName",
                          "src": "283:6:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_string_storage_ptr",
                            "typeString": "string"
                          }
                        },
                        "visibility": "internal"
                      }
                    ],
                    "src": "261:43:1"
                  },
                  "returnParameters": {
                    "id": 52,
                    "nodeType": "ParameterList",
                    "parameters": [],
                    "src": "312:0:1"
                  },
                  "scope": 114,
                  "src": "240:210:1",
                  "stateMutability": "nonpayable",
                  "virtual": false,
                  "visibility": "public"
                },
                {
                  "body": {
                    "id": 112,
                    "nodeType": "Block",
                    "src": "548:211:1",
                    "statements": [
                      {
                        "assignments": [
                          86
                        ],
                        "declarations": [
                          {
                            "constant": false,
                            "id": 86,
                            "mutability": "mutable",
                            "name": "sig",
                            "nameLocation": "572:3:1",
                            "nodeType": "VariableDeclaration",
                            "scope": 112,
                            "src": "558:17:1",
                            "stateVariable": false,
                            "storageLocation": "memory",
                            "typeDescriptions": {
                              "typeIdentifier": "t_string_memory_ptr",
                              "typeString": "string"
                            },
                            "typeName": {
                              "id": 85,
                              "name": "string",
                              "nodeType": "ElementaryTypeName",
                              "src": "558:6:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_string_storage_ptr",
                                "typeString": "string"
                              }
                            },
                            "visibility": "internal"
                          }
                        ],
                        "id": 91,
                        "initialValue": {
                          "expression": {
                            "baseExpression": {
                              "id": 87,
                              "name": "docMap",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 46,
                              "src": "578:6:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_mapping$_t_string_memory_ptr_$_t_struct$_Document_$41_storage_$",
                                "typeString": "mapping(string memory => struct SRTSignature.Document storage ref)"
                              }
                            },
                            "id": 89,
                            "indexExpression": {
                              "id": 88,
                              "name": "docId",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 78,
                              "src": "585:5:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_string_memory_ptr",
                                "typeString": "string memory"
                              }
                            },
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "nodeType": "IndexAccess",
                            "src": "578:13:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_Document_$41_storage",
                              "typeString": "struct SRTSignature.Document storage ref"
                            }
                          },
                          "id": 90,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "docSig",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 38,
                          "src": "578:20:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_string_storage",
                            "typeString": "string storage ref"
                          }
                        },
                        "nodeType": "VariableDeclarationStatement",
                        "src": "558:40:1"
                      },
                      {
                        "condition": {
                          "commonType": {
                            "typeIdentifier": "t_bytes32",
                            "typeString": "bytes32"
                          },
                          "id": 106,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "arguments": [
                              {
                                "arguments": [
                                  {
                                    "components": [
                                      {
                                        "id": 95,
                                        "name": "sig",
                                        "nodeType": "Identifier",
                                        "overloadedDeclarations": [],
                                        "referencedDeclaration": 86,
                                        "src": "640:3:1",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_string_memory_ptr",
                                          "typeString": "string memory"
                                        }
                                      }
                                    ],
                                    "id": 96,
                                    "isConstant": false,
                                    "isInlineArray": false,
                                    "isLValue": false,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "nodeType": "TupleExpression",
                                    "src": "639:5:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_string_memory_ptr",
                                      "typeString": "string memory"
                                    }
                                  }
                                ],
                                "expression": {
                                  "argumentTypes": [
                                    {
                                      "typeIdentifier": "t_string_memory_ptr",
                                      "typeString": "string memory"
                                    }
                                  ],
                                  "expression": {
                                    "id": 93,
                                    "name": "abi",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4294967295,
                                    "src": "622:3:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_magic_abi",
                                      "typeString": "abi"
                                    }
                                  },
                                  "id": 94,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "lValueRequested": false,
                                  "memberName": "encodePacked",
                                  "nodeType": "MemberAccess",
                                  "src": "622:16:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
                                    "typeString": "function () pure returns (bytes memory)"
                                  }
                                },
                                "id": 97,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "kind": "functionCall",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "622:23:1",
                                "tryCall": false,
                                "typeDescriptions": {
                                  "typeIdentifier": "t_bytes_memory_ptr",
                                  "typeString": "bytes memory"
                                }
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bytes_memory_ptr",
                                  "typeString": "bytes memory"
                                }
                              ],
                              "id": 92,
                              "name": "keccak256",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4294967288,
                              "src": "612:9:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_keccak256_pure$_t_bytes_memory_ptr_$returns$_t_bytes32_$",
                                "typeString": "function (bytes memory) pure returns (bytes32)"
                              }
                            },
                            "id": 98,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "612:34:1",
                            "tryCall": false,
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes32",
                              "typeString": "bytes32"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "arguments": [
                              {
                                "arguments": [
                                  {
                                    "components": [
                                      {
                                        "id": 102,
                                        "name": "docSig",
                                        "nodeType": "Identifier",
                                        "overloadedDeclarations": [],
                                        "referencedDeclaration": 80,
                                        "src": "678:6:1",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_string_memory_ptr",
                                          "typeString": "string memory"
                                        }
                                      }
                                    ],
                                    "id": 103,
                                    "isConstant": false,
                                    "isInlineArray": false,
                                    "isLValue": false,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "nodeType": "TupleExpression",
                                    "src": "677:8:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_string_memory_ptr",
                                      "typeString": "string memory"
                                    }
                                  }
                                ],
                                "expression": {
                                  "argumentTypes": [
                                    {
                                      "typeIdentifier": "t_string_memory_ptr",
                                      "typeString": "string memory"
                                    }
                                  ],
                                  "expression": {
                                    "id": 100,
                                    "name": "abi",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4294967295,
                                    "src": "660:3:1",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_magic_abi",
                                      "typeString": "abi"
                                    }
                                  },
                                  "id": 101,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "lValueRequested": false,
                                  "memberName": "encodePacked",
                                  "nodeType": "MemberAccess",
                                  "src": "660:16:1",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
                                    "typeString": "function () pure returns (bytes memory)"
                                  }
                                },
                                "id": 104,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "kind": "functionCall",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "660:26:1",
                                "tryCall": false,
                                "typeDescriptions": {
                                  "typeIdentifier": "t_bytes_memory_ptr",
                                  "typeString": "bytes memory"
                                }
                              }
                            ],
                            "expression": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bytes_memory_ptr",
                                  "typeString": "bytes memory"
                                }
                              ],
                              "id": 99,
                              "name": "keccak256",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4294967288,
                              "src": "650:9:1",
                              "typeDescriptions": {
                                "typeIdentifier": "t_function_keccak256_pure$_t_bytes_memory_ptr_$returns$_t_bytes32_$",
                                "typeString": "function (bytes memory) pure returns (bytes32)"
                              }
                            },
                            "id": 105,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "kind": "functionCall",
                            "lValueRequested": false,
                            "names": [],
                            "nodeType": "FunctionCall",
                            "src": "650:37:1",
                            "tryCall": false,
                            "typeDescriptions": {
                              "typeIdentifier": "t_bytes32",
                              "typeString": "bytes32"
                            }
                          },
                          "src": "612:75:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": {
                          "expression": {
                            "hexValue": "66616c7365",
                            "id": 109,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "bool",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "746:5:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bool",
                              "typeString": "bool"
                            },
                            "value": "false"
                          },
                          "functionReturnParameters": 84,
                          "id": 110,
                          "nodeType": "Return",
                          "src": "739:12:1"
                        },
                        "id": 111,
                        "nodeType": "IfStatement",
                        "src": "608:143:1",
                        "trueBody": {
                          "expression": {
                            "hexValue": "74727565",
                            "id": 107,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "bool",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "708:4:1",
                            "typeDescriptions": {
                              "typeIdentifier": "t_bool",
                              "typeString": "bool"
                            },
                            "value": "true"
                          },
                          "functionReturnParameters": 84,
                          "id": 108,
                          "nodeType": "Return",
                          "src": "701:11:1"
                        }
                      }
                    ]
                  },
                  "functionSelector": "a4ca650b",
                  "id": 113,
                  "implemented": true,
                  "kind": "function",
                  "modifiers": [],
                  "name": "verifyDocument",
                  "nameLocation": "465:14:1",
                  "nodeType": "FunctionDefinition",
                  "parameters": {
                    "id": 81,
                    "nodeType": "ParameterList",
                    "parameters": [
                      {
                        "constant": false,
                        "id": 78,
                        "mutability": "mutable",
                        "name": "docId",
                        "nameLocation": "494:5:1",
                        "nodeType": "VariableDeclaration",
                        "scope": 113,
                        "src": "480:19:1",
                        "stateVariable": false,
                        "storageLocation": "memory",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory_ptr",
                          "typeString": "string"
                        },
                        "typeName": {
                          "id": 77,
                          "name": "string",
                          "nodeType": "ElementaryTypeName",
                          "src": "480:6:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_string_storage_ptr",
                            "typeString": "string"
                          }
                        },
                        "visibility": "internal"
                      },
                      {
                        "constant": false,
                        "id": 80,
                        "mutability": "mutable",
                        "name": "docSig",
                        "nameLocation": "515:6:1",
                        "nodeType": "VariableDeclaration",
                        "scope": 113,
                        "src": "501:20:1",
                        "stateVariable": false,
                        "storageLocation": "memory",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory_ptr",
                          "typeString": "string"
                        },
                        "typeName": {
                          "id": 79,
                          "name": "string",
                          "nodeType": "ElementaryTypeName",
                          "src": "501:6:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_string_storage_ptr",
                            "typeString": "string"
                          }
                        },
                        "visibility": "internal"
                      }
                    ],
                    "src": "479:43:1"
                  },
                  "returnParameters": {
                    "id": 84,
                    "nodeType": "ParameterList",
                    "parameters": [
                      {
                        "constant": false,
                        "id": 83,
                        "mutability": "mutable",
                        "name": "",
                        "nameLocation": "-1:-1:-1",
                        "nodeType": "VariableDeclaration",
                        "scope": 113,
                        "src": "543:4:1",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        "typeName": {
                          "id": 82,
                          "name": "bool",
                          "nodeType": "ElementaryTypeName",
                          "src": "543:4:1",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "visibility": "internal"
                      }
                    ],
                    "src": "542:6:1"
                  },
                  "scope": 114,
                  "src": "456:303:1",
                  "stateMutability": "view",
                  "virtual": false,
                  "visibility": "public"
                }
              ],
              "scope": 115,
              "src": "57:704:1",
              "usedErrors": []
            }
          ],
          "src": "32:729:1"
        },
        "compiler": {
          "name": "solc",
          "version": "0.8.14+commit.80d49f37.Emscripten.clang"
        },
        "networks": {
          "5777": {
            "events": {},
            "links": {},
            "address": "0x90dd9f95e440A52026e080926dB4c4FF3948b9b3",
            "transactionHash": "0x7805f81a36327e46411f89ad7fab105b6ea929fc48fbc675e1f01f2250610c26"
          }
        },
        "schemaVersion": "3.4.7",
        "updatedAt": "2022-05-29T19:46:31.315Z",
        "networkType": "ethereum",
        "devdoc": {
          "kind": "dev",
          "methods": {},
          "version": 1
        },
        "userdoc": {
          "kind": "user",
          "methods": {},
          "version": 1
        }
      };
}