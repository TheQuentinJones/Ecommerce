const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {

  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!'});
      return;
    } else {
      res.status(200).json(tagData);
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const updatedTag = await Tag.update(
    {
      // All the fields you can update and the data attached to the request body.
      tag_name: req.body.tag_name,
            
    },
    {
     where: {
        id: req.params.id,
      },
    }
  );
  res.json(updatedTag);
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const deletedTag = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  });
  
  res.json(deletedTag);
});

module.exports = router;
