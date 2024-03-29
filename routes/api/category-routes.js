const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findAll({
      include: [{model: Product}]
    })
    res.status(200).json(categoryData)
  }
  catch(err){
    res.status(500).json(err)
  }
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findByPk(req.params.id,{
      include: [{model: Product}]
    })
    if(!categoryData){
      res.status(404).json("No category found with this id!")
      return
    }
    res.status(200).json(categoryData)
  }
  catch(err){
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const categoryData = await Category.create({
      category_name: req.body.category_name
    })
    res.status(200).json(categoryData)
  }
  catch(err){
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const categoryUpdate = await Category.update({
      category_name: req.body.category_name
    },
    {
      where: {id: req.params.id}
    })
    if(!categoryUpdate){
      res.status(404).json("No category found with this id!")
      return
    }
    res.status(200).json("Specified category updated!")
  }
  catch(err){
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const categoryBoom = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if(!categoryBoom){
      res.status(404).json("No category found with this id!")
      return
    }
    res.status(200).json("Specified category destroyed!")
  }
  catch(err){
    res.status(500).json(err)
  }
});

module.exports = router;
