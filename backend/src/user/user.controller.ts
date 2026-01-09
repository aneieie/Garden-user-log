import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, BadRequestException, HttpException, } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, Status } from  '../../generated/prisma/client';
import type { UUID } from 'crypto';

const dateErrorMessage = "Either both a start and end date must be provided or neither";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: Prisma.UsersCreateInput) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  findAll(
  @Query('name') name: string, 
  @Query('startDate') from: Date, 
  @Query('endDate') to: Date, 
  @Query('status') status: Status) {

    if ((from === undefined && to != undefined) || (from != undefined && to === undefined)) {
      throw new HttpException(dateErrorMessage, 400);
    }

    const filter: Prisma.UsersWhereInput = {  //https/server/user/?id=2
        createdAt: {
          gte: from,
          lte: to,
        },
        name: {
          contains: name,
        },
        status: status,
      }

      //if from provided but not to -> throw error
    return this.userService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: UUID) {

    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: UUID, @Body() updateUserDto: Prisma.UsersUpdateInput) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.userService.remove(id);
  }


  private validateStatus(status: string): boolean {
    if ((status === "ACTIVE") || (status === "INACTIVE") || (status === "SUSPENDED")) {
      return true;
    }
    return false;
  }
}
