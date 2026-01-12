import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  fetchUser(id: string) {
    return {
      id: id,
      name: '',
      email: 'jwbevbwiv',
      status: 'ACCEPTED',
      role: 'POO',
      created: '06/01/26',
      updated: '07/01/26',
    };
  }

  fetchUsers() {
    return [{}, {}];
  }

  deleteUser(id: string): void {
    console.log(id);
  }

  updateUser(data: {
    id: string;
    name: string;
    status: string;
    role: string;
    email: string;
  }): void {
    console.log(data);
  }

  addUser(data: {
    name: string;
    email: string;
    status: string;
    role: string;
  }): void {
    console.log(data);
  }

  getHello(): string {
    throw new HttpException('helloooooooooo', 404);
  }
}
