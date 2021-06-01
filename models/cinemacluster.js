'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CinemaCluster extends Model {
        static associate(models) {
            this.hasMany(models.Cinema, {
                foreignKey: 'clusterId',
                onDelete: 'SET NULL',
                onUpdate: 'CASCASE',
            });
            this.belongsTo(models.CinemaSystem, {
                foreignKey: 'systemId',
            });
        }
    }
    CinemaCluster.init(
        {
            clusterName: DataTypes.STRING,
            address: DataTypes.STRING,
            systemId: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'CinemaCluster',
        }
    );
    return CinemaCluster;
};
