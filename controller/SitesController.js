const {LinksModel} = require("../models/LinksModel");
const {WebsitesModel} = require("../models/WebSitesModel");
const {AdvertisingModel} = require('../models/AdvertisingModel');
const {authenticateJWT} = require('../middlewares/jwtAuth');
class SitesController {
    static readyMadeSitesView = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const skip = (page - 1) * limit;

            let locale = req.cookies['locale'] || 'en';
            let acceptCookies = req.cookies['acceptCookies'];

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, {httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000});
            }

            const totalWebsites = await WebsitesModel.countDocuments();
            const links = await LinksModel.find();
            const websites = await WebsitesModel.find().skip(skip).limit(limit)
            const advertising = await AdvertisingModel.aggregate([
                {
                    $match: {
                        locale: locale
                    }
                }
            ])

            const renderData = {
                links,
                acceptCookies,
                websites,
                advertising,
                currentPage: page,
                totalPages: Math.ceil(totalWebsites / limit)
            };

            if (req.cookies['token']) {
                await authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned')
                    } else {
                        return res.render(locale === 'en' ? 'en/readyMadeSites' : 'ru/readyMadeSites', {
                            user,
                            ...renderData
                        });
                    }
                });
            } else {
                return res.render(locale === 'en' ? 'en/readyMadeSites' : 'ru/readyMadeSites', {
                    ...renderData
                });
            }
        } catch (err) {
            next(err)
        }
    }


    static htmlSitesView = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const skip = (page - 1) * limit;

            let locale = req.cookies['locale'] || 'en';
            let acceptCookies = req.cookies['acceptCookies'];

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            const totalWebsites = await WebsitesModel.countDocuments({
                $or: [
                    { siteType: 'html-css' },
                    { siteType: 'html-css-javascript' }
                ]
            });

            const links = await LinksModel.find();
            const websites = await WebsitesModel.aggregate([
                {
                    $match: {
                        $or: [
                            { siteType: 'html-css' },
                            { siteType: 'html-css-javascript' }
                        ]
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            ]);

            const advertising = await AdvertisingModel.aggregate([
                {
                    $match: {
                        locale: locale
                    }
                }
            ])

            const renderData = {
                links,
                acceptCookies,
                websites,
                advertising,
                currentPage: page,
                totalPages: Math.ceil(totalWebsites / limit)
            }

            if (req.cookies['token']) {
                await authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned')
                    }
                    else{
                        return res.render(locale === 'en' ? 'en/html-css-js' : 'ru/html-css-js', {
                            user,
                            ...renderData
                        });
                    }
                });
            }
            else {
                return res.render(locale === 'en' ? 'en/html-css-js' : 'ru/html-css-js', {
                    ...renderData
                });
            }
        } catch (err) {
            next(err);
        }
    }


    static javascriptSitesView = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const skip = (page - 1) * limit;

            let locale = req.cookies['locale'] || 'en';
            let acceptCookies = req.cookies['acceptCookies'];

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            const totalWebsites = await WebsitesModel.countDocuments({
                    siteType: 'javascript'
            });

            const links = await LinksModel.find();
            const websites = await WebsitesModel.aggregate([
                {
                    $match: {
                        siteType: 'javascript'
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            ]);

            const advertising = await AdvertisingModel.aggregate([
                {
                    $match: {
                        locale: locale
                    }
                }
            ])

            const renderData = {
                links,
                acceptCookies,
                websites,
                advertising,
                currentPage: page,
                totalPages: Math.ceil(totalWebsites / limit)
            }

            if (req.cookies['token']) {
                await authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned')
                    }
                    else{
                        return res.render(locale === 'en' ? 'en/javascript' : 'ru/javascript', {
                            user,
                            ...renderData
                        });
                    }
                });
            }
            else {
                return res.render(locale === 'en' ? 'en/javascript' : 'ru/javascript', {
                    ...renderData
                });
            }
        } catch (err) {
            next(err);
        }
    }


    static nodeJsSitesView = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const skip = (page - 1) * limit;

            let locale = req.cookies['locale'] || 'en';
            let acceptCookies = req.cookies['acceptCookies'];

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            const totalWebsites = await WebsitesModel.countDocuments({
                siteType: 'nodeJs'
            });

            const links = await LinksModel.find();
            const websites = await WebsitesModel.aggregate([
                {
                    $match: {
                        siteType: 'nodeJs'
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            ]);

            const advertising = await AdvertisingModel.aggregate([
                {
                    $match: {
                        locale: locale
                    }
                }
            ])

            const renderData = {
                links,
                acceptCookies,
                websites,
                advertising,
                currentPage: page,
                totalPages: Math.ceil(totalWebsites / limit)
            }

            if (req.cookies['token']) {
                await authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned')
                    }
                    else{
                        return res.render(locale === 'en' ? 'en/nodeJs' : 'ru/nodeJs', {
                            user,
                            ...renderData
                        });
                    }
                });
            }
            else {
                return res.render(locale === 'en' ? 'en/nodeJs' : 'ru/nodeJs', {
                    ...renderData
                });
            }
        } catch (err) {
            next(err);
        }
    }


    static reactJsSitesView = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const skip = (page - 1) * limit;

            let locale = req.cookies['locale'] || 'en';
            let acceptCookies = req.cookies['acceptCookies'];

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            const totalWebsites = await WebsitesModel.countDocuments({
                siteType: 'reactJs'
            });

            const links = await LinksModel.find();
            const websites = await WebsitesModel.aggregate([
                {
                    $match: {
                        siteType: 'reactJs'
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            ]);

            const advertising = await AdvertisingModel.aggregate([
                {
                    $match: {
                        locale: locale
                    }
                }
            ])

            const renderData = {
                links,
                acceptCookies,
                websites,
                advertising,
                currentPage: page,
                totalPages: Math.ceil(totalWebsites / limit)
            }

            if (req.cookies['token']) {
                await authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned')
                    }
                    else{
                        return res.render(locale === 'en' ? 'en/reactJs' : 'ru/reactJs', {
                            user,
                            ...renderData
                        });
                    }
                });
            }
            else {
                return res.render(locale === 'en' ? 'en/reactJs' : 'ru/reactJs', {
                    ...renderData
                });
            }
        } catch (err) {
            next(err);
        }
    }


    static fullstackSitesView = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const skip = (page - 1) * limit;

            let locale = req.cookies['locale'] || 'en';
            let acceptCookies = req.cookies['acceptCookies'];

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            const totalWebsites = await WebsitesModel.countDocuments({
                siteType: 'fullstack'
            });

            const links = await LinksModel.find();
            const websites = await WebsitesModel.aggregate([
                {
                    $match: {
                        siteType: 'fullstack'
                    }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            ]);

            const advertising = await AdvertisingModel.aggregate([
                {
                    $match: {
                        locale: locale
                    }
                }
            ])

            const renderData = {
                links,
                acceptCookies,
                websites,
                advertising,
                currentPage: page,
                totalPages: Math.ceil(totalWebsites / limit)
            }

            if (req.cookies['token']) {
                await authenticateJWT(req, res, () => {
                    const user = req.user;
                    if (user.banned[0].banType === true) {
                        res.redirect('/youAreBanned')
                    }
                    else{
                        return res.render(locale === 'en' ? 'en/fullstack' : 'ru/fullstack', {
                            user,
                            ...renderData
                        });
                    }
                });
            }
            else {
                return res.render(locale === 'en' ? 'en/fullstack' : 'ru/fullstack', {
                    ...renderData
                });
            }
        } catch (err) {
            next(err);
        }
    }


    static favoritesView = async (req, res, next) => {
        try {
            const links = await LinksModel.find();
            const advertising = await AdvertisingModel.find()
            const user = req.user;

            const favoriteIds = user.favorites.map(favorite => favorite.favId);

            const favorites = await WebsitesModel.find({ _id: { $in: favoriteIds } });

            let locale = req.cookies['locale'] || 'en';
            let acceptCookies = req.cookies['acceptCookies'];

            if (!req.cookies['locale']) {
                res.cookie('locale', locale, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000  });
            }

            const renderData = {
                links,
                advertising,
                favorites,
                acceptCookies
            }

            if (user.banned[0].banType === true) {
                res.redirect('/youAreBanned')
            }
            return res.render(locale === 'en' ? 'en/favorites' : 'ru/favorites', {user, ...renderData});
        }catch (err){
            next(err)
        }
    }
}

module.exports = SitesController;