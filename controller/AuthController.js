const {UsersModel } = require("../models/UsersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {ForgottenPasswordsModel} = require("../models/ForgottenPasswords");
const {authenticateJWT} = require("../middlewares/jwtAuth");

require('dotenv').config();
const nodemailer = require('nodemailer');

function generateRandomNumber() {
    const min = 10000;
    const max = 99999;
    return Math.floor((Math.random() + Date.now() % 1) * (max - min + 1)) + min;
}

const {JWTSecret, refreshTokenSecret} = process.env;

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

class AuthController {
    static registerView = (req, res, next) => {
        try {
            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true });
            }
            if (req.cookies['token'] && req.cookies['refreshToken']){
                return res.redirect('/')
            }
            return res.render(locale === 'en' ? 'en/auth/register' : 'ru/auth/register');
        } catch (e) {
            next(e)
        }
    }

    static registerNewUser = async (req, res, next) => {
        try {
            const {name, email, password} = req.body;
            const {ip} = req.params;

            // const data = JSON.parse(decodeURIComponent(userData));

            const hashPassword = bcrypt.hashSync(password, 8)

            const newUser = await new UsersModel({
                name,
                email,
                password: hashPassword,
                confirmPassword: hashPassword,
                banned: [{ banType: false }],
                locale: 'en',
                ip: ip,
                // userData: data
            })

            await newUser.save();
            return res.json({href: "/auth/login", message: "Успешная регистрация!"});
        } catch (err) {
            console.error(err);
            next(err);
        }
    }


    static loginView = (req, res, next) => {
        try {
            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true });
            }
            if (req.cookies['token'] && req.cookies['refreshToken']){
                return res.redirect('/')
            }
            return res.render(locale === 'en' ? 'en/auth/login' : 'ru/auth/login');
        } catch (e) {
            next(e)
        }
    }

    static loginUser = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const {ip} = req.params;
            const user = await UsersModel.findOne({ email });

            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000 });
            }

            if (!user) {
                return res.status(401).json({ error: "Неверный адрес или пароль." });
            }

            const pass = await bcrypt.compare(password, user.password);

            if (!pass) {
                return res.status(401).json({ error: "Неверный адрес или пароль." });
            }

            const payload = {
                id: user._id,
                email: user.email,
                name: user.name,
                reviews: user.reviews,
                registerDate: user.registerDate,
                role: user.role,
                banned: user.banned,
                locale: user.locale,
                favorites: user.favorites,
                ip: user.ip
            };

            const accessToken = jwt.sign(payload, JWTSecret, { expiresIn: '15m' });
            const refreshToken = jwt.sign(payload, refreshTokenSecret, { expiresIn: '10d' });

            user.refreshToken = refreshToken;
            await user.save();

            const id = user._id;

            await UsersModel.findByIdAndUpdate(
                id,
                { $set: { ip: ip } },
                { new: true }
            );

            res.cookie('token', accessToken, { httpOnly: true, secure: true, maxAge: parseMaxAge('15m') });
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, maxAge: parseMaxAge('10d') });
            res.cookie('acceptCookies', true, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000 });

            return res.json({ token: accessToken, refreshToken, user, locale });
        } catch (e) {
            next(e);
        }
    }


    static changePassword = async (req, res, next) => {
        try {
            const { id } = req.user;
            const { oldPassword, password, confirmPassword } = req.body;

            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true });
            }

            const user = await UsersModel.findById(id);

            const pass = await bcrypt.compare(oldPassword, user.password);

            if (!pass) {
                const errorMsg = locale === 'en' ? 'The old password is incorrect.' : 'Неверный старый пароль.';
                return res.redirect(`/error?message=${encodeURIComponent(errorMsg)}`);
            }

            if (!password || !confirmPassword) {
                const errorMsg = locale === 'en' ? 'Password and password confirmation are required.\n' : 'Пароль и подтверджение пароля обязательны.';
                return res.redirect(`/error?message=${encodeURIComponent(errorMsg)}`);
            }

            if (password !== confirmPassword) {
                const errorMsg = locale === 'en' ? 'The passwords do not match.' : 'Пароли не совпадают.';
                return res.redirect(`/error?message=${encodeURIComponent(errorMsg)}`);
            }

            if (password.length < 6 || password.length > 50) {
                const errorMsg = locale === 'en' ? 'The password must contain a minimum of 6 characters and a maximum of 50 characters.\n' : 'Пароль должен содержать минимум 6 символов и максимум 50 символов.';
                return res.redirect(`/error?message=${encodeURIComponent(errorMsg)}`);
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const updatePassword = await UsersModel.findByIdAndUpdate(
                id,
                { password: hashedPassword },
                { new: true }
            );

            if (!updatePassword) {
                const errorMsg = locale === 'en' ? 'User not found.' : 'Пользователь не найден.';
                return res.redirect(`/error?message=${encodeURIComponent(errorMsg)}`);
            }

            res.redirect('/PersonalArea');
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    static sessionExpiredView = async (req, res, next) => {
        try{
            let locale = req.cookies['locale'] || 'en';
            const token = req.cookies['token'];
            const refreshToken = req.cookies['refreshToken'];
            const clearSession = req.cookies['clearSession'];

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            if (token || refreshToken){
                return res.redirect('/');
            }

            if (req.cookies['token']) {
                await authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned')
                    }
                    else{
                        return res.render(locale === 'en' ? 'en/auth/sessionExpired' : 'ru/auth/sessionExpired', { user, locale, clearSession });
                    }
                });
            }
            else {
                return res.render(locale === 'en' ? 'en/auth/sessionExpired' : 'ru/auth/sessionExpired', { locale, clearSession });
            }
        }catch (err){
            next(err)
        }
    };


    static forgetPasswordView = async (req, res, next) => {
        try {
            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true });
            }
            if (req.cookies['token'] && req.cookies['refreshToken']){
                return res.redirect('/')
            }
            return res.render(locale === 'en' ? 'en/auth/forget-password' : 'ru/auth/forget-password');
        } catch (e) {
            next(e)
        }
    }

    static sendEmail = async (req, res, next) => {
        try {
            const {email} = req.body;
            // const {ip} = req.cookies['ip'];
            const {ip} = req.params;

            const checkEmail = await UsersModel.findOne({email});
            const checkIp = await ForgottenPasswordsModel.findOne({ip});

            const randomNumber = generateRandomNumber().toString();

            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            if (!checkEmail){
                const msg = locale === 'en' ? 'The entered address was not found.' : 'Введённый адрес не найден.';
                return res.redirect(`/error?message=${encodeURIComponent(msg)}`);
            }

            if (checkIp && checkIp.ip === ip){
                const msg = locale === 'en' ? 'You have already sent a verification code. Please try again later.' : 'Вы уже отправили код подтверждения. Повтроите попытку позже.';
                return res.redirect(`/error?message=${encodeURIComponent(msg)}`);
            }
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASS
                }
            })

            const mainOptions = {
                from: process.env.USER,
                to: email,
                subject: locale === 'en' ? 'Your HFFreelancers Account: Access from a New Browser.' : 'Ваш аккаунт HFFreelancers: Доступ из нового браузера',
                text: locale === 'en' ? `It looks like you're trying to sign in from a new device. You'll need a verification code to do this: ${randomNumber}` : `Похоже, вы пытаетесь войти в аккаунт с нового устройства. Для этого вам понадобится код подтверждения: ${randomNumber}`
            }

            transporter.sendMail(mainOptions, (error, info) => {
                if (error) {
                    return console.log('Ошибка при отправке письма:', error);
                }
                console.log('Письмо отправлено:', info.response);
                const emailCode = new ForgottenPasswordsModel({
                    email: email,
                    code: randomNumber,
                    ip: ip,
                    expiresInMinutes: '10'
                })
                emailCode.save();
                res.cookie('email', email, { httpOnly: true, maxAge: 600000 })

                return res.redirect('/auth/account-recovery');
            });

        }catch (err){
            next(err);
        }
    }

    static accountRecoveryView = async (req, res, next) => {
        try {
            let locale = req.cookies['locale'] || 'en';

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true });
            }
            if (req.cookies['token'] && req.cookies['refreshToken'] || !req.cookies['email']){
                return res.redirect('/')
            }
            return res.render(locale === 'en' ? 'en/auth/account-recovery' : 'ru/auth/account-recovery');
        } catch (e) {
            next(e)
        }
    }

    static accountRecovery = async (req, res, next) => {
        try {
            const {code, password, confirmPassword} = req.body;
            const email = req.cookies['email'];

            const user = await ForgottenPasswordsModel.findOne({email});
            if (!user) {
                return res.redirect(`/error?message=${encodeURIComponent('Пользователь не найден.')}`);
            }

            if (user.code !== code) {
                return res.redirect(`/error?message=${encodeURIComponent('Коды не совпадают.')}`);
            }

            if (password !== confirmPassword) {
                return res.redirect(`/error?message=${encodeURIComponent('Пароли не совпадают.')}`);
            }

            const emailId = await UsersModel.findOne({ email });
            if (!emailId) {
                return res.redirect(`/error?message=${encodeURIComponent('Пользователь не найден.')}`);
            }

            const idS = emailId._id.toString();

            const hashedPassword = await bcrypt.hash(password, 10);

            const updatePassword = await UsersModel.findByIdAndUpdate(
                idS,
                { password: hashedPassword },
                { new: true }
            );
            res.clearCookie('email');
            updatePassword.save();
            return res.redirect('/auth/login')
        } catch (e) {
            next(e)
        }
    }


    static logout = async (req, res, next)=> {
        try {
            const id = req.user.id;
            await UsersModel.findByIdAndUpdate(id, {
                refreshToken: '',
            })
            req.cookies.user = null;
            res.clearCookie('token');
            res.clearCookie('refreshToken');
            res.clearCookie('accessTokenEndTime');
            res.clearCookie('refreshTokenEndTime');
            return res.json({status: "Успешный выход!"});
        }catch (err){
            next(err)
        }
    }

}

module.exports = AuthController;