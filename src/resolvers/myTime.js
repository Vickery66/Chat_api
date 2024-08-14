const { GraphQLScalarType, Kind }=require('graphql');
 
const resolverMap = {
  Date: new GraphQLScalarType({
    name: 'DateTime',
    description: 'DateTime custom scalar type',
    parseValue(value) {
      return new value.toLocaleString(); // value from the client
    },
    serialize(value) {
      return value.toLocaleString(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value).toLocaleString(); // ast value is always in string format
      }
      return null
    }
  })
}
module.exports=resolverMap;