import { GraphQLClient, gql } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'

const graphqlApi = process.env.NEXT_LINK!
const graphcms_token = process.env.GRAPHCMS_TOKEN

export default async function like(req: NextApiRequest, res: NextApiResponse) {
  const graphQLClient = new GraphQLClient(graphqlApi, {
    headers: { authorization: `Bearer ${graphcms_token}` },
  })

  const query = gql`
    mutation UpdateLike($like: Number!, $id: String!) {
      updateProject(data: { like: $like }, where: { id: $id }) {
        like
        id
      }
    }
  `
  console.log(req.body)

  try {
    const result = await graphQLClient.request(query, req.body)
    return res.status(200).send(result)
  } catch (err) {
    console.log(err)
  }
}
