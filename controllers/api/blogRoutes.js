const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogPostData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update blogPost data
  try {
    console.log(req.body, req.params.id);
    const blogPostData = await BlogPost.update(req.body
      , {
      where: {
        id: req.params.id
      },
    });
    if (!blogPostData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      
      return;
    }

    res.status(200).json(req.body);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }


});

module.exports = router;
