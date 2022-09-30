const express = require('express');
const router = new express.Router();
const {getAllColleges, getSpecificCollege, getHomePage} = require('../controllers/colleges');

router.route('/').get(getAllColleges);

// router.route('/test').get(getSpecificCollege)

module.exports = router;