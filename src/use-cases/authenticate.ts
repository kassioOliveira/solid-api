import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invalid-credentials-errors'
import { compare } from 'bcryptjs'

interface AUthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRespository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AUthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRespository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }
    const doestPasswordMatches = await compare(password, user.password_hash)

    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
