const { NotFoundError } = require('../../shared/errors');
const User = require('./User');
const bcrypt = require('bcryptjs');

const editUser = async ({ id, ...changes }) => {
  const existing = await User.findById(id);

  if (!existing) {
    throw new NotFoundError('Foydalanuvchi topilmadi.');
  };

  let values = {};

  if (changes.password) {
    values.password = await bcrypt.hash(changes.password, 10);
  };

  return await User.findByIdAndUpdate(id, { ...changes, ...values });
};

module.exports = editUser;