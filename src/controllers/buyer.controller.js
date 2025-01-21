import Buyer from "../daos/buyer.dao.js";

const buyerService = new Buyer();

export const getBuyers = async (req, res) => {
    try {
        const result = await buyerService.get();
        res.json({ status: "success", result });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const getBuyerById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await buyerService.getById(id);
        if (!result) {
            return res.status(404).json({ status: "error", message: "Buyer not found" });
        }
        res.json({ status: "success", result });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};
