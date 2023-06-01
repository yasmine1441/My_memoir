const { Router } = require('express');
const authController = require('../controllers/authController');
const router = Router();

// Importer votre contrôleur pour la page de contact
// const contactController = require('../controllers/contactController');

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);


// Route pour le formulaire de contact
// router.post('/contact', contactController.submitContactForm);

module.exports = router;