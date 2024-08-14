const Query=require('./query');
const resolverMap=require('./myTime');
const Mutation=require('./mutation');
const Note=require('./note');
const User=require('./user');
module.exports={
    Query,
    Mutation,
    Note,
    User,
    DateTime:resolverMap.Date
}