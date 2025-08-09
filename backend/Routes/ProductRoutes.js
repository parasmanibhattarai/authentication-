const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();

router.get('/', ensureAuthenticated,(req, res) => {
    console.log("Fetching products for user:", req.user);
    res.status(200).json(
        [
            {
                id: 1,
                name: "Product 1",
                price: 100,
                description: "Description for Product 1",
                imageUrl: "https://via.placeholder.com/150"
            },
            {
                id: 2,
                name: "Product 2",
                price: 200,
                description: "Description for Product 2",
                imageUrl: "https://via.placeholder.com/150"
            },
            {
                id: 3,
                name: "Product 3",
                price: 300,
                description: "Description for Product 3",
                imageUrl: "https://via.placeholder.com/150"
            }
        ])
});

module.exports = router;