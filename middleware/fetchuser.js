const jwt = require('jsonwebtoken');

const JWT_SECRET = "$$$thisismyseckey$$$"



// get user from the jwt token and add id to req object
const fetchuser = (roles) => (req, res, next) => {
    const token = req.body.authToken
    if (!token) {
        res.send({ error: "Please authenticate using a valid token" })
    }

    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        if (roles.indexOf(data.user.role) >= 0) {
            next()
        } else {
            res.status(401).send({ message: "unauthorized" });

        }




    } catch (error) {
        res.send({ error: "Please authenticate using a valid token" })

    }

}

module.exports = fetchuser;

