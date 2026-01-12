import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import type { UUID } from 'crypto';

import { Prisma } from 'prisma/generated/prisma/client';
import { UserService } from './user.service';
import { filterUserDTO } from '../dto/requests';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async create(@Body() createUserDto: Prisma.UsersCreateInput) {
    return await this.userService.create(createUserDto);
  }

  @Post()
  async findAll(@Body() filters: filterUserDTO) {
    return await this.userService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateUserDto: Prisma.UsersUpdateInput,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.userService.remove(id);
  }

  private validateStatus(status: string): boolean {
    if (
      status === 'ACTIVE' ||
      status === 'INACTIVE' ||
      status === 'SUSPENDED'
    ) {
      return true;
    }
    return false;
  }
}
