const jwt = require('jsonwebtoken');

const authMiddleWare = (req, res) => {
    jwt.verify(token, 'shhhhh', function(err, decoded)
    {
        console.log(decoded.foo)
    });
}

module.exports = {
    authMiddleWare
}