const router = require('express').Router();
const { Commentary } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Commentary.create({
      ...req.body,
      user_id: req.session.user_id,
      blogPost_id: req.session.blogPost_id
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
