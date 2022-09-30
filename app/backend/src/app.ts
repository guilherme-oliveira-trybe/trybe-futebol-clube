import * as express from 'express';
import 'express-async-errors';
import * as cors from 'cors';
import errorMiddleware from './middlewares/errors';
import * as routes from './routes';

class App {
  public app: express.Express;
  // private _loginRoute = new LoginRoute();

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(accessControl);
    this.app.use('/login', routes.loginRoute);
    this.app.use('/teams', routes.teamRoute);
    this.app.use('/matches', routes.matchRoute);
    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
