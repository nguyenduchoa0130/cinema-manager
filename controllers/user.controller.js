const models = require('../models/index').sequelize.models;
const { Op } = require('sequelize');
const helper = require('../config/helper');
const bcrypt = require('bcrypt');
const apiError = require('../errors/apiError');
class UserController {
    async fetchAll(req, res, next) {
        try {
            let users = await models.User.findAll({
                attributes: {
                    exclude: helper.ignoreColumns('createdAt', 'updatedAt', 'password'),
                },
                include: [
                    {
                        model: models.Role,
                        require: true,
                        attributes: ['name'],
                    },
                ],
                raw: true,
            });
            if (users.length) {
                return res.json({ users });
            } else {
                return next(apiError.notFound('Không tìm thầy người dùng'));
            }
        } catch (err) {
            next(err);
        }
    }
    async fetchById(req, res, next) {
        let id = req.params.id;
        if (!helper.isValidID(id)) {
            return next(apiError.badRequest('ID người dùng không hợp lệ'));
        }
        try {
            let user = await models.User.findByPk(id, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
                include: [
                    {
                        model: models.Role,
                        require: true,
                        attributes: ['name'],
                    },
                ],
                raw: true,
            });
            if (user) {
                return res.json({ user });
            } else {
                return next(apiError.notFound('Không tìm thầy người dùng!'));
            }
        } catch (err) {
            return next(err);
        }
    }
    async fetchByRole(req, res, next) {
        let roleId = req.query.roleId;
        if (!roleId) {
            return next();
        }
        if (!helper.isValidID(roleId)) {
            return next(apiError.badRequest('Id vai trò không hợp lệ'));
        }
        try {
            let users = await models.User.findAll({
                attributes: {
                    exclude: helper.ignoreColumns('createdAt', 'updatedAt', 'password'),
                },
                include: [
                    {
                        model: models.Role,
                        require: true,
                        attributes: [['roleName', 'name']],
                        where: {
                            id: roleId,
                        },
                    },
                ],
                raw: true,
            });
            if (!users.length) return next(apiError.notFound('Không tìm thấy người dùng'));
            return res.json({ users });
        } catch (err) {
            next(err);
        }
    }
    async fetchByKey(req, res, next) {
        let key = req.query.key;
        if (!key) {
            return next();
        }
        if (!key.length) {
            return next(apiError.badRequest('Từ khóa người dùng không hợp lệ'));
        }
        try {
            let rows = await models.User.findAll({
                attributes: {
                    exclude: helper.ignoreColumns('createdAt', 'updatedAt', 'password'),
                },
                include: [
                    {
                        model: models.Role,
                        require: true,
                        attributes: [['roleName', 'name']],
                    },
                ],
                raw: true,
            });
            let users = rows.filter((user) => {
                delete user['Role.name'];
                let str = helper.removeAccents(JSON.stringify(user));
                return str.includes(helper.removeAccents(key));
            });
            if (!users.length) {
                return next(apiError.notFound('Không tìm thấy người dùng'));
            } else {
                return res.json({ users });
            }
        } catch (err) {
            return next(err);
        }
    }
    async add(req, res, next) {
        let data = req.body;
        try {
            let rows = await Promise.all([models.User.findAll({ where: { email: data.email } }), helper.isValidEmail(data.email)]);
            if (!rows[1]) return next(apiError.badRequest('Email không tồn tại'));
            if (rows[0].length) return next(apiError.conflict('Email đã được sử dụng cho 1 tài khoản khác'));
            data.password = await bcrypt.hash(data.password, 10);
            let user = await models.User.create({
                ...data,
                isActive: true,
            });
            return res.json({ msg: 'Tạo người dùng thành công', user });
        } catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        let id = req.params.id;
        if (!helper.isValidID(id)) return next(apiError.badRequest('ID truyền vào không hợp lệ!!'));
        let data = req.body;
        try {
            let user = await models.User.findByPk(id);
            if (!user) return next(apiError('Không tìm thấy người dùng'));
            if ('password' in data) {
                user.password = await bcrypt.hash(data.password, 10);
                delete data.password;
            }
            for (let prop in data) {
                user[prop] = data[prop];
            }
            await user.save();
            return res.json({ msg: 'Cập nhật thành công' });
        } catch (err) {
            next(err);
        }
    }
    async delete(req, res, next) {
        let id = req.params.id;
        if (!helper.isValidID) return next(apiError.badRequest('ID không hợp lệ'));
        if (req.dataToken.userId == id) {
            return next(apiError.notAuthorized('Không thể xóa tài khoản của chính mình'));
        }
        try {
            let user = await models.User.findByPk(id);
            if (user) {
                await user.destroy();
                return res.status(200).json({ msg: 'Xóa thành công' });
            } else {
                return next(apiError.notFound('Người dùng không tồn tại'));
            }
        } catch (err) {
            return next(err);
        }
    }
}
module.exports = new UserController();
