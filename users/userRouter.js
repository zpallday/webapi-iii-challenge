const express = "express";
const router = express.Router();
const userDateBase = require("./userDb.js");
const postDateBase = require("./posts/postsDb")
router.use(express.jon());

router.post("/", validatePost, (req, res) => {
  const userObj = req.body;
  userDateBase
    .insert(userObj)
    .then(results => {
      res.status(200).json(results);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  console.log(req.user);
  const postObj = req.body;
  postObj.user_id = req.user.id;
  postDateBase
    .insert(postObj)
    .then(results => {
      res.status(200).json(results);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/", (req, res) => {
    userDateBase.get()
    .then(results => {
        res.status(201).json(results)
    })
    .catch(error => {
        res.status(500).json(error)
    })
});




router.get("/:id", validateUserId, (req, res) => {
    res.status(201).json(req.user)
});



router.get("/:id/posts", (req, res) => {
    userDateBase.getUserPosts(req.user.id)
    .then(results => {
        res.status(201).json(results)
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

router.delete("/:id", validateUserId, (req, res) => {
    userDateBase.remove(req.user.id)
    .then(results => {
        res.status(200).json(results)
    })
    .catch(error => {
        res.status(500).json(results)
    })
});



router.put("/:id", validateUserId, (req, res) => {
userDateBase.update(req.user.id, req.body)
.then(results => {
    res.status(200).json(results)
})
.catch(error => {
    res.status(500).json(error)
})
});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
