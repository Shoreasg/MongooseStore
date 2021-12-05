const express = require('express')
const router = express.Router()
const methodOverride = require("method-override");
const Products = require('../models/product')
router.use(express.static("public"));
router.use(express.urlencoded())
//include the method-override package
router.use(methodOverride("_method"));



router.get("/", (req, res) => {
    res.redirect("/products")
});

router.get("/products", async (req, res) => {
    const products = await Products.find()
    res.render("index.ejs",{products: products})
});

router.get("/products/new", async (req, res) => {
    res.render("new.ejs");
});

router.post("/products", async (req, res) => {
    await Products.create(req.body)
    res.redirect('/products')
});

router.patch("/products/:id", async(req, res) => {
    await Products.findByIdAndUpdate(req.params.id, { $inc: { qty: -1 } } ,{new:true})
    res.redirect(`/products`)
  })

router.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Products.findById(id)
    res.render('show.ejs', { product: product })
});

router.delete("/products/:id", async (req, res) => {
    const product = await Products.findOneAndDelete({_id:req.params.id})
    res.redirect('/products')
});

router.get("/products/:id/edit", async (req, res) => {
    const product = await Products.findById(req.params.id)
    res.render('edit.ejs', { product: product })
});

router.put("/products/:id", async(req, res) => {
   await Products.findByIdAndUpdate(req.params.id, req.body ,{new:true})
    res.redirect(`/products/${req.params.id}`)
  })


//seed data by keying in localhost:5000/seed
router.get("/seed", async (req, res) => {
    const newProducts = [
        {
            name: "Beans",
            description:
                "A small pile of beans. Buy more beans for a big pile of beans.",
            img: "https://cdn3.bigcommerce.com/s-a6pgxdjc7w/products/1075/images/967/416130__50605.1467418920.1280.1280.jpg?c=2",
            price: 5,
            qty: 99,
        },
        {
            name: "Bones",
            description: "It's just a bag of bones.",
            img: "http://bluelips.com/prod_images_large/bones1.jpg",
            price: 25,
            qty: 0,
        },
        {
            name: "Bins",
            description: "A stack of colorful bins for your beans and bones.",
            img: "http://www.clipartbest.com/cliparts/9cz/rMM/9czrMMBcE.jpeg",
            price: 7000,
            qty: 1,
        },
    ];

    try {
        const seedItems = await Products.create(newProducts);
        res.send(seedItems);
    } catch (err) {
        res.send(err.message);
    }
});



module.exports = router