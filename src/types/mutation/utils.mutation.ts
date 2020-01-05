import { sign } from 'jsonwebtoken'

import { APP_SECRET } from '../../utils'

export const createToken = async (userId: string) => {
  const token = await sign({ userId }, APP_SECRET)

  return token
}
