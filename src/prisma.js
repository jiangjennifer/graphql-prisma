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

async function queryPosts(selectionSet) {
  const posts = await prisma.query.posts(null, selectionSet);
  console.log(JSON.stringify(posts, undefined, 4));
}

// queryUsers('{ id name email posts { id title } }');
// queryComments('{ text id author { id name } }');

// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: 'GraphQL 101',
//         body: '',
//         published: false,
//         author: {
//           connect: {
//             id: 'ck9i0fvpv00h80814c3dbognh',
//           },
//         },
//       },
//     },
//     '{ id title body published }'
//   )
//   .then((data) => {
//     console.log(data);
//     return queryUsers('{ id name email posts { id title } }');
//   });

prisma.mutation
  .updatePost(
    {
      data: {
        published: true,
        body: 'This is how to get started with Graphql...',
      },
      where: {
        id: 'cka0ies1w04hn0714pwuhu7vs',
      },
    },
    '{ id title body published }'
  )
  .then(() => queryPosts(' { id title body published } '));
