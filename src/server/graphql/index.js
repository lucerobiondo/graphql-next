
import { ApolloServer } from 'apollo-server-micro';
import { resolvers } from './resolvers';
import { typeDefs } from './typedef';


const apolloServer = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});
const startServer = apolloServer.start();

export default async function graphqlServer({
  req,
  res,
}) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}