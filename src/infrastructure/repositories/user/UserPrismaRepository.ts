import { User as PrismaUser, PrismaClient } from '@prisma/client'
import User from '../../../core/entities/User'

class UserPrismaRepository {
  constructor(private prisma: PrismaClient) {}

  public static mapToUser(prismaUser: PrismaUser): User {
    const p = new User()
    p.id = prismaUser?.id
    p.name = prismaUser?.name
    p.email = prismaUser?.email
    p.createdAt = prismaUser?.createdAt
    p.updatedAt = prismaUser?.updatedAt

    return p
  }
}

export default UserPrismaRepository
