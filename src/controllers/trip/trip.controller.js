import { HTTP_STATUS } from '#constants';
import { validate } from '#middlewares';
import { idParamSchema } from '#schemas';
import { BaseController } from '../base.controller.js';
import {
  createTripSchema,
  toTripResponse,
  tripListQuerySchema,
  updateTripSchema,
} from './dto/index.js';

export class TripController extends BaseController {
  #tripService;

  constructor({ tripService }) {
    super();
    this.#tripService = tripService;
  }

  routes() {
    this.router.get('/', validate('query', tripListQuerySchema), (req, res) =>
      this.list(req, res),
    );
    this.router.post('/', validate('body', createTripSchema), (req, res) =>
      this.create(req, res),
    );
    this.router.patch(
      '/:id',
      validate('params', idParamSchema),
      validate('body', updateTripSchema),
      (req, res) => this.update(req, res),
    );
    return this.router;
  }

  async list(req, res) {
    const { status } = req.query;
    const trips = await this.#tripService.listTrips(status);
    res.status(HTTP_STATUS.OK).json(trips.map(toTripResponse));
  }

  async create(req, res) {
    const trip = await this.#tripService.createTrip(req.body);
    res.status(HTTP_STATUS.CREATED).json(toTripResponse(trip));
  }

  async update(req, res) {
    const { id } = req.params;
    const trip = await this.#tripService.updateTrip(id, req.body);
    res.status(HTTP_STATUS.OK).json(toTripResponse(trip));
  }
}
