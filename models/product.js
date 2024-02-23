const db = require('../config/config');

const Product = {};

Product.findByCategory = (id_category) => {
    const sql = `
    SELECT
        P.id,
        P.name,
        P.description,
        P.price,
        P.image1,
        P.image2,
        P.image3,
        P.id_category
    FROM
        products AS P
    INNER JOIN
        categories AS C
    ON
        P.id_category = C.id
    WHERE
        C.id = $1
    `;

    return db.manyOrNone(sql, id_category);
}

Product.findByCategoryAndProductName = (id_category, product_name) => {
    const sql = `
    SELECT
        P.id,
        P.name,
        P.description,
        P.price,
        P.image1,
        P.image2,
        P.image3,
        P.id_category
    FROM
        products AS P
    INNER JOIN
        categories AS C
    ON
        P.id_category = C.id
    WHERE
        C.id = $1 AND p.name ILIKE $2
    `;

    return db.manyOrNone(sql, [id_category, `%${product_name}%`]);
}


Product.create = (product) => {
    const sql = `
    INSERT INTO
        products(
            name,
            description,
            price,
            image1,
            image2,
            image3,
            id_category,
            created_at,
            updated_at,
            id_user
        )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id
    `;
    return db.oneOrNone(sql, [
        product.name,
        product.description,
        product.price,
        product.image1,
        product.image2,
        product.image3,
        product.id_category,
        new Date(),
        new Date(),
        product.id_user
    ]);
}

Product.update = (product) => {
    const sql = `
    UPDATE
        products
    SET
        name = $2,
        description = $3,
        price = $4,
        image1 = $5,
        image2 = $6,
        image3 = $7,
        id_category = $8,
        updated_at = $9
    WHERE
        id = $1
    `;
    return db.none(sql, [
        product.id,
        product.name,
        product.description,
        product.price,
        product.image1,
        product.image2,
        product.image3,
        product.id_category,
        new Date()
    ]);
}

//------------------------RESERVAS------------------------------


Product.findById = (id_products) => {
    const sql = `
    SELECT
        id,
        name,
        description,
        price,
        image1,
        image2,
        image3,
        id_category
    FROM
        products
    WHERE
        id NOT IN ($1:csv);`;

    return db.manyOrNone(sql, [id_products]); // Usar [id_products] para pasar la lista de IDs
}

Product.findByIdFavorite = (id_products) => {
    // Construye la cadena de placeholders para los IDs
    const placeholders = id_products.map((id, index) => `$${index + 1}`).join(',');

    // Construye la consulta SQL con los placeholders
    const sql = `
    SELECT
        id,
        name,
        description,
        price,
        image1,
        image2,
        image3,
        id_category
    FROM
        products
    WHERE
        id IN (${placeholders});`;

    // Ejecuta la consulta SQL con los IDs de los productos
    return db.manyOrNone(sql, id_products);
}

Product.getAllProducts = () => {
    const sql = `
    SELECT
        id,
        name,
        description,
        price,
        image1,
        image2,
        image3,
        id_category
    FROM
        products
    ;
    `;

    return db.manyOrNone(sql);
}



module.exports = Product;