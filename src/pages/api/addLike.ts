// /pages/api/addLike.js
import { GraphQLClient, gql } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'

const graphqlApi = process.env.NEXT_LINK!
const graphcms_token = process.env.GRAPHCMS_TOKEN

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id, like } = req.body

    const client = new GraphQLClient(graphqlApi, {
      headers: {
        authorization: `Bearer ${graphcms_token}`,
      },
    })

    const mutation = gql`
      mutation UpdateProject($id: ID!, $like: Int!) {
        updateProject(id: $id, like: $like) {
          id
          like
        }
      }
    `

    try {
      const data = await client.request(mutation, { id, like })
      return res.status(200).json(data)
    } catch (error) {
      // @ts-ignore
      return res.status(500).json({ error: error.message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
