const ProductsController = require('../controllers/productsController');
const passport = require('passport');

module.exports = (app, upload) => {




    app.get('/api/products/getById/:id_product', passport.authenticate('jwt', { session: false }), ProductsController.findById);
    app.get('/api/products/getByIdFavorite/:id_product', passport.authenticate('jwt', { session: false }), ProductsController.findByIdFavorite);
    app.get('/api/products/getAllProducts', passport.authenticate('jwt', { session: false }), ProductsController.getAllProducts);

    app.get('/api/products/findByCategory/:id_category', passport.authenticate('jwt', {session: false}), ProductsController.findByCategory);
    app.get('/api/products/findByCategoryAndProductName/:id_category/:product_name', passport.authenticate('jwt', {session: false}), ProductsController.findByCategoryAndProductName);

    app.post('/api/products/create', passport.authenticate('jwt', {session: false}), upload.array('image', 3), ProductsController.create);
}