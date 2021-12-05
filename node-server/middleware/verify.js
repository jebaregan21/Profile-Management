const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = require('../config/clientId')
const client = new OAuth2Client(CLIENT_ID);

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userId = payload['sub'];
}

module.exports = verify;