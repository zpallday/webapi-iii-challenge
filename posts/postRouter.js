const express = 'express';
const postDateBase = require('./postDb')
const router = express.Router();

router.get('/', (req, res) => {
 postDateBase.get()
  .then(results => {
      res.status(201).json(results)
  })
  .catch(error => {
      res.status(500).json(error)
  })
});

router.get('/:id', validatePostId, (req, res) => {
 postDateBase.getById(req.post.id)
 .then(results => {
     res.status(201).json(results)
 })
 .catch(error => {
     res.status(500).json(error)
 })
});

router.delete('/:id', validatePostId, (req, res) => {
postDateBase.remove(req.post.id)
.then(results => {
    res.status(200).json(results)
})
.catch(error => {
    res.status(500).json(error)
})
});

router.put('/:id',validatePostId, validatePost, (req, res) => {
postDateBase.update(req.post.id, req.body)
.then(results => {
    res.status(201).json(results)
})
.catch(error => {
    res.status(500).json(error)
})
});

// custom middleware

function validatePostId(req, res, next) {
const postId = req.params.id;

postDateBase.getById(postId)
.then (results => {
    if(results === undefined) {
        res.status(400).json({message: "invalid ID"})
    } else {
        req.post = results
        next();
    }
    })
};

function validatePostId(req, res, next) {

    if(!Object.keys(req.body).length) {
        res.status(400).json({message: "missing data"})
    } else {
        if (req.body.text) {
            next()
        } else {
            res.status(400).json({message: "missing text field"})
        }
    }
};

module.exports = router;