const {gql}=require('apollo-server-express');

module.exports=gql`
    scalar DateTime
    type Query { 
        notes(to:String!):[Note!]!
        note(id:ID):Note!
        users:[User!]!
        user(username:String):User!
        me:User!
        friends:[User]!
        noteFeed(cursor:String):NoteFeed
    }
    type Note{
        id:ID!
        content:String!
        
        from:ID!
        to:ID!
        createdAt:DateTime!
        updatedAt:DateTime!
        
    }
    type Mutation{
        signUp(username:String!,email:String!,password:String!):String!
        signIn(username:String!,email:String!,password:String!):String!
        newNote(content:String!,to:String!):Note!
        updateNote(id:ID!,content:String!):Note!
        deleteNote(id:ID!):Boolean!
        addfriend(username:String!):Boolean
        toggleFavorite(id:ID!):Note!
    }
    type User{
        id:ID!
        username:String!
        email:String!
        avatar:String!
        notes(to:String!):[Note!]!
        friends:[ID!]!
    }
    type NoteFeed{
        notes:[Note!]!
        cursor:String!
        hasNextPage:Boolean!
    }
`;
