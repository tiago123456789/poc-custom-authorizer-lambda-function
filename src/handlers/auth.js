'use strict';

const jwt = require("../security/token")
const userMock = require("../mocks/user")

module.exports.authenticate = async (event) => {
    const authCredential = JSON.parse(event.body)

    if (
        authCredential.username != userMock.username
        || authCredential.password != userMock.password
    ) {
        return {
            statusCode: 401,
            body: JSON.stringify({
                message: "Credentials invalid"
            })
        }
    }

    delete authCredential.password
    const accessToken = jwt.generateAccessToken(authCredential)
    return {
        statusCode: 200,
        body: JSON.stringify({ accessToken })
    }
}

module.exports.hasAuthorized = async (event, context, callback) => {
    if (!event.authorizationToken) {
        return callback('Unauthorized');
    }

    event.authorizationToken = event.authorizationToken.replace("Bearer ", "")
    const decoded = jwt.isValidAccessToken(event.authorizationToken)
    if (!decoded) {
        return callback('Forbidden', callback(null, generatePolicy("Deny")));
    }

    return callback(null, generatePolicy("Allow"))
}

const generatePolicy = (effect) =>  {
    return {
        "principalId": "user",
        "policyDocument": {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Action": "execute-api:Invoke",
                    "Effect": effect || "Deny",
                    "Resource": "*"
                }
            ]
        }
    }
}




