const jwt = require("jsonwebtoken");
const { UsersModel } = require("../models/UsersModel");
const { JWTSecret, refreshTokenSecret } = process.env;

function parseMaxAge(duration) {
    const unit = duration.slice(-1);
    const amount = parseInt(duration.slice(0, -1), 10);

    switch (unit) {
        case 's': return amount * 1000;
        case 'm': return amount * 60 * 1000;
        case 'h': return amount * 60 * 60 * 1000;
        case 'd': return amount * 24 * 60 * 60 * 1000;
        default: throw new Error('Выбраное время не найдено');
    }
}

async function accessToken(req, res, next) {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.sendStatus(401);
        }

        jwt.verify(refreshToken, refreshTokenSecret, async (err, decoded) => {
            if (err) {
                console.log(err)
                return res.sendStatus(403);
            }

            const user = await UsersModel.findById(decoded.id);
            if (!user) {
                return res.sendStatus(403);
            }

            const newAccessToken = jwt.sign({
                id: user._id,
                email: user.email,
                name: user.name,
                registerDate: user.registerDate,
                role: user.role,
                banned: user.banned,
                favorites: user.favorites,
                ip: user.ip,
            }, JWTSecret, { expiresIn: '15m' });

            await res.cookie('token', newAccessToken, { httpOnly: true, secure: true, maxAge: parseMaxAge('15m') });

            return res.json({ token: newAccessToken });
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { accessToken };