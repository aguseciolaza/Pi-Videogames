const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    released: {
      type: DataTypes.DATEONLY
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        max: 5,
        min: 0
      }
    },
    background_image: {
      type: DataTypes.STRING
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false
    }, 
    createdInDb: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'db'
    }
  },{
      timestamps: false
    });
};
