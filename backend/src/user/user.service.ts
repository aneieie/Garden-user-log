import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private readonly databaseService: PrismaService) {

  }

  create(createUserDto: Prisma.UsersCreateInput) {
    return this.databaseService.users.create({ data: createUserDto});
  }

  async findAll(filter: Prisma.UsersWhereInput) {
    return this.databaseService.users.findMany({ 
      where: filter
     });
  }

  async findOne(id: UUID) {
    return this.databaseService.users.findUnique({
      where: {
        id,
      }

    });
  }

  async update(id: UUID, updateUserDto: Prisma.UsersUpdateInput) {
    return this.databaseService.users.update({
      where: {
        id,
      },
      data: updateUserDto
    });
  }

  async remove(id: UUID) {
    return this.databaseService.users.delete( {
      where: {
        id,
      }
    });
  }
}
