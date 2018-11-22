# Check watchdoggiee

## Installation

```
## Install nodejs https://nodejs.org/en/download/ (Latest LTS Version: 10.13.0 (includes npm 6.4.1))
npm i -g check-eos-watchdoggiee

```

## Usage (CLI)

```
[Mainnet] watchdoggiee -p [private key] -a [account] -k 111 -t 1.5

[Jungle] watchdoggiee -u http://jungle.cryptolions.io:18888 -p [private key] -a [account] -c 038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca -k 111 -t 1.5
REQTIME OK - 0.440752s difference|time_diff=0.440752
```

## Usage as (LIB)
```
var watchdoggiee = require("check-eos-watchdoggiee");

// example for check_nodeos_block_time function 
	watchdoggiee.check_eos_watchdoggiee({
        url: [url],
        chain: [chain],
        key: [key],
        keyProvider: [keyProvider],
        account: [account],
      	time: [time]
    }, (err, result) => {
    	if (err){
    		return console.error(err);
    	}
    	console.log(result);
    });

```

## Copyright and License

Copyright 2018 orange13371@gmail.com
