'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Film extends Model {
        static associate(models) {
            this.hasOne(models.Image, {
                foreignKey: 'filmId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
            this.belongsTo(models.Category, {
                foreignKey: 'categoryId',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            });
        }
    }
    Film.init(
        {
            filmName: DataTypes.STRING,
            country: DataTypes.STRING,
            releaseYear: DataTypes.STRING,
            duration: DataTypes.STRING,
            director: DataTypes.STRING,
            actors: DataTypes.STRING,
            thumbnail: DataTypes.STRING,
            poster: DataTypes.STRING,
            categoryId: DataTypes.INTEGER,
            desc: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Film',
        }
    );
    return Film;
};
