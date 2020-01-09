import gql from 'graphql-tag'
import request from 'graphql-request'

export const url = 'http://localhost:4000/'

export const mongoId = '5dfbff19b83236bdf3854485'

export const loginMutation = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      token
      user {
        id
      }
    }
  }
`

export const allCourts = gql`
  query AllCourts {
    courts {
      id
    }
  }
`

export const createSessionMutation = gql`
  mutation CreateSession($courtId: ID!, $start: DateTime!, $end: DateTime!) {
    createSession(input: { courtId: $courtId, start: $start, end: $end }) {
      id
    }
  }
`

export const loginUser = async (): Promise<{
  token: string
  user: { id: string }
}> => {
  const { login } = await request(url, loginMutation, {
    username: 'johndoe',
    password: '00000000'
  })

  return login
}

export interface TestError {
  response: {
    errors: Array<{ name: string; data: any }>
  }
}
