App = {
    web3Provider: null,
    contracts: {},

    init: async function () {

        return await App.initWeb3();
    },

    initWeb3: async function () {
        // Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            console.log('1')
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        } else if (window.web3) {
            console.log('2')
            App.web3Provider = window.web3.currentProvider;
        } else {
            console.log('3')
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }

        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },

    initContract: function () {
        console.log('work')
        $.getJSON('app/Blockchain/build/contracts/SRTSignature.json',function(data){
        
            console.log('get json success')
            
            var SRTSignatureArtifact = data
            
            App.contracts.SRTSignature = TruffleContract(SRTSignatureArtifact);

            // Set the provider for SRTSignature contract
            App.contracts.SRTSignature.setProvider(App.web3Provider);

            // Not implemented yet
            return App.markSigned();
        })

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

            return srtSignatureInstance.pushDocument(docId, signature, { from: web3.eth.accounts[0] });
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