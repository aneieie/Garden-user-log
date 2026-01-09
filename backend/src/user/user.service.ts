import { HttpException, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'prisma/prisma.service';

const ERROR_MESSAGE = {
  repeatedEmail: "This email has already been taken",
  invalidStatus: "The status is not one of ACTIVE/INACTIVE/SUSPENDED",
  invalidEmail: "The email is not in a valid format",
  invalidRole: "Role must be one of USER/ADMIN",
  invalidDate: "Date is not in a valid format",
  userNotFound: "User with this ID not found",
  invalidName: "Name is not between 2 and 100 characters",


}

const ERROR_CODE = {
  repeatedEmail: 409,
  invalidStatus: 400,
  invalidEmail: 400,
  invalidRole: 400,
  invalidDate: 400,
  userNotFound: 404,
  invalidName: 400
}

@Injectable()
export class UserService {

  constructor(private readonly databaseService: PrismaService) {

  }

  async create(createUserDto: Prisma.UsersCreateInput) {

    //check the email is in valid form 
    if (!this.validateEmail(createUserDto.email)) {
      throw new HttpException(ERROR_MESSAGE.repeatedEmail, ERROR_CODE.repeatedEmail);
    }

    //check name is in valid form
    if (!this.validateName(createUserDto.name)) {
      throw new HttpException(ERROR_MESSAGE.invalidName, ERROR_CODE.invalidName);
    }

    //see if the email already exists in the database
    try {
      return await this.databaseService.users.create({ data: createUserDto});
    } catch (e: unknown) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(ERROR_MESSAGE.repeatedEmail, ERROR_CODE.repeatedEmail);
      }
    }
  }

  async findAll(filter: Prisma.UsersWhereInput) {

    

    
    return this.databaseService.users.findMany({ 
      where: filter
     });
  }


  /**
   * Attempts to find the user in the database with the provided UUID. If none is found, throws a
   * HttpsException
   * @param id 
   * @returns 
   */
  async findOne(id: UUID) {
    let user = await this.databaseService.users.findUnique({
      where: {
        id: id,
      }
    });
    
    //checking if a user was found 
    if (!user) {
      throw new HttpException(ERROR_MESSAGE.userNotFound, 404);
    }
    return user;

  }


  async update(id: UUID, updateUserDto: Prisma.UsersUpdateInput) {

    return await this.findUser(() => this.databaseService.users.update({
      where: {
        id,
      },
      data: updateUserDto
    }));
  }


  /**
   * Soft deletes the provided user - updates the 
   * @param id 
   * @returns 
   */
  async remove(id: UUID) {

    const softRemove: Prisma.UsersUpdateInput = {
      deletedAt: new Date()
    }

    return await this.findUser(() => this.databaseService.users.update( {
      where: {
        id: id,
      },
      data: softRemove,
    }));
  }


  async reviveUser(id: UUID) {

    const revive: Prisma.UsersUpdateInput = {
      deletedAt: null
    }
    
    return await this.findUser(() => this.databaseService.users.update( {
      where: {
        id: id,
      },
      data: revive,
    }));


  }

  /**
   * 
   * @param fn - function that could potentially throw a Prisma.PrismaClientKnownRequestError
   */
  private async findUser<T>(fn: () => Promise<T>): Promise<T> {

    try {
      return await fn();
    } catch (e: unknown) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(ERROR_MESSAGE.userNotFound, ERROR_CODE.userNotFound);
      } else {
        throw e; //don't want to mask the error if it's something else
      }

    }
  }

  private validateEmail(email: string): boolean {
    //does this do what I think it does??
    return !!String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  }

  private validateName(name: string): boolean {
    return !(name.length < 2 || name.length > 100); 
  }
}
