const { createHash } = require('node:crypto');
function generateTOTP(sessionToken, timestamp){
    var hash = createHash("sha256")
    hash.update(`${sessionToken}xx${Math.floor(timestamp)}`)
    return hash.digest("hex")
}
module.exports = {
    generateTOTP: generateTOTP,
}