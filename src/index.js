const express=require('express');
const helmet=require('helmet');
const cors=require('cors');
require('dotenv').config({path:'./.env.example'});
const models=require('./models');
const resolvers=require('./resolvers');
const db=require('./db');
const typeDefs=require('./schema');
const {ApolloServer}=require('apollo-server-express');
const jwt=require('jsonwebtoken');
const depthLimit=require('graphql-depth-limit')
const{createComplexityLimitRule}=require('graphql-validation-complexity')
const port=process.env.port||4400;
const DB_HOST=process.env.DB_HOST;
const app=express();
app.use(helmet());
app.use(cors());
db.connect(DB_HOST);
const getUser=token=>{
    if(token){
        try{
            return jwt.verify(token,process.env.JWT_SECRET);
        }catch(err){
            throw new Error('Session invalid');
        }
    }
};
const server=new ApolloServer({ 
    typeDefs,
    resolvers,
    validationRules:[depthLimit(5),createComplexityLimitRule(1000)],
    context:({req})=>{
        const token=req.headers.authorization;
        const user=getUser(token);
        console.log(user);
        return {models,user};
    }
 });
server.start().then(()=>{
    server.applyMiddleware({app,path:'/api'});
    app.listen(port,()=>console.log(`GraphQL Server Running at ${port}${server.graphqlPath}`));
});

