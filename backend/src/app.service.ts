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



  getHello(): string {
    return 'Hello Annie!';
  }
}
