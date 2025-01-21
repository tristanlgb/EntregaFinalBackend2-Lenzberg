import Business from "../daos/business.dao.js";

const businessService = new Business();

export const getBusiness = async (req, res) => {
    try {
        const result = await businessService.get();
        if (!result) {
            return res.status(500).json({ status: "error", message: "Something went wrong, try again later" });
        }
        res.json({ status: "success", result });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const getBusinessById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await businessService.getById(id);
        if (!result) {
            return res.status(404).json({ status: "error", message: "Business not found" });
        }
        res.json({ status: "success", result });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const addProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    try {
        const business = await businessService.getById(id);
        if (!business) {
            return res.status(404).json({ status: "error", message: "Business not found" });
        }
        business.products.push(product);
        await businessService.update(business._id, business);
        res.json({ status: "success", business });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};
