// CAN BE APPLIED TO POINT SYSTEM 
// EXAMPLE: USER HAS 6000 POINTS ---> CAN PURCHASE 3 DIIFIRENT DISXOUNTS
// HE TAKES NIMBER 3 IT IS TJE ONE THAT USES THE BUY 1500 TL WORTH OF PRODUCT AND GET 100 TL DISCOUNT
// SHOULD WE GIVE EXTRA POINTS WHEN HE USES A COUPON

const mongoose = require("mongoose")

const CouponSchema = new mongoose.Schema({
    couponHeader:{type:String},
    couponInfo:{type: String},
    couponPoint:{type: Number},
    couponCode:{type: String,required: true, unique: true},
},
    { timestamps: true } //Auto create timestams
);

module.exports = mongoose.model("Coupon", CouponSchema)