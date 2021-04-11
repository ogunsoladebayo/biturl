'use strict';
module.exports = function (sequelize, DataTypes) {
	var Url = sequelize.define('urls', {
		id: { type: DataTypes.STRING(6), allowNull: false, primaryKey: true },
		link: { type: DataTypes.STRING, allowNull: false }
	});
	return Url;
};
