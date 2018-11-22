/*
* Created by github@orange1337
*/

const colors    = require("colors");
const pkg 	    = require("../package.json");
const http 	    = require("http");
const https 	= require("https");

const endpoint = "/v1/chain/get_info";
const defWarn  = 2.0;
const defCrit  = 10.0;

let customFunctions = {};

customFunctions.check_nodeos_block_time = (options, callback) => {
	let warn = Number(options.warn) || defWarn;
	let crit = Number(options.crit) || defCrit;
    let request = (options.url.indexOf("https") >= 0) ? https : http;
    let slash = options.url[options.url.length - 1];
    let url = (slash !== "/") ? options.url : options.url.slice(0, options.url.length - 1);

    let timeStart = +new Date();

    request.get(url + endpoint, (res) => {
	  let data = "";
	
	  res.on("data", (chunk) => {
	   	 data += chunk;
	  });
	
	  res.on("end", () => {
	  	 let parsed = {};
	  	 try{
	  	 	parsed = JSON.parse(data);
	  	 } catch(e){
	  	 	callback(`${e}`.red);
	  	 }
	  	 let diff = (+new Date() - timeStart) / 1000;
	  	 let status = 'OK';
	  	 let color = 'cyan';
		 if( diff > crit ){
		     status = 'CRITICAL';
		     color = 'red';
		 } else if( diff > warn ){
		     status = 'WARNING';
		     color = 'yellow';
		 }
		 let result = `BLOCKTIME ${status} - ${diff}s difference|time_diff=${diff}\n`[color];
	     callback(null, result);
	  });
	}).on("error", (err) => {
	  	 callback(`${err.message}`.red);
	});
};

module.exports = customFunctions;