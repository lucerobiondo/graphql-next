
import { connectDB } from '../../../server/db';
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { resolvers } from '../../../server/graphql/resolvers';
import { typeDefs } from '../../../server/graphql/typedef';

const server = new ApolloServer({
  resolvers: resolvers,
  typeDefs: typeDefs,
});

connectDB();

const handler = startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({
    req,
    res,
    dataSources: {},
  }),
});


/* export async function GET(request) {
  return handler(request);
}
export async function POST(request) {
  return handler(request);
} */

export default handler
