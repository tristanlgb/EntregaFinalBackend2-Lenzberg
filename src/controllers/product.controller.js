import Product from "../daos/product.dao.js";

const productService = new Product();

export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAll();
        if (!products.length) {
            return res.status(404).json({ status: "error", message: "No products found" });
        }
        res.status(200).json({ status: "success", data: products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ status: "error", message: "Internal server error", error: error.message });
    }
};
