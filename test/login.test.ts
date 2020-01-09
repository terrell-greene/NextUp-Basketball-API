import { expect } from 'chai'
import { request } from 'graphql-request'

import { url, loginMutation, TestError } from './utils'

describe('Login Mutation', () => {
  const variables = {
    username: 'johndoe',
    password: '00000000'
  }

  it('should throw an error for not providing a username', async () => {
    try {
      await request(url, loginMutation, { ...variables, username: ' ' })
    } catch (error) {
      const {
        response: { errors }
      } = error as TestError

      const { name } = errors[0]

      expect(name).to.equal('LoginError')
    }
  })

  it('should trow an error if no user found', async () => {
    try {
      await request(url, loginMutation, { ...variables, username: 'nouser' })
    } catch (error) {
      const {
        response: { errors }
      } = error as TestError

      const { name, data } = errors[0]

      expect(name).to.equal('LoginError')
      expect(data).to.have.property('password')
    }
  })

  it("should throw an error if password isn't correct", async () => {
    try {
      await request(url, loginMutation, { ...variables, password: '000' })
    } catch (error) {
      const {
        response: { errors }
      } = error as TestError

      const { name, data } = errors[0]

      expect(name).to.equal('LoginError')
      expect(data).to.have.property('password')
    }
  })

  it('should return a token and user', async () => {
    const {
      login: { token, user }
    } = await request(url, loginMutation, variables)

    expect(token).to.be.a('string')
    expect(user).to.have.property('id')
  })
})
