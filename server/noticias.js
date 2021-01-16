const config = require("./config.json");

const express = require("express");
const router = express.Router();
const butter = require("buttercms")(config.butterToken);

router.get("/posts", function (req, res) {
    butter.post.list({
        "page": 1,
        "page_size": 10,
        "exclude_body": false,
        "author_slug": 'rafa-puerta',
        "category_slug": 'example-category',
        "tag_slug": 'example-tag'
   })
     .then(function(resp) {
       console.log(resp.data)
       res.send(resp.data)
     }).catch(function(resp) {
       console.log(resp)
     });
});

module.exports = router;
