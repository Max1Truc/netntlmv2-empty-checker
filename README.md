# NetNTLMv2 Empty Hash Checker (MIT License)

This tool was originally created because hashcat does not permit to crack empty hashes.

I hope it will be useful to you !

### Usage

This tool only processes hashes in the [Responder](https://github.com/lgandx/Responder) format.
An example `hashes.txt` file is provided in this repository which represents a `totovoid` account with an empty password.

```
$ node index.js --help

Usage: netntlmv2-empty-checker [options] hashfile
Options:
  -h, --help         Show this help message and exit
  -o <file>          Output to file instead of stdout
  --full             Print full hash lines instead of only usernames
  -p, --password <pw>  Test this password instead of empty string

Use "-" as hashfile to read from stdin.
Use "./-" if you really want to read a file named "-".

$ node --openssl-legacy-provider index.js hashes.txt
totovoid
```

### Contributing

All contributions are welcome !

As I haven't got much time to develop this tool, feel free to open an issue or create a Pull Request with new features...

## Thanks

 - Thanks to felipee07 for their [repository](https://github.com/felipee07/netNTLMv2) providing a Python implementation of some parts of the NetNTLMv2 algorithm
 - Thanks to the [davenport unofficial documentation](http://davenport.sourceforge.net/ntlm.html) on NTLM, NTLMv2 and NetNTLMv2
 
