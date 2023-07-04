const credit = require("./model/credit");
const service = require("./model/services");
const user = require("../authentication/model/user");
const offre = require("./model/offre");

const GetAll = async (req, res) => {

    let credits;
    let pdvs;
    let finances;
    let offres;
    let services;
    try {

        credits = await credit.find();
        pdvs = await user.find({ role: 'pdv' });
        finances = await user.find({ role: 'finance' });
        offres = await offre.find();
        services = await service.find();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: ' server error ', data: error });
    }

    return res.status(200).json({
        success: true, message: 'all credit', data: {
            credit: credits.length,
            pdv: pdvs.length,
            finance: finances.length,
            service: services.length,
            offre: offres.length,
        }
    });

}

const PieStats = async (req, res) => {
    
    const credits = await credit.aggregate([
        { $group: { _id: "$offreid", count: { $sum: 1 } } },
    ]);

    const offerIds = credits.map((credit) => credit._id);
    const offerCounts = credits.map((credit) => credit.count);

    const offers = await offre.find({ _id: { $in: offerIds } }).select("title");

    const offerTitles = offers.map((offer) => offer.title);

    const result = {
        offerTitles,
        offerIdCounts: offerCounts,
    };

    return res.status(200).json({
        success: true, message: 'all credit', data: result
    });



}

exports.GetAll = GetAll;
exports.PieStats = PieStats;