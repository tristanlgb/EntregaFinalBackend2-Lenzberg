import Orders from "../daos/orders.dao.js";
import Buyer from "../daos/buyer.dao.js";
import Business from "../daos/business.dao.js";

const buyerService = new Buyer();
const ordersService = new Orders();
const businessService = new Business();

export const getOrders = async (req, res) => {
    try {
        const result = await ordersService.get();
        res.json({ status: "success", result });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await ordersService.getById(id);
        if (!result) {
            return res.status(404).json({ status: "error", message: "Order not found" });
        }
        res.json({ status: "success", result });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const createOrder = async (req, res) => {
    const { idBuyer, idBusiness, idsProducts, quantities } = req.body;
    try {
        if (!idBuyer || !idBusiness || !idsProducts || !quantities) {
            return res.status(400).json({ message: "Required parameters are missing" });
        }

        if (idsProducts.length !== quantities.length) {
            return res.status(400).json({ message: "Products and quantities arrays must have the same length" });
        }

        const resultBuyer = await buyerService.getById(idBuyer);
        if (!resultBuyer) {
            return res.status(404).json({ message: "Buyer not found" });
        }

        const resultBusiness = await businessService.getById(idBusiness);
        if (!resultBusiness) {
            return res.status(404).json({ message: "Business not found" });
        }

        const actualOrders = resultBusiness.products.filter((product) => idsProducts.includes(product.id));

        if (idsProducts.length !== actualOrders.length) {
            return res.status(400).json({ message: "Some products are not available" });
        }

        for (let i = 0; i < actualOrders.length; i++) {
            if (actualOrders[i].stock < quantities[i]) {
                return res.status(400).json({ message: `Insufficient stock for product ${actualOrders[i].name}` });
            }
        }

        const total = actualOrders.reduce((acc, product, index) => acc + product.price * quantities[index], 0);
        const order = {
            business: resultBusiness,
            buyer: resultBuyer,
            status: "pending",
            products: actualOrders.map((product, index) => ({ ...product, quantity: quantities[index] })),
            totalPrice: total,
        };

        const orderResult = await ordersService.create(order);
        if (!orderResult) {
            return res.status(500).json({ message: "Order creation failed" });
        }

        resultBuyer.orders.push(orderResult._id);
        await buyerService.update(idBuyer, resultBuyer);

        res.status(201).json({ status: "success", orderResult });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "An error occurred while creating the order", error: error.message });
    }
};

export const resolveOrder = async (req, res) => {
    const { id } = req.params;
    const { resolve } = req.body;

    if (!id || !resolve) {
        return res.status(400).json({ message: "Required parameters are missing" });
    }

    if (!["confirmed", "pending", "cancelled"].includes(resolve)) {
        return res.status(400).json({ message: "Invalid status value" });
    }

    try {
        const order = await ordersService.getById(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = resolve;
        await ordersService.resolve(order._id, order);

        res.json({ status: "success", message: "Order updated successfully" });
    } catch (error) {
        console.error("Error resolving order:", error);
        res.status(500).json({ status: "error", message: "An error occurred", error: error.message });
    }
};


