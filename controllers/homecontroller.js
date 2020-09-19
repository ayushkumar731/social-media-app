const catchAsync=require('../config/catchAsynch');

module.exports.home=catchAsync(async(req,res,next)=>{
    return res.render('home',{
        title:'home page'
    })
})