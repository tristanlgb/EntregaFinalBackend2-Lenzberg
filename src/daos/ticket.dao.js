import ticketModel from "../models/ticket.model.js";

export default class Ticket {
    constructor() {}

    async create(ticket) {
        try {
            return await ticketModel.create(ticket);
        } catch (error) {
            console.error("Error creating ticket:", error.message);
            return null;
        }
    }
}
