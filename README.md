# Nagios js plugins for EOS blockchain

## Installation

```
## Install nodejs https://nodejs.org/en/download/ (Latest LTS Version: 10.13.0 (includes npm 6.4.1))
npm i -g check-eos-watchdoggiee

```

## Usage (CLI)

Check watchdoggiee:

```
watchdoggiee --url http://api.eostribe.io
BLOCKTIME OK - 0.440752s difference|time_diff=0.440752
```

```

## Usage as (LIB)
```
var nagios = require("eos-nagios-js");

// example for check_nodeos_block_time function 
nagios.check_nodeos_block_time({ 
			url: "http://api.eostribe.io",
			warn: 2, // in sec,
			crit: 10, // in sec,
	}, (err, result) => {
	    console.log(err, result);
});

```

## Copyright and License

Copyright 2018 orange13371@gmail.com
