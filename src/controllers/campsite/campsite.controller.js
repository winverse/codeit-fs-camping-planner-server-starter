import { HTTP_STATUS } from '#constants';
import { validate } from '#middlewares';
import { idParamSchema } from '#schemas';
import { BaseController } from '../base.controller.js';
import { campsiteListQuerySchema, toCampsiteResponse } from './dto/index.js';

export class CampsiteController extends BaseController {
  #campsiteService;

  constructor({ campsiteService }) {
    super();
    this.#campsiteService = campsiteService;
  }

  routes() {
    this.router.get(
      '/',
      validate('query', campsiteListQuerySchema),
      (req, res) => this.list(req, res),
    );
    this.router.get('/:id', validate('params', idParamSchema), (req, res) =>
      this.detail(req, res),
    );
    return this.router;
  }

  async list(req, res) {
    const { pet } = req.query;
    const campsites = await this.#campsiteService.listCampsites(pet);
    res.status(HTTP_STATUS.OK).json(campsites.map(toCampsiteResponse));
  }

  async detail(req, res) {
    const { id } = req.params;
    const campsite = await this.#campsiteService.getCampsite(id);
    res.status(HTTP_STATUS.OK).json(toCampsiteResponse(campsite));
  }
}
