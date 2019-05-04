const product = (sequelize, DataTypes) => {
  const Product = sequelize.define('products', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true
    },
    price: {
      type: DataTypes.INTEGER
    },
  }, {
    timestamps: false
});

  return Product;
};

module.exports = product;
