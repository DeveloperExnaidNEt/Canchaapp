const Order = require('../models/order');
const OrderHasProduct = require('../models/order_has_products');


module.exports = {


    // Importa el modelo necesario

// Función para buscar órdenes por estado
async findByStatus(req, res, next) {
    try {
      const status = req.params.status;
      const diareserva = req.params.diareserva; // Cambiado de selectedDate a diareserva
      const horainicioreserva = req.params.horainicioreserva; // Cambiado de selectedTime a horainicioreserva
      const data = await Order.findByStatus(horainicioreserva, status, diareserva);
      console.log(`Status ${JSON.stringify(data)}`);
      return res.status(201).json(data);
    } catch (error) {
      console.log(`Erroree ${error}`);
      return res.status(501).json({
        message: 'Hubo un error al tratar de obtener las ordenes por estado',
        error: error,
        success: false
      });
    }
  },

  async findByStatusFavorite(req, res, next) {
    try {
      const status = req.params.status;      
      const usuario = req.params.usuario; // Cambiado de selectedTime a horainicioreserva
      const data = await Order.findByStatusFavorite( status, usuario);     
      console.log(`Statuste ${JSON.stringify(usuario)}`);
      return res.status(201).json(data);
    } catch (error) {
      console.log(`Erroree ${error}`);
      return res.status(501).json({
        message: 'Hubo un error al tratar de obtener las ordenes por estado',
        error: error,
        success: false
      });
    }
  },



  async findByStatusV(req, res, next) {
    try {
      const idUsuario =req.params.idUsuario ;
      const status = req.params.status;// Cambiado de selectedTime a horainicioreserva
      const data = await Order.findByStatusV(status, idUsuario);
      console.log(`Status ${JSON.stringify(data)}`);
      return res.status(201).json(data);
    } catch (error) {
      console.log(`Erroree ${error}`);
      return res.status(501).json({
        message: 'Hubo un error al tratar de obtener las ordenes por estado',
        error: error,
        success: false
      });
    }
  },





    
    async findByDeliveryAndStatus(req, res, next) {

        try {
            const id_delivery = req.params.id_delivery;
            const status = req.params.status;

            const data = await Order.findByDeliveryAndStatus(id_delivery, status);
            console.log(`Status delivery ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las ordenes por estado',
                error: error,
                success: false
            })
        }

    },

    async findByClientAndStatus(req, res, next) {

        try {
            const id_client = req.params.id_client;
            const status = req.params.status;

            const data = await Order.findByClientAndStatus(id_client, status);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las ordenes por estado',
                error: error,
                success: false
            })
        }

    },

    async create(req, res, next) {
        try {
            
            let order = req.body;
            order.status = 'RESERVADO';
            const data = await Order.create(order);
            
            console.log('LA ORDEN SE CREO CORRECTAMENTE');

            // RECORRER TODOS LOS PRODUCTOS AGREGADOS A LA ORDEN
            for (const product of order.products) {
                
                await OrderHasProduct.create(data.id, product.id, quantity);
            }

            return res.status(201).json({
                success: true,
                message: 'La orden se creo correctamente',
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: 'Hubo un error creando la orden',
                error: error
            });
        }
    },

    async contraentrega(req, res, next){
        try{
            let order = req.body;
            order.status = 'RESERVADO';
            const data = await Order.create(order);
            
            for (const product of order.products) {
                let quantity = 1;
                await OrderHasProduct.create(data.id, product.id, quantity);
                }



            console.log(order.product)
            
            return res.status(201).json({
            success: true,
            message: 'La orden se creo correctamente',
            data: data.id
            });
            }
        catch (error) {
            console.log(`Error ${error}`);
            return res.status(501).json({
            success: false,
            message: 'Hubo un error creando la ordem',
            error:error
        });
        }
    },



    async updateToDispatched(req, res, next) {
        try {
            
            let order = req.body;
            order.status = 'DESPACHADO';
            await Order.update(order);
            

            return res.status(201).json({
                success: true,
                message: 'La orden se actualizo correctamente',
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar la orden',
                error: error
            });
        }
    },

    async updateToOnTheWay(req, res, next) {
        try {
            
            let order = req.body;
            order.status = 'EN CAMINO';
            await Order.update(order);
            

            return res.status(201).json({
                success: true,
                message: 'La orden se actualizo correctamente',
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar la orden',
                error: error
            });
        }
    },

    async updateToDelivered(req, res, next) {
        try {
            
            let order = req.body;
            order.status = 'ENTREGADO';
            await Order.update(order);
            

            return res.status(201).json({
                success: true,
                message: 'La orden se actualizo correctamente',
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar la orden',
                error: error
            });
        }
    },

    async updateLatLng(req, res, next) {
        try {
            
            let order = req.body;
            await Order.updateLatLng(order);
            
            return res.status(201).json({
                success: true,
                message: 'La orden se actualizo correctamente',
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar la orden',
                error: error
            });
        }
    }

}