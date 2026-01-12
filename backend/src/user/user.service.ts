import { HttpException, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { filterUserDTO } from '../dto/requests';
import { ERROR_CODE, ERROR_MESSAGE } from 'src/constants';
import { filter } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: PrismaService) {}

  async create(createUserDto: Prisma.UsersCreateInput) {
    //check the email is in valid form
    if (!this.validateEmail(createUserDto.email)) {
      throw new HttpException(
        ERROR_MESSAGE.invalidEmail,
        ERROR_CODE.invalidEmail,
      );
    }

    //check name is in valid form
    if (!this.validateName(createUserDto.name)) {
      throw new HttpException(
        ERROR_MESSAGE.invalidName,
        ERROR_CODE.invalidName,
      );
    }

    //see if the email already exists in the database
    try {
      return await this.databaseService.users.create({ data: createUserDto });
    } catch (e: unknown) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(
          ERROR_MESSAGE.repeatedEmail,
          ERROR_CODE.repeatedEmail,
        );
      }
    }
  }

  async findAll(filters: filterUserDTO) {

    let page: number = 1;
    let limit: number = 10;

    const where: Prisma.UsersWhereInput = this.getWhere(filters);
    if (filters) {
      filters.page && (page = filters.page);
      filters.limit && (limit = filters.limit);
    }

    return await this.filterErrors(() =>
      this.databaseService.users.findMany({ 
        where,
        skip: (page - 1) * limit,
        take: limit
       }),
    );
  }

  async findOne(id: UUID) {
    const user = await this.databaseService.users.findUnique({
      where: {
        id: id,
        deletedAt: null,
      },
    });

    if (!user) {
      throw new HttpException(ERROR_MESSAGE.userNotFound, 404);
    }
    return user;
  }


  /**
   * Updates the user to have the information provided
   * @param id 
   * @param updateUserDto 
   * @returns 
   */
  async update(id: UUID, updateUserDto: Prisma.UsersUpdateInput) {
    if (!updateUserDto.id) {
      throw new HttpException(
        ERROR_MESSAGE.idNotProvided,
        ERROR_CODE.idNotProvided,
      );
    }

    return await this.filterErrors(() =>
      this.databaseService.users.update({
        where: {
          id: id,
        },
        data: updateUserDto,
      }),
    );
  }

  /**
   * Soft deletes the provided user - updates the deletedAt field to be the current date
   * @param id
   * @returns
   */
  async remove(id: UUID) {
    const softRemove: Prisma.UsersUpdateInput = {
      deletedAt: new Date(),
    };

    return await this.filterErrors(() =>
      this.databaseService.users.update({
        where: {
          id: id,
        },
        data: softRemove,
      }),
    );
  }

  /**
   * "Revives a user by setting their deletedAt field to null"
   * @param id - ID of the user
   * @returns 
   */
  async reviveUser(id: UUID) {
    const revive: Prisma.UsersUpdateInput = {
      deletedAt: null,
    };

    return await this.filterErrors(() =>
      this.databaseService.users.update({
        where: {
          id: id,
        },
        data: revive,
      }),
    );
  }

  /**
   *
   * @param fn - function that could potentially throw a Prisma.PrismaClientKnownRequestError
   */
  private async filterErrors<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (e: unknown) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(
          ERROR_MESSAGE.userNotFound,
          ERROR_CODE.userNotFound,
        );
      } else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
        throw new HttpException(
          ERROR_MESSAGE.somethingWentWrong,
          ERROR_CODE.somethingWentWrong,
        );
      } else if (e instanceof Prisma.PrismaClientValidationError) {
        throw new HttpException(
          ERROR_MESSAGE.invalidSyntax,
          ERROR_CODE.invalidSyntax,
        );
      } else {
        throw e; //don't want to mask the error if it's something else
      }
    }
  }

  private validateEmail(email: string): boolean {
    //using regex to verify that the email is in the correct form
    return !!String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  }

  private validateName(name: string): boolean {
    return !(name.length < 2 || name.length > 100);
  }

  //gets the appropriate where clause based off the filters provided
  private getWhere(filters: filterUserDTO): Prisma.UsersWhereInput {
    let page: number = 1;
    let limit: number = 10;

    const where: Prisma.UsersWhereInput = {
      deletedAt: null,
    };

    if (!filters) {
      return where;
    }

    if (filters.name) {
      where.name = {
        contains: filters.name,
        mode: 'insensitive',
      };
    }

    //ensure either both provided or neither provided

    if ((filters.startDate && !filters.endDate) || (!filters.startDate && filters.endDate)) {
      throw new HttpException(ERROR_MESSAGE.invalidDates, ERROR_CODE.invalidDates);
    }

    //error check that the start and end date are valid
    if (filters.startDate && filters.endDate) {
      if (filters.startDate > filters.endDate) {
        throw new HttpException(
          ERROR_MESSAGE.invalidDate,
          ERROR_CODE.invalidDate,
        );
      }

      where.createdAt = {
        gte: filters.startDate,
        lte: filters.endDate,
      };
    }

    if (filters.status) {
      where.status = filters.status;
    }

    return where;
  }
}
