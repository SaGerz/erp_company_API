const authorize = (allowedRole) => {
    return  (req, res, next) => {
        const roleId = req.user.role_id;
        console.log(roleId);
        if(!allowedRole.includes(roleId))
        {
            return res.status(403).json({message: "Akses ditolak : role tidak mempunyai izin"});
        }

        next();
    }
}

module.exports = authorize;