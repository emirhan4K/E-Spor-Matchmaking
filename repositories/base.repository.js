class BaseRepository {
  constructor(model) {
    this.model = model;
  }
  async getById(id) { //İdye göre bul
    return await this.model.findById(id)
  }

  async getAll() { //Tüm kayıtları getir
    return await this.model.find();
  }

  async create(data) {
    return await this.model.create(data);
  }

  async delete(id) { 
    return await this.model.findByIdAndDelete(id);
  }
}

module.exports = BaseRepository;