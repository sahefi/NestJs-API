import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";

import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";

describe('Authenticate Test Dot', () => {
    let app:INestApplication;
  
    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
  
      app = moduleFixture.createNestApplication();
      await app.init();
    });
    
    it('/user (GET) - should return unauthorized without token', () => {
        return request(app.getHttpServer())
          .get('/user')
          .expect(401);
      });

    it('/user (GET) - should return user data with valid token', async () => {
        const authResponse = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            username: 'baban',
            password: '123',
        });
    
        const token = authResponse.body.data.token
        
        return request(app.getHttpServer())
          .get('/user')
          .set('Authorization',token)
          .expect(200)
          .expect((response) => {
            expect(response.body).toBeDefined();
            expect(response.body.message).toBe('Success');
            // Tambahkan assersts lain sesuai kebutuhan
        });

    });
    
    afterAll(async () => {
        await app.close();
    });
})
