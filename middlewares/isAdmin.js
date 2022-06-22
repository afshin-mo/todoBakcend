module.exports = ( req, res, next ) => {
    if( !req.body.isAdmin ){
        res.status(403).send('Access Denied!');
    }
    next();
}