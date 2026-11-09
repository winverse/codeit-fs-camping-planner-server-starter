import express from 'express';
import { cors, errorHandler } from '#middlewares';

export class App {
  constructor(controller) {
    this.app = express();
    this.middleware();
    this.routes(controller);
    this.errorHandling();
  }

  middleware() {
    this.app.use(cors);
    this.app.use(express.json());
  }

  routes(controller) {
    this.app.use('/api', controller.routes());
  }

  errorHandling() {
    this.app.use(errorHandler);
  }

  listen(port) {
    return new Promise((resolve, reject) => {
      this.app.listen(port, (error) => {
        if (error) {
          reject(error);
          return;
        }
        console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
        resolve();
      });
    });
  }
}
