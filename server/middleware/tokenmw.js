const { verifyToken } = require('../config/jwt');


const middleware = (req, res, next) => {
    const header = req.headers.authorization;

    if(!header || !header.startsWith('Bearer'))
    {
        return res.status(401).json({msg: 'No Token Provided'});
    }

    try{
        const token = header.split(' ')[1];
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token', details: error.message });
}

};

module.exports = middleware;