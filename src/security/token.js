const jwt = require("jsonwebtoken")

module.exports = {

    generateAccessToken: (authCredential) => {
        return jwt.sign({
            ...authCredential, exp: Math.floor(Date.now() / 1000) + (60 * 60)
        }, process.env.JWT_SECRET)
    },

    isValidAccessToken: (accessToken) => {
        try {
            return jwt.verify(accessToken, process.env.JWT_SECRET);
        } catch (error) {
            return false;
        }
    }

}