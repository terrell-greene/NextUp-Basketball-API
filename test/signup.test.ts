import { expect } from 'chai'
import * as mongoose from 'mongoose'
import { request } from 'graphql-request'
import gql from 'graphql-tag'

import { url, TestError } from './utils'
import { User } from '../src/db'

const signupMutation = gql`
  mutation SignUp(
    $fullName: String!
    $username: String!
    $password: Password!
    $confirmPassword: Password!
    $avatar: Upload
  ) {
    signup(
      input: {
        fullName: $fullName
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        avatar: $avatar
      }
    ) {
      token
      user {
        id
        username
        avatarUrl
        fullName
      }
    }
  }
`

describe('SignUp Mutation', () => {
  const variables = {
    fullName: 'Test User',
    username: 'test',
    password: '00000000',
    confirmPassword: '00000000'
  }

  let userId: string

  before(async () => {
    await mongoose.connect(process.env.MONGO_URI!, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
  })

  afterEach(async () => {
    await User.findOneAndDelete({ username: variables.username })
  })

  it('should throw an error if space in the username', async () => {
    it('should throw an error if space in the username', async () => {
      try {
        await request(url, signupMutation, {
          ...variables,
          username: 'test user'
        })
      } catch (error) {
        const {
          response: { errors }
        } = error as TestError

        const { name, data } = errors[0]
        expect(name).to.equal('SignUpError')
        expect(data).to.have.property('username')
      }
    })
  })

  it('should throw and error if no password provided', async () => {
    try {
      await request(url, signupMutation, { ...variables, password: ' ' })
    } catch (error) {
      const {
        response: { errors }
      } = error as TestError

      const { name } = errors[0]

      expect(name).to.equal('Invalid Password')
    }
  })

  it('should throw an error for password being under 8 characters', async () => {
    try {
      await request(url, signupMutation, { ...variables, password: '000' })
    } catch (error) {
      const {
        response: { errors }
      } = error as TestError

      const { name } = errors[0]

      expect(name).to.equal('Invalid Password')
    }
  })

  it('should throw an error for password being over 20 characters', async () => {
    try {
      await request(url, signupMutation, {
        ...variables,
        password: '00000000000000000000000'
      })
    } catch (error) {
      const {
        response: { errors }
      } = error as TestError

      const { name } = errors[0]

      expect(name).to.equal('Invalid Password')
    }
  })

  it('should throw an error if passwords do not match', async () => {
    try {
      await request(url, signupMutation, {
        ...variables,
        password: '00000000',
        confirmPassword: '11111111'
      })
    } catch (error) {
      const {
        response: { errors }
      } = error as TestError

      const { name, data } = errors[0]

      expect(name).to.equal('SignUpError')
      expect(data).to.have.property('password')
    }
  })

  it('should return a user and token', async () => {
    const { signup } = await request(url, signupMutation, variables)

    expect(signup).to.have.property('token')
    expect(signup.token).to.be.a('string')

    expect(signup).to.have.property('user')
    expect(signup.user).to.have.property('id')

    userId = signup.user.id
  })
})
