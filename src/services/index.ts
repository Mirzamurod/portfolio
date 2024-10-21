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
