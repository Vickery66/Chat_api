
module.exports={
        notes:async(parent,args,{models,user})=>{
            return await models.Note.find({$or:[{from:user.id,to:args.to},{from:args.to,to:user.id}]}).sort({_id:-1});
        },
        note:async(parent,args,{models})=>{
            return await models.Note.findById(args.id);
        },
        users:async (parent,args,{models})=>{
            return await models.User.find();
        },
        user:async (parent,{username},{models})=>{
            return await models.User.findOne({username});
        },
        me:async (parent,args,{models,user})=>{
            return await models.User.findById(user.id);
        },
        friends:async (parent,args,{models,user})=>{
            const me=await models.User.findById(user.id);
            return await me.friends.map(async (id)=>{
                return await models.User.findById(id);
            });
        },
        noteFeed:async (parent,{cursor},{models})=>{
            const limit=10;
            let hasNextPage=false;
            let cursorQuery={};
            if(cursor){                         //$eq指令是指查找所有属性值等于该参数的对象，是默认的指令
                cursorQuery={_id:{$lt:cursor}};//$lt指令是指查找所有属性值小于该参数的对象 lower than,$gt greater than
            }
            let notes=await models.Note.find(cursorQuery)
            .sort({_id:-1})
            .limit(limit+1);
            if(notes.length>limit){
                hasNextPage=true;
                notes=notes.slice(0,-1);
            }
            const newCursor=notes[notes.length-1]._id;
            return{
                notes,
                cursor:newCursor,
                hasNextPage
            };
        },
};