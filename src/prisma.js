import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
});

// prisma.query prisma.mutation prisma.subscription prisma.exists
// async function queryUsers(selectionSet) {
//   const users = await prisma.query.users(null, selectionSet);
//   console.log(JSON.stringify(users, null, 4));
// }

// async function queryComments(selectionSet) {
//   const comments = await prisma.query.comments(null, selectionSet);
//   console.log(JSON.stringify(comments, null, 4));
// }

// async function queryPosts(selectionSet) {
//   const posts = await prisma.query.posts(null, selectionSet);
//   console.log(JSON.stringify(posts, undefined, 4));
// }

// queryUsers('{ id name email posts { id title } }');
// queryComments('{ text id author { id name } }');

// 1. create a new post
// 2. Fetch all of the info about the user(author)
const createPostForUser = async (authorId, data) => {
  const post = await prisma.mutation.createPost(
    {
      data: {
        ...data,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    },
    '{ id }'
  );
  const user = await prisma.query.user(
    {
      where: {
        id: authorId,
      },
    },
    ' { id name email posts { id title published } } '
  );
  return user;
};

// Usage example -- create a post for Vikram and print info of him
// createPostForUser('ck9i2qhy501z208145dgqu2em', {
//   title: 'great books to read',
//   body: 'the war of art',
//   published: true,
// }).then((data) => console.log(JSON.stringify(data, undefined, 4)));

const updatePostForUser = async (postId, data) => {
  const post = await prisma.mutation.updatePost(
    {
      data,
      where: {
        id: postId,
      },
    },
    ' { author { id } }'
  );
  const user = await prisma.query.user(
    {
      where: {
        id: post.author.id,
      },
    },
    ' { name id email posts { id title published } } '
  );
  return user;
};

updatePostForUser('cka0jtaos05d107140p6ah7n4', {
  title: 'MUST READ books that will change your life',
}).then((user) => console.log(JSON.stringify(user, undefined, 4)));
