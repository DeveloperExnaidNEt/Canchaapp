const OrdersController = require('../controllers/ordersController');
const passport = require('passport');

module.exports = (app) => {

    /*
    * GET ROUTES
    */

    app.get('/api/orders/findByStatusFavorite/:status/:usuario', passport.authenticate('jwt', {session: false}), OrdersController.findByStatusFavorite);
   
    app.get('/api/orders/findByStatus/:status/:diareserva/:horainicioreserva', passport.authenticate('jwt', {session: false}), OrdersController.findByStatus);
    app.get('/api/orders/findByStatusV/:status/:idUsuario', passport.authenticate('jwt', {session: false}), OrdersController.findByStatusV);

    app.get('/api/orders/findByStatus/:status/:diareserva/:horainicioreserva/:usuario', passport.authenticate('jwt', {session: false}), OrdersController.findByStatusFavorite);

    app.get('/api/orders/findByDeliveryAndStatus/:id_delivery/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByDeliveryAndStatus);
    app.get('/api/orders/findByClientAndStatus/:id_client/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByClientAndStatus);

    /*
    * POST ROUTES
    */
    app.post('/api/orders/create', passport.authenticate('jwt', {session: false}), OrdersController.create);
    app.post('/api/orders/contraentrega', passport.authenticate('jwt', {session: false}), OrdersController.contraentrega);

    /*
    * PUT ROUTES
    */
    app.put('/api/orders/updateToDispatched', passport.authenticate('jwt', {session: false}), OrdersController.updateToDispatched);
    app.put('/api/orders/updateToOnTheWay', passport.authenticate('jwt', {session: false}), OrdersController.updateToOnTheWay);
    app.put('/api/orders/updateToDelivered', passport.authenticate('jwt', {session: false}), OrdersController.updateToDelivered);
    app.put('/api/orders/updateLatLng', passport.authenticate('jwt', {session: false}), OrdersController.updateLatLng);
}