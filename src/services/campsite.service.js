import { ERROR_MESSAGE } from '#constants';
import { NotFoundException } from '#exceptions';
import { toCampsiteData } from '#mappers';

export class CampsiteService {
  #goCampingProvider;
  #campsiteRepository;

  constructor({ goCampingProvider, campsiteRepository }) {
    this.#goCampingProvider = goCampingProvider;
    this.#campsiteRepository = campsiteRepository;
  }

  async listCampsites(petAllowed) {
    return this.#campsiteRepository.findMany(petAllowed);
  }

  async getCampsite(id) {
    const campsite = await this.#campsiteRepository.findById(id);
    if (campsite === null) {
      throw new NotFoundException(ERROR_MESSAGE.CAMPSITE_NOT_FOUND);
    }
    return campsite;
  }

  async syncCampsites() {
    const items = await this.#goCampingProvider.fetchCampsites();

    for (const item of items) {
      await this.#campsiteRepository.upsertByContentId(toCampsiteData(item));
    }

    return items.length;
  }
}
