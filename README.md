# NetNTLMv2 Empty Hash Checker (MIT License)

This tool was originally created because hashcat does not permit to crack empty hashes.

I hope you'll make great things with it !

### Usage

Currently, running `index.js` with NodeJS will read a file named `hashes.txt` in the current folder, looking up for hashes formatted in the [Responder](https://github.com/lgandx/Responder) way.

An example `hashes.txt` file is provided in this repository which represents a `totovoid` account with an empty password.

### Contributing

All contributions are welcome !

As I haven't got much time to develop this tool, feel free to open an issue or create a Pull Request with new features...

## Thanks

 - Thanks to felipee07 for his (or her) [repository](https://github.com/felipee07/netNTLMv2) providing a Python implementation of some parts of the NetNTLMv2 algorithm
 - Thanks to the [davenport unofficial documentation](http://davenport.sourceforge.net/ntlm.html) on NTLM, NTLMv2 and NetNTLMv2
 
