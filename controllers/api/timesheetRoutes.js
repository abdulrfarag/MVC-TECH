const router = require('express').Router();
const { Techblog } = require('../../models')
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newTechblog = await Techblog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newTechblog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const techblogData = await Techblog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!techblogData) {
      res.status(404).json({ message: 'No techblog found with this id!' });
      return;
    }

    res.status(200).json(techblogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
