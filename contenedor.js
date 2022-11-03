const fs = require("fs");

class Container {
  constructor(path) {
    this.fileName = path;
  }

  async save(product) {
    const products = await this.getAll();

    try {
      let id;
      products.length === 0
        ? (id = 1)
        : (id = products[products.length - 1].id + 1);
      const newProduct = { ...product, id };
      products.push(newProduct);
      await this.writeFile(products);
      return newProduct.id;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    const products = await this.getAll();
    try {
      const product = products.find((prod) => prod.id === id);
      return product ? product : null;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductRandom() {
    const products = await this.getAll();
    try {
      let idRandom = Math.round(Math.random() * (products.length - 1)) + 1;
      const product = products.find((prod) => prod.id === idRandom);
      return product ? product : null;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const products = await fs.promises.readFile(this.fileName, "utf-8");
      return JSON.parse(products);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    const products = await this.getAll();
    try {
      const newProducts = products.filter((prod) => prod.id !== id);
      await this.writeFile(newProducts);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    await this.writeFile([]);
  }

  async writeFile(data) {
    try {
      await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, 2));
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Container;
