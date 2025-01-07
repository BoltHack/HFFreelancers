const express = require('express');
const {
    sendNewsAdmin, allUsersAdmin, deleteUserAdmin, changePasswordAdmin, sendNewsPost, allNewsAdmin,
    deleteNewsAdmin, deleteReviewAdmin, sendLinksAdmin, deleteLink, sendLinksPostVk, sendLinksPostDiscord, sendLinksPostInstagram,
    sendLinksPostFacebook, playerBanAdmin, playerUnbanAdmin, requestUnbanAdmin, banMenuAdmin, banListAdmin,
    createAWebSiteAdmin, createAwebsite, allWebsitesAdmin, deleteFileAdmin, createAdvertisingAdmin, createAdvertisingPost,
    allAdvertisingAdmin, deleteAdvertising, banIpListAdmin, playerUnbanIpAdmin, addIpToTheListAdmin, banIpToTheListAdmin,
    onlyIpBanListAdmin
} = require('../controller/AdminController');
const {authenticateJWT} = require('../middlewares/jwtAuth');
const {verifyPermissions} = require('../middlewares/permissionsAuthorization')
const router = express.Router();

router.get('/sendNews', verifyPermissions('Admin'), authenticateJWT, sendNewsAdmin);
router.get('/allUsers', verifyPermissions('Admin'), authenticateJWT, allUsersAdmin);
router.get('/banList', verifyPermissions('Admin'), authenticateJWT, banListAdmin);
router.get('/banIpList', verifyPermissions('Admin'), authenticateJWT, banIpListAdmin);
router.get('/allNews', verifyPermissions('Admin'), authenticateJWT, allNewsAdmin)
router.get('/sendLinks', verifyPermissions('Admin'), authenticateJWT, sendLinksAdmin)
router.get('/requestUnban', verifyPermissions('Admin'), authenticateJWT, requestUnbanAdmin)
router.get('/banMenu/:id', verifyPermissions('Admin'), banMenuAdmin);
router.get('/createAWebSite', verifyPermissions('Admin'), authenticateJWT, createAWebSiteAdmin);
router.get('/allWebsites', verifyPermissions('Admin'), authenticateJWT, allWebsitesAdmin);
router.get('/createAdvertising', verifyPermissions('Admin'), authenticateJWT, createAdvertisingAdmin);
router.get('/allAdvertising', verifyPermissions('Admin'), authenticateJWT, allAdvertisingAdmin);
router.get('/addIpToTheList', verifyPermissions('Admin'), authenticateJWT, addIpToTheListAdmin);
router.get('/onlyIpBanList', verifyPermissions('Admin'), authenticateJWT, onlyIpBanListAdmin);

router.post('/deleteUserAdmin/:id', verifyPermissions('Admin'), deleteUserAdmin);
router.post('/deleteNewsAdmin/:id', verifyPermissions('Admin'), deleteNewsAdmin);
router.post('/changePasswordAdmin/:id', verifyPermissions('Admin'), changePasswordAdmin);
router.post('/deleteReviewsAdmin/:id', verifyPermissions('Admin'), deleteReviewAdmin);
router.post('/deleteFile/:id', verifyPermissions('Admin'), deleteFileAdmin);

router.post('/sendNews', verifyPermissions('Admin'), sendNewsPost);
router.post('/createAnewWebsite', verifyPermissions('Admin'), createAwebsite);
router.post('/createAdvertising', verifyPermissions('Admin'), authenticateJWT, createAdvertisingPost);

router.post('/sendLinksVk', verifyPermissions('Admin'), sendLinksPostVk);
router.post('/sendLinksDiscord', verifyPermissions('Admin'), sendLinksPostDiscord);
router.post('/sendLinksInstagram', verifyPermissions('Admin'), sendLinksPostInstagram);
router.post('/sendLinksFacebook', verifyPermissions('Admin'), sendLinksPostFacebook);

router.post('/deleteLink/:id', verifyPermissions('Admin'), deleteLink);

router.post('/playerBan/:id', verifyPermissions('Admin'), playerBanAdmin);
router.post('/playerUnban/:id', verifyPermissions('Admin'), playerUnbanAdmin);
router.post('/playerUnbanIp/:id/:ip', verifyPermissions('Admin'), playerUnbanIpAdmin);
router.post('/banIpToTheList/:ip', verifyPermissions('Admin'), banIpToTheListAdmin);
router.post('/deleteAdvertising/:id', verifyPermissions('Admin'), deleteAdvertising);

module.exports = router;
