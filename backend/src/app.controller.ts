import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { throwError } from 'rxjs';
import { UUID } from 'crypto';

@Controller('user')
export class AppController {
  constructor(private appService: AppService) {}


  @Get('/:id')
  fetchUser(@Param('id') id: string) {
    //if an id is provided - will return only that user
    //if nothing 
    return this.appService.fetchUser(id);
  }

  @Get()
  fetchUsers(): string {
    return 'hello';
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string): void {
    //check ID exists - NotFoundException
    //check if user has already been deleted - ForbiddenException
    
  }


  @Post()
  createNewUser(): void {
  }


  @Patch('/:id')
  updateUser(@Param('id') id: string): void {
    
  }


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
