const Product = require('../models/product');
const storage = require('../utils/cloud_storage');
const asyncForEach = require('../utils/async_foreach');

module.exports = {

    // En tu controlador (productsController.js o similar)
async findByCategory(req, res, next) {
    try {
        const id_category = req.params.id_category;
        const selectedDate = req.query.selectedDate;
        const selectedTime = req.query.selectedTime;
        const status = req.query.status;

        // Verifica si todos los parámetros están presentes
        if (!id_category || !selectedDate || !selectedTime || !status) {
            return res.status(400).json({
                message: 'Se requieren todos los parámetros: id_category, selectedDate, selectedTime y status',
                success: false,
            });
        }

        const data = await Product.findByCategoryAndDateTime(id_category, selectedDate, selectedTime, status);
        return res.status(200).json(data);
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            message: 'Error al listar los productos por categoría y fecha',
            success: false,
            error: error,
        });
    }
},

    
    async findByCategoryAndProductName(req, res, next) {
        try {
            const id_category = req.params.id_category; // CLIENTE
            const product_name = req.params.product_name; // CLIENTE
            const data = await Product.findByCategoryAndProductName(id_category, product_name);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Error al listar los productos por categoria`,
                success: false,
                error: error
            });
        }
    },
    

    async create(req, res, next) {

        let product = JSON.parse(req.body.product);
        console.log(`Producto ${JSON.stringify(product)}`);

        const files = req.files;

        let inserts = 0;
        
        if (files.length === 0) {
            return res.status(501).json({
                message: 'Error al registrar el producto no tiene imagen',
                success: false
            });
        }
        else {
            try {
                
                const data = await Product.create(product); // ALMACENANDO LA INFORMACION
                product.id = data.id;

                const start = async () => {
                     await asyncForEach(files, async (file) => {
                        const pathImage = `image_${Date.now()}`;
                        const url = await storage(file, pathImage);

                        if (url !== undefined && url !== null) {
                            if (inserts == 0) { // IMAGEN 1
                                product.image1 = url;
                            }
                            else if(inserts == 1) { // IMAGEN 2
                                product.image2 = url;
                            }
                            else if(inserts == 2) { // IMAGEN 3
                                product.image3 = url;
                            }
                        }

                        await Product.update(product);
                        inserts = inserts + 1;

                        if (inserts == files.length) {
                            return res.status(201).json({
                                success: true,
                                message: 'El producto se ha registrado correctamente'
                            });
                        }

                     }); 

                }

                start();

            } 
            catch (error) {
                console.log(`Error: ${error}`);
                return res.status(501).json({
                    message: `Error al registrar el producto ${error}`,
                    success: false,
                    error: error
                });
            }
        }

    },


    //---------------------RESERVAS--------------------
    async findById(req, res, next) {
        try {
            const id_products = req.params.id_product.split(','); // Divide los IDs por coma
    
            // Verifica si al menos un ID está presente
            if (!id_products.length) {
                return res.status(400).json({
                    message: 'Se requiere al menos un ID de producto',
                    success: false,
                });
            }
    
            // Llama a la función del modelo para buscar los productos por IDs
            const data = await Product.findById(id_products);
    
            // Imprime los productos en la consola
            console.log('IDs de productos:', id_products);
            console.log('Productos encontrados:', data);
    
            return res.status(200).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                message: 'Error al buscar los productos por IDs',
                success: false,
                error: error,
            });
        }
    },
    

    async findByIdFavorite(req, res, next) {
        try {
            const id_products = req.params.id_product.split(','); // Divide los IDs por coma
    
            // Verifica si al menos un ID está presente
            if (!id_products.length) {
                return res.status(400).json({
                    message: 'Se requiere al menos un ID de producto',
                    success: false,
                });
            }
    
            // Llama a la función del modelo para buscar los productos por IDs
            const data = await Product.findByIdFavorite(id_products);
    
            // Imprime los productos en la consola
            console.log('IDs de productos:', id_products);
            console.log('Productos encontrados:', data);
    
            return res.status(200).json(data);
        } catch (error) {
            console.log(`Errorrrrrr: ${error}`);
            return res.status(500).json({
                message: 'Error al buscar los productos por IDs',
                success: false,
                error: error,
            });
        }
    },
    

    async getAllProducts(req, res, next) {
        try {
            
    
            // Llama a la función del modelo para buscar el producto por ID
            const data = await Product.getAllProducts();
    
            // Imprime los productos en la consola
            console.log('Productos encontrados:', data);
    
            return res.status(200).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(500).json({
                message: 'Error al buscar el producto por ID',
                success: false,
                error: error,
            });
        }
    }
    
    

}