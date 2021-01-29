const { ApolloServer, gql } = require('apollo-server-lambda')


var faunadb = require('faunadb'),
  q = faunadb.query;

const typeDefs = gql`
  type Query {
    BookMarks: [BookMark!]
   
  }

  type BookMark {
    id: ID!
    title: String!
    link: String!
  }


  type Mutation{
    addBook(title : String! , link : String!):BookMark
    delTodo(id : ID!):BookMark
    updateTodo(id : ID! , name : String! , link : String!):BookMark
  }
  `
// updateTodo(task : String! , status : Boolean!):Todo
var adminClient = new faunadb.Client({ secret: 'fnAD6OD-QyACBcMFsavYmk2L8OkTxK5zWMj2r_Y9' });

const resolvers = {
  Query: {
    BookMarks: async () => {
      try {
        const result = await adminClient.query(
          q.Map(
            q.Paginate(q.Match(q.Index('list'))),
            q.Lambda(x => q.Get(x))
          )
        )

        return result.data.map(d => {
          // let v = d.ref;
          // let r = v.toString().split(/[, ]/).pop()
          // let s = r.slice(1, 18)
          return {
            id: d.ts,
            // id: s,
            title: d.data.title,
            link: d.data.link
          }
        })
      }
      catch (err) {
        console.log("eror", err)
      }
    },

  },
  Mutation: {
    addBook: async (_, { title , link  }) => {

      try {
        const result = await adminClient.query(
          q.Create(
            q.Collection('bookmark'),
            {
              data: {
                title: title,
                link: link,
              }
            },
          )
        )
        return result.ref.data;

      }
      catch (err) {
        console.log("error ", err)
      }

    },
  //   delTodo: async (_, { id }) => {

  //     try {
       
  //       // var adminClient = new faunadb.Client({ secret: 'fnAD6OD-QyACBcMFsavYmk2L8OkTxK5zWMj2r_Y9' });

  //        let reqObj = JSON.parse(id);
  //        const result = await adminClient.query(
  //         q.Delete(q.Ref(q.Collection("todos"), id))
  //       )
  //       return result.data
  //     }
  //     catch (err) {
  //       console.log("error ", err)
  //     }

  //   },
  //   updateTodo: async (_, { id, task, status }) => {

  //     try {
  //       console.log("task from forntent", id)
  //       var adminClient = new faunadb.Client({ secret: 'fnAD6OD-QyACBcMFsavYmk2L8OkTxK5zWMj2r_Y9' });
  //       const result = await adminClient.query(
  //         q.Update(
  //           q.Ref(q.Collection('todos'), id),
  //           { data: { task: task, status: status } },
  //         )
  //       )
  //       return result.ref.data;

  //     }
  //     catch (err) {
  //       console.log("error ", err)
  //     }

  //   }

  }



}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
