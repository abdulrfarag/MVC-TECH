const User = require('./User');
const Techblog = require('./Techblog');


User.hasMany(Techblog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Techblog.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = {User, Techblog};
