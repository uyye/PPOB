const ServiceService = require("../services/serviceService");

class ServiceController{
    static async getAllServices(req, res, next){
        try {

            const data = await ServiceService.getAllService()
            res.status(200).json({
                status:200,
                message:"Sukses",
                data
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = ServiceController