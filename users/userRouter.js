const express = require("express");
const userDateBase = require("./userDb.js");
const postDateBase = require("../posts/postDb")
const router = express.Router();




router.post("/", validateUser, (req, res) => {
 userDateBase.insert(req.body)
 .then(({ id }) => {
     userDateBase.getById(id)
 })
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



router.get("/:id/posts", validateUserId, (req, res) => {
    const {id} = req.params
    userDateBase.getUserPosts(id)
    .then(results => {
        res.status(201).json(results)
    })
    .catch(error => {
        res.status(500).json({error: 'Server errror'})
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



router.put("/:id", validateUserId,validateUser, (req, res) => {
userDateBase.update(req.user.id, req.body)
.then(results => {
    res.status(200).json(results)
})
.catch(error => {
    res.status(500).json(error)
})
});

//custom middleware

function validateUserId(req, res, next) {
    const userID = req.params.id;

    userDateBase.getById(userID)
     .then(results => {
         if(results === undefined) {
             res.status(400).json({message: 'invaild user id'})
         } else {
             req.user = results
             next();
         }
        })
    }
              

function validateUser(req, res, next) {
    if (!Object.keys(req.body).length) {
        res.status(400).json({message: 'missing user data'})
    } else {
        if (req.body.name) {
            next()
        } else {
            res.status(400).json({message: 'missing name field'})
        }
    }
}

function validatePost(req, res, next) {
    if (!Object.keys(req.body).length) {
        res.status(400).json({message: 'missing user data'})
} else {
    if(req.body.text) {
        next();
    } else {
        res.status(400).json({message: 'missing text field'})
    }
    }
}

module.exports = router;
