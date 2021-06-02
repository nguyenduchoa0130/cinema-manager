'use strict';
const _ = require('lodash');
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
            this.belongsTo(models.StatusFilm, {
                foreignKey: 'statusId',
            });
        }
    }
    Film.init(
        {
            filmName: {
                type: DataTypes.STRING,
                get() {
                    return _.capitalize(this.getDataValue('filmName'));
                },
                set(value) {
                    this.setDataValue('filmName', value.toLowerCase());
                },
            },
            country: DataTypes.STRING,
            releaseYear: DataTypes.STRING,
            duration: DataTypes.STRING,
            director: DataTypes.STRING,
            actors: DataTypes.STRING,
            thumbnail: DataTypes.STRING,
            poster: DataTypes.STRING,
            trailer: DataTypes.STRING,
            premiere: DataTypes.DATE,
            desc: DataTypes.STRING,
            categoryId: DataTypes.INTEGER,
            statusId: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Film',
            hooks: {
                beforeCreate(film, options) {
                    let now = new Date();
                    let premiere = new Date(film.premiere);
                    if (now.getTime() < premiere.getTime()) {
                        film.statusId = 'SAP_CONG_CHIEU';
                    } else {
                        film.statusId = 'DANG_CONG_CHIEU';
                    }
                },
            },
        }
    );
    return Film;
};
