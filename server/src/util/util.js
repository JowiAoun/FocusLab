function generateTOTP(sessionToken, timestamp){
    var hash = createHash("SHA-256")
    hash.update(`${sessionToken}xx${timestamp}`)
    return hash.digest("utf-8")
}
module.exports = {
    generateTOTP: generateTOTP,
}