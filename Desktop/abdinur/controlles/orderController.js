const Orders = require("../models/Orders");

exports.getOrders = async (req, res, next) => {
    try {

        const order = await Orders.find({});

        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: order
        });

    } catch (error) {
        next(error);
    }
}

exports.createProduct = async (req, res, next) => {
    try {

        const order = await Orders.create(req.body);

        res.status(200).json({
            success: true,
            message: "oreder created successfully",
            data: order
        });

    } catch (error) {
        next(error);
    }
}