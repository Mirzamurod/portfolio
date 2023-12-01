import { TProject } from '@/types/project'
import request, { GraphQLClient, gql } from 'graphql-request'

const graphqlApi = process.env.NEXT_LINK!
const graphcms_token = process.env.GRAPHCMS_TOKEN!
export const token = process.env.TOKEN!
export const chat_id = process.env.CHAT_ID!

export const getProjects = async () => {
  const query = gql`
    query MyQuery {
      projects {
        createdAt
        description
        featured
        id
        image {
          url
        }
        like
        name
        url
      }
    }
  `

  const result: any = await request(graphqlApi, query)

  return result.projects
}

export const getExperiences = async () => {
  const query = gql`
    query MyQuery {
      experiences {
        createdAt
        description
        year
        id
        name
      }
    }
  `

  const result: any = await request(graphqlApi, query)

  return result.experiences
}

export const addLike = async (obj: { like: number; id: string }) => {
  // console.log('obj', obj)
  // const result = await fetch('/api/like', {
  //   method: 'put',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(obj),
  // })

  // return result.json()
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

  try {
    const result = await graphQLClient.request(query, obj)
    return result
  } catch (err) {
    console.log(err)
  }

  // const result: any = await request(graphqlApi, query, { obj })
}
