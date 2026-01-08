import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

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
      updated: '07/01/26'
    }
  }

  fetchUsers() {
    return [
      {

      },
      {

      }
    ]
  }

  deleteUser(id: string): void {

  }


  updateUser(id: string, name: string, status: string, role: string, email: string): void {

  }

  addUser(name: string, email: string, status: string, role: string,): void {

  }


  getHello(): string {
    return 'Hello Annie!';
  }
}
