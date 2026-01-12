import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, BadRequestException, HttpException, } from '@nestjs/common';
import { UserService } from './user.service';
import { filterUserDTO } from '../filterUserDTO'
import { Prisma, Status } from  '../../generated/prisma/client';
import type { UUID } from 'crypto';

const dateErrorMessage = "Either both a start and end date must be provided or neither";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async create(@Body() createUserDto: Prisma.UsersCreateInput) {
    return await this.userService.create(createUserDto);
  }

  @Post()
  async findAll(@Body() filters: filterUserDTO) {

    // if ((!filters.startDate && filters.endDate) || (filters.startDate && !filters.endDate)) {
    //   throw new HttpException(dateErrorMessage, 400);
    // }
      //if from provided but not to -> throw error
    return await this.userService.findAll(filters);
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
