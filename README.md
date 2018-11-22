# Nagios js plugins for EOS blockchain

## Installation

```
## Install nodejs https://nodejs.org/en/download/ (Latest LTS Version: 10.13.0 (includes npm 6.4.1))
npm i -g eos-nagios-js

```

## Usage (CLI)

Check how much nodeos is delaying behind current time:

```
nagios --method check_nodeos_block_time --url http://api.eostribe.io --warn 2 --crit 10
BLOCKTIME OK - 0.440752s difference|time_diff=0.440752
```

Check nodeos shared memory usage:

```
nagios --method check_nodeos_db_size --url http://127.0.0.1:8888 --warn 2 --crit 10
EOS_DB OK - 8.86% used|percent_used=8.86 bytes_used=3042721344
```

Light API sync status (https://github.com/cc32d9/eos_zmq_light_api)

```
nagios --method check_lightapi_sync --url http://127.0.0.1 --warn 2 --crit 10
LIGHTAPI_SYNC CRITICAL - 46068s delay|delay=46068
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
