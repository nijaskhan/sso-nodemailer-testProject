const router = require('express').Router();
const routeControllers = require('./routeControllers');

router.post('/login', routeControllers.postlogin);

router.get('/:userId/verify/:token', routeControllers.verifyEmail);

router.post('/getUser', routeControllers.getUser);

router.post('/googleAuth', routeControllers.googleAuthLogin);

module.exports = router;