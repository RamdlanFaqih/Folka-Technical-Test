import model from "../model/product.model.js";
import cloudinary from "../helper/cloudinary.js";

const productController = {
  list: async function (req, res) {
    try {
      let search = req.query.search || "";
      let sort = req.query.sort || "ASC";

      const { limit, page } = req.query;
      const pageValue = page ? Number(page) : 1;
      const limitValue = limit ? Number(limit) : 6;
      const offsetValue = pageValue === 1 ? 0 : (pageValue - 1) * limitValue;

      const allData = await model.selectPaginate();
      console.log(allData);
      const totalData = Number(allData.rows[0].total);

      const result = await model.listProduct(
        search,
        sort,
        limitValue,
        offsetValue
      );
      const selectAll = {
        currentPage: pageValue,
        dataPerPage: limitValue,
        totalPage: Math.ceil(totalData / limitValue),
        totalData,
        result,
      };
      res.status(200).json({
        messagge: "List Product Successfully",
        data: selectAll,
      });
    } catch (err) {
      res.status(500).json({
        message: "Interval Server Error",
        error: err.message,
      });
    }
  },
  getProduct: async function (req, res) {
    try {
      const { id } = req.params;
      const result = await model.getProduct(id);
      res.status(200).json({
        message: "get Product Successfully",
        data: result,
      });
    } catch (err) {
      console.log("Failed to get Product", err);
      res.status(500).json({
        message: "Interval Server error",
      });
    }
  },
  createProduct: async function (req, res) {
    try {
        console.log(req);
      const {
        product_name,
        seller_name,
        rating,
        price,
        description,
        product_detail,
        specification
      } = req.body;
      const image = await cloudinary.uploader.upload(req.file.path);
      const imageUrl = image.url;
      const result = await model.postProduct(
        product_name,
        seller_name,
        rating,
        price,
        description,
        imageUrl,
        product_detail,
        specification
      );
      res.status(200).json({
        message: "Product created successfully",
        data: result.rows,
      });
    } catch (err) {
      console.log("Error creating product", err);
      res.status(500).json({
        message: "Interval Server error",
        error: err.message,
      });

    }
  },
  delete: async function (req, res) {
    try {
      const { id } = req.params;
      const result = await model.destroy(id);
      if (result) {
        res.status(200).json({
          message: "Data Deleted Succesfully",
          data: result,
        });
      } else {
        res.status(404).json({
          message: "user not found",
        });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        message: "Interval Server Error",
      });
    }
  },
};

export default productController;
