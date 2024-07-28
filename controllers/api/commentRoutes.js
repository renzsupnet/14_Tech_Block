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


router.delete('/:id', withAuth, async (req, res) => {
    try {
      const commentData = await Commentary.destroy({
        where: {
          id: req.session.blogPost_id,
          user_id: req.session.user_id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comments found with this id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router;
