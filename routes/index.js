const express = require('express');
const {
    mainView, aboutUsView, rulesView, privacyPolicyView, sendReviewsMenuView, displayAllReviews, deleteUser,
    deleteReview, PersonalAreaView, changeImage, sendReview, getTokenView, moreDetailsView, youAreBannedView,
    requestUnban, downloadFile, fileInfoView, changeLocal, changeLocalAuth, likeSite, dislikeSite, viewSite, sendCommentsPost,
    profileView, changeTheme, manageCookieFiles, sendContacts, deleteContacts, deleteImage, getData
} = require('../controller/IndexController');
const {
    readyMadeSitesView, htmlSitesView, javascriptSitesView, nodeJsSitesView, reactJsSitesView, fullstackSitesView,
    favoritesView
} = require('../controller/SitesController')
const AuthRouter = require('./AuthRouter');
const AdminRouter = require('./admin');
const {changePassword} = require("../controller/AuthController");
const {verifyToken} = require('../middlewares/authorization');
const {authenticateJWT} = require('../middlewares/jwtAuth');
const {accessToken} = require('../middlewares/updateAccessToken');
const {refreshToken} = require('../middlewares/updateRefreshToken');
const router = express.Router();

router.get('/', mainView);

router.get('/aboutUs', aboutUsView);
router.get('/rules', rulesView);
router.get('/privacyPolicy', privacyPolicyView);

router.get('/allReviews', displayAllReviews);

router.get('/accessToken', getTokenView);

router.get('/sendReviews', authenticateJWT, sendReviewsMenuView);

router.get('/PersonalArea', authenticateJWT, PersonalAreaView);

router.get('/moreDetails',  moreDetailsView);

router.get('/youAreBanned', authenticateJWT, youAreBannedView);

router.get('/readyMadeSites', readyMadeSitesView);
router.get('/readyMadeSites/html-css-js', htmlSitesView);
router.get('/readyMadeSites/javascript', javascriptSitesView);
router.get('/readyMadeSites/nodeJs', nodeJsSitesView);
router.get('/readyMadeSites/reactJs', reactJsSitesView);
router.get('/readyMadeSites/fullstack', fullstackSitesView);
router.get('/readyMadeSites/favorites', authenticateJWT, favoritesView);

router.get('/fileInfo/:id', fileInfoView);

router.get('/profile/:id', profileView);

router.post('/sendReviews/:id', authenticateJWT, sendReview);
router.post('/sendCommentsPost/:id', authenticateJWT, sendCommentsPost);
router.post('/upload/:id', authenticateJWT, verifyToken, changeImage);
router.post('/deleteImage/:id', authenticateJWT, verifyToken, deleteImage);
router.post('/deleteAccount/:id', authenticateJWT, deleteUser, accessToken);
router.post('/deleteReview/:id', authenticateJWT, deleteReview);
router.post('/changePassword/:id', authenticateJWT, changePassword);
router.post('/accessToken', accessToken);
router.post('/refreshToken', refreshToken);
router.post('/requestUnban/:id', authenticateJWT, requestUnban);
router.post('/downloadFile/:id', authenticateJWT, downloadFile);
router.post('/changeLocal/:locale', changeLocal);
router.post('/changeLocalAuth/:id/:locale', changeLocalAuth);
router.post('/changeTheme/:theme', changeTheme);
router.post('/likeSite/:id', authenticateJWT, likeSite);
router.post('/dislikeSite/:id', authenticateJWT, dislikeSite);
router.post('/viewSite/:id', viewSite);
router.post('/acceptCookies/:type', manageCookieFiles);
router.post('/sendContacts/:id', sendContacts);
router.post('/deleteContacts/:id', deleteContacts);

router.post('/getData', getData);

router.use('/auth', AuthRouter);
router.use('/admin', AdminRouter);

module.exports = router;
