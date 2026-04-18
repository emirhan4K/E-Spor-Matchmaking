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
  async update(id, data) {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }
  async getManyByIds(ids) { // Birden fazla ID'ye göre kayıtları getir
    return await this.model.find({ _id: { $in: ids } }); // $in operatörünü kullanarak belirtilen ID'lerden herhangi birine sahip kayıtları getir
  }
}

module.exports = BaseRepository;