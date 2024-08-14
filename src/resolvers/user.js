module.exports={
    notes:async (user,args,{models})=>{
        return await models.Note.find({$or:[{from:user._id,to:args.to},{from:args.to,to:user.id}]}).sort({_id:-1});
    },
    // friends:async (user,args,{models})=>{
    //     return await models.User.find({friends:user._id}).sort({_id:-1});
    // }
};