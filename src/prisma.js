import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
});

// prisma.query prisma.mutation prisma.subscription prisma.exists
async function queryUsers(selectionSet) {
  const users = await prisma.query.users(null, selectionSet);
  console.log(JSON.stringify(users, null, 4));
}

async function queryComments(selectionSet) {
  const comments = await prisma.query.comments(null, selectionSet);
  console.log(JSON.stringify(comments, null, 4));
}

queryUsers('{ id name email posts { id title } }');
queryComments('{ text id author { id name } }');
