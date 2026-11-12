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

  // 상태 조건까지 UPDATE 문 하나에 넣으므로, 읽은 뒤 다른 요청이 상태를 바꿨다면 0을 돌려줍니다
  async update(id, status, data) {
    return this.#db.orm.public.Trip.where({ id, status }).updateAndCount(data);
  }
}
