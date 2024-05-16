import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

// const authMiddleWare = (req, res, next) => {
//     const token = req.headers.token.split(' ')[1]
//     jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
//         if (err) {
//             return res.status(404).json({
//                 message: 'The authemtication',
//                 status: 'ERROR'
//             })
//         }
//         if (user?.isAdmin) {
//             next()
//         } else {
//             return res.status(404).json({
//                 message: 'The authemtication',
//                 status: 'ERROR'
//             })
//         }
//     });
// }

export function authMiddleWare(req, res, next) {
    if (req.headers.authorization) {
        var tokenParts = req.headers.authorization.split(' ');
        if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
            var token = tokenParts[1];
            next();
        } else {
            return res.status(401).json({ error: "Invalid Authorization header format" });
        }
    } else {
        next(); 
    }
}

export const authUserMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    const userId = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
        if (user?.isAdmin || user?.id === userId) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
    });
}

export default {
    authMiddleWare,
    authUserMiddleWare
}