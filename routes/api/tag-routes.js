const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    // find all tags
    const tagData = await Tag.findAll({
    // be sure to include its associated Product data
      include: [{model: Product, through: ProductTag}]
  })
    res.status(200).json(tagData)
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag}]
    })
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tagData)
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagNew = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(tagNew);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tagUpdate = await Tag.update(
    {
      tag_name: req.body.tag_name
    }, 
    {
      where: {
        id: req.params.id
      }
    })
    if (!tagUpdate) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json("Specified tag updated!")
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const tagBoom = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!tagBoom) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json("Specific tag destroyed!")
  }
  catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
