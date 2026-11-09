export class TripRepository {
  #db;

  constructor({ db }) {
    this.#db = db;
  }

  // 캠핑 계획과 함께 캠핑장의 id·이름·이미지를 가져오는 쿼리입니다
  #withCampsite() {
    return this.#db.orm.public.Trip.include('campsite', (campsite) =>
      campsite.select('id', 'name', 'imageUrl'),
    );
  }

  async findMany(status) {
    return this.#withCampsite()
      .where({ status })
      .orderBy((t) => t.createdAt.desc())
      .all();
  }

  async findById(id) {
    return this.#withCampsite().where({ id }).first();
  }

  async create(data) {
    return this.#db.orm.public.Trip.create(data);
  }

  async update(id, data) {
    return this.#db.orm.public.Trip.where({ id }).update(data);
  }
}
