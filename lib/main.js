#!/usr/bin/env node

/*
* Created by github@orange1337
*/

const program       = require('commander');
const pkg 	        = require("../package.json");
const colors 	      = require("colors");
const watchdoggiee 	= require("./watchdoggiee");

program
  .version(pkg.version, '-v, --version')
  .option('-p, --key-provider [message]', 'Set keyProvider for eosjs')
  .option('-k, --key [message]', 'Set key for contract data')
  .option('-u, --url [message]', 'Set httpEndpoint for eosjs')
  .option('-a, --account [message]', 'Set account name for eosjs contract execution')
  .option('-u, --url [message]', 'Set httpEndpoint for eosjs')
  .option('-c, --chain [message]', 'Set chainId for eosjs')
  .option('-t, --time [message]', 'Set MAX time for request')
  .parse(process.argv);

if (program.account && program.keyProvider && program.key && program.time){
	  watchdoggiee.check_eos_watchdoggiee({
        url: program.url,
        chain: program.chain,
        key: program.key,
        keyProvider: program.keyProvider,
        account: program.account,
      	time: program.time
    }, (err, result) => {
    	if (err){
    		return console.error(err);
    	}
    	console.log(result);
    });
} else {
  console.error("Please check your command line flags!".yellow);
}