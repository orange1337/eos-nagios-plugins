/*
* Created by github@orange1337
*/

const colors    = require("colors");
const pkg 	    = require("../package.json");
const http 	    = require("http");
const https 	= require("https");
const eosjs 	= require("eosjs");

const contract = "watchdoggiee";

let configEOS = {
  chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906", // jungle 038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca
  httpEndpoint: "https://bp.cryptolions.io", // jungle http://jungle.cryptolions.io:18888
  keyProvider: "",
  expireInSeconds: 10,
  broadcast: true,
  debug: false,
  sign: true
};
let customFunctions = {};

process.on('uncaughtException', (err) => {
    console.error(`======= UncaughtException:  ${err}`);
});

customFunctions.check_eos_watchdoggiee = (options, callback) => {
    let request = (options.url.indexOf("https") >= 0) ? https : http;
    let slash = options.url[options.url.length - 1];
    let url = (slash !== "/") ? options.url : options.url.slice(0, options.url.length - 1);

    let timeStart = +new Date();

	configEOS.httpEndpoint = url || configEOS.httpEndpoint; 
	configEOS.chainId = options.chain || configEOS.chainId;  
	configEOS.keyProvider = options.keyProvider;

	let eos = new eosjs(configEOS);

	eos.contract(contract).then(myaccount => {
		myaccount.setkv(options.account, options.key, +new Date(), 
						{ authorization: `${options.account}@watchdog`,
						  broadcast: true,
  						  sign: true
  						}, 
  					(err, result) => {
						if (err){
							return callback(err);
						}
						//console.log(result);
						let timeMAX = +new Date() + options.time * 1000;
						checkReqTime(timeMAX, callback);	
			});
	});

	function checkReqTime(timeMAX, callback){
	   	eos.getTableRows({
			      json: true,
			      code: contract,
			      scope: options.account,
			      table: "kvs",
			      table_key: "string",
			      lower_bound: "0",
			      upper_bound: "-1",
			      limit: 100
			})
	   	 	.then(result => {
	   	 		if (result && result.rows){
	   	 			let diff = null;
	   	 			let date = +new Date();
	   	 			result.rows.forEach(elem => {
	   	 					if (`${elem.key}` === options.key){
	   	 						diff = (Number(elem.val) - +new Date(elem.ts)) / 1000;
	   	 					}
	   	 			});
	   	 			if (diff){
	   	 				return callback(null, `REQTIME OK - ${diff} s difference|time_diff=${diff}\n`.cyan);
	   	 			}
	   	 			if (!diff && timeMAX < date){
	   	 				return callback(`REQTIME CRYTICAL >${options.time} difference|time_diff > ${options.time}\n`.red);
	   	 			}
	   	 			checkReqTime(eos, options, timeStart, callback);
	   	 		} else {
	   	 			console.error('Result get Error');
	   	 			checkReqTime(eos, options, timeStart, callback);
	   	 		}
	   	 	})
	   	 	.catch(err => {
	   	 		  console.error(err);
	   	 		  checkReqTime(eos, options, timeStart, callback);
	   	 	});	
	}
};

module.exports = customFunctions;




