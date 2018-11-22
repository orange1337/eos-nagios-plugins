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
  .option('-u, --url [message]', 'Set url of API endpoint')
  .parse(process.argv);

if (program.url){
	  watchdoggiee.check_eos_watchdoggiee({
      	url: program.url
    }, (err, result) => {
    	if (err){
    		return console.error(err);
    	}
    	console.log(result);
    });
}