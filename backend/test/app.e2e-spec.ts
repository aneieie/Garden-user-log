import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('add a basic user', async () => {

    const user = {
      name: "Gina",
      email: "10ginahale@gmail.com",
      status: "ACTIVE"
    };

    const response = request(app.getHttpServer()).post('/users/create').send(user).expect(202);

    //expect(response.body).toMatchObject()
  })


});
