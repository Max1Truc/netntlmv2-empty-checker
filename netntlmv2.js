const crypto = require("crypto");

function toUTF16LE(msg) {
	// https://www.howtobuildsoftware.com/index.php/how-do/cccl/javascript-php-encoding-utf-8-utf-16-utf-8-to-utf-16le-javascript
	var byteArray = new Uint8Array(msg.length * 2);
	for (var i = 0; i < msg.length; i++) {
		byteArray[i * 2] = msg.charCodeAt(i); // & 0xff;
		byteArray[i * 2 + 1] = msg.charCodeAt(i) >> 8; // & 0xff;
	}
	return byteArray;
}

function ntlm(msg) {
	let hash = crypto.createHash("md4");
	hash.update(toUTF16LE(msg));
	return hash.digest("hex");
}

function hmac_md5(password, msg) {
	let hash = crypto.createHmac("md5", password);
	hash.update(msg);
	return hash.digest("hex");
}

function ntlmv2(password, user, domain) {
	return hmac_md5(
		Buffer.from(ntlm(password), "hex"),
		toUTF16LE(user.toUpperCase() + domain),
	);
}

function netntlmv2(password, user, domain, proofStr, blob) {
	var ntlmv2_buffer = Buffer.from(ntlmv2(password, user, domain), "hex");
	var blockToHmac = Buffer.from(proofStr + blob, "hex");
	var hashedBlock = hmac_md5(ntlmv2_buffer, blockToHmac);
	return hashedBlock;
}

function isPasswordCorrect(formattedHash, passwordToTry) {
	let splitted = formattedHash.split(":");
	let generatedHash = "";

	if (splitted.length < 6) return false;

	let user = splitted[0],
		domain = splitted[2],
		challenge = splitted[3],
		targetHash = splitted[4],
		blob = splitted[5];

	if (targetHash.length == 32)
		generatedHash = netntlmv2(passwordToTry, user, domain, challenge, blob);

	// TODO: Support NetNTLMv1 (See "http://davenport.sourceforge.net/ntlm.html#theNtlmResponse")

	return generatedHash.toUpperCase() === targetHash.toUpperCase();
}

module.exports = { netntlmv2, isPasswordCorrect };
