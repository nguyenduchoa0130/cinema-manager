'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            this.hasMany(models.Film, {
                foreignKey: 'categoryId',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            });
        }
    }
    Category.init(
        {
            categoryName: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Category',
        }
    );
    return Category;
};
