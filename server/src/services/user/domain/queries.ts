import { LoginUserMutationArgs } from '../../@types/types'
import { UserRepository } from '../repository'

const loginUser = async ({ email, password }: LoginUserMutationArgs) => {
  try {
    const user = await UserRepository.findByCondition(
      { email },
      { password: true }
    )
    if (!user) throw new Error('email and password does not match ')
    if (!(await user.comparePassword(password))) {
      throw new Error('email and password does not match ')
    }
    return user.generateToken()
  } catch (e) {
    throw new Error(e)
  }
}

export const UserDomain = {
  loginUser
}
