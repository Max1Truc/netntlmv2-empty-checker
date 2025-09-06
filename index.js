const fs = require("fs");
const { isPasswordCorrect } = require("./netntlmv2");

function printHelp() {
	console.log(`Usage: netntlmv2-empty-checker [options] hashfile
Options:
  -h, --help         Show this help message and exit
  -o <file>          Output to file instead of stdout
  --full             Print full hash lines instead of only usernames
  -p, --password <pw>  Test this password instead of empty string

Use "-" as hashfile to read from stdin.
Use "./-" if you really want to read a file named "-".`);
}

let args = process.argv.slice(2);
let inputFile = "";
let outputFile = null;
let outputFull = false;
let passwordToTry = "";

while (args.length) {
	let arg = args.shift();
	if (arg === "-h" || arg === "--help") {
		printHelp();
		process.exit(0);
	} else if (arg === "-o") {
		outputFile = args.shift();
	} else if (arg === "--full") {
		outputFull = true;
	} else if (arg === "-p" || arg === "--password") {
		passwordToTry = args.shift() || "";
	} else if (!inputFile) {
		inputFile = arg;
	} else {
		printHelp();
		process.exit(1);
	}
}

if (!inputFile) {
	printHelp();
	process.exit(1);
}

function readInput(callback) {
	if (inputFile === "-") {
		let data = "";
		process.stdin.on("data", (chunk) => (data += chunk));
		process.stdin.on("end", () => callback(data));
	} else {
		fs.readFile(inputFile, "utf8", (err, data) => {
			if (err) {
				console.error("Error reading input file:", err.message);
				process.exit(1);
			}
			callback(data);
		});
	}
}

readInput((data) => {
	const splitted = data.split(/\r\n|\n/g);
	const results = [];
	for (let part of splitted) {
		try {
		if (isPasswordCorrect(part, passwordToTry)) {
			results.push(outputFull ? part : part.split(":")[0]);
		}
		}catch (e){
			if (e.code == "ERR_OSSL_EVP_UNSUPPORTED"){
				console.error("NetNTLMv2 needs MD4, which is an unsecure legacy algorithm.");
				console.error("Please enable legacy algorithms by running the following command, and then retrying.");
				console.error(" $ export NODE_OPTIONS=--openssl-legacy-provider");
				process.exit(1);
			}
		}
	}
	const output = results.join("\n");
	if (outputFile) {
		fs.writeFileSync(outputFile, output + "\n");
	} else {
		console.log(output);
	}
});
