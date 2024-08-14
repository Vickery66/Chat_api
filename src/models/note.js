const mongoose=require('mongoose');
const noteSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    from:{
        type:mongoose.Schema.Types.ObjectId,
        
        required:true
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        
        required:true
    },
    
    },
    {
        //这是给写入的数据添加时间属性
        timestamps:true
    }
);
const Note=mongoose.model('Note',noteSchema);

module.exports=Note;