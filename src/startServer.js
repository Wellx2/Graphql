import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';

function StartServer({ typeDefs, resolvers }){
  mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@backendchallenge.iceia.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{   
    const server = new ApolloServer({ 
      typeDefs, 
      resolvers, 
      context:({ req }) =>{
        const auth = req.headers.authorization || '';
        return {
          auth
        };
      }
   });  
    server.listen().then(({ url }) => console.log(`Server started at ${url}`));
  }).catch(err => {
    console.log(err);
  });
};

export default StartServer;