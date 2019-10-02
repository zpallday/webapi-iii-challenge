const express = 'express';
const router = express.Router();
const userDateBase = require('./userDb.js');
router.use(express.jon())


router.post('/', validatePost, (req, res) => {
 const userObj = req.body;
userDateBase.insert(userObj)
.then(results => {
    res.status(200).json(results)
})
.catch(error => {
    res.status(500).json(error)
})
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
