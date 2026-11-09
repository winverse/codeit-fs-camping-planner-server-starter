import { ERROR_MESSAGE, TRIP_STATUS_TRANSITIONS } from '#constants';
import { ConflictException, NotFoundException } from '#exceptions';

export class TripService {
  #tripRepository;

  constructor({ tripRepository }) {
    this.#tripRepository = tripRepository;
  }

  async listTrips(status) {
    return this.#tripRepository.findMany(status);
  }

  async getTrip(id) {
    const trip = await this.#tripRepository.findById(id);
    if (trip === null) {
      throw new NotFoundException(ERROR_MESSAGE.TRIP_NOT_FOUND);
    }
    return trip;
  }

  async createTrip(data) {
    const trip = await this.#tripRepository.create(data);
    return this.getTrip(trip.id);
  }

  async updateTrip(id, data) {
    const trip = await this.getTrip(id);

    if (
      data.status !== undefined &&
      !TRIP_STATUS_TRANSITIONS[trip.status].includes(data.status)
    ) {
      throw new ConflictException(ERROR_MESSAGE.TRIP_STATUS_CHANGE_NOT_ALLOWED);
    }

    const nextStatus = data.status ?? trip.status;
    if (data.rating !== undefined && nextStatus !== 'done') {
      throw new ConflictException(ERROR_MESSAGE.TRIP_RATING_NOT_ALLOWED);
    }

    await this.#tripRepository.update(id, data);
    return this.getTrip(id);
  }
}
