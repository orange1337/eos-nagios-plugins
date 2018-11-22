#!/usr/bin/env node

/*
* Created by github@orange1337
*/

const program   = require('commander');
const pkg 	    = require("../package.json");
const colors 	= require("colors");
const nagios 	= require("./nagios");

program
  .version(pkg.version, '-v, --version')
  .option('-m, --method [message]', 'Set one of methods (check_nodeos_block_time, check_nodeos_db_size, check_lightapi_sync)')
  .option('-u, --url [message]', 'Set url of API endpoint')
  .option('-w, --warn [message]', 'Set warn time in sec')
  .option('-c, --crit [message]', 'Set crit time in sec')
  .parse(process.argv);

if (program.method === "check_nodeos_block_time" && program.url){
	nagios.check_nodeos_block_time({
      	url: program.url,
      	warn: program.warn,
      	crit: program.crit
    }, (err, result) => {
    	if (err){
    		return console.error(err);
    	}
    	console.log(result);
    });
}