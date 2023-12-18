import db from "../config/db.js";

const productModel = {
  listProduct: function (search, sort, limit, offset) {
    try {
      let sortDirection = sort === "DESC" ? "DESC" : "ASC";
      let cleanSearch = search.replace(/[^a-zA-Z0-9 ]/g, " ").trim();
      let searchTerm = `%${cleanSearch}%`;

      return db.query(`
            SELECT id, product_name, seller_name, price, created_at FROM products
            WHERE LOWER(product_name) ILIKE '%${searchTerm}%' OR
                    LOWER(product_name) ILIKE '% ${searchTerm}%' OR
                    LOWER(product_name) ILIKE '%${searchTerm} %'
                ORDER BY created_at ${sortDirection}
                LIMIT ${limit} OFFSET ${offset}`);
    } catch (err) {
      console.log(err.message);
    }
  },
  getProduct: function (id) {
    try {
      return db.query(`SELECT * FROM products WHERE id = ${id}`);
    } catch (err) {
      console.log(err.message);
    }
  },
  selectPaginate: function () {
    try {
        return db.query("SELECT COUNT(*) FROM products");
    } catch (err) {
        console.log(err.message);
    }
  },
  postProduct: function (
    product_name,
    seller_name,
    rating,
    price,
    description,
    image,
    product_detail,
    specification
  ) {
    try {
      return db.query(
        `INSERT INTO products (product_name, seller_name, rating, price, description, image, product_detail, specification) 
            VALUES ('${product_name}', '${seller_name}', '${rating}', '${price}', '${description}', '${image}', '${product_detail}', '${specification}')`
      );
    } catch (err) {
      console.log(err.message);
    }
  },
  destroy: function (id) {
    try {
      return db.query(`DELETE FROM products WHERE id = '${id}'`);
    } catch (err) {
      console.log(err.message);
    }
  },
};

export default productModel;
