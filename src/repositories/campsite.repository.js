export class CampsiteRepository {
  #db;

  constructor({ db }) {
    this.#db = db;
  }

  async findMany(petAllowed) {
    return this.#db.orm.public.Campsite.where({ petAllowed })
      .orderBy((c) => c.id.asc())
      .all();
  }

  async findById(id) {
    return this.#db.orm.public.Campsite.where({ id }).first();
  }

  async upsertByContentId(data) {
    return this.#db.orm.public.Campsite.upsert({
      create: data,
      update: data,
      conflictOn: { contentId: data.contentId },
    });
  }
}
