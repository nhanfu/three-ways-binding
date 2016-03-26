var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  mayte       : String,
  ho          : String,
  ten         : String,
  gioitinh    : String,
  ngaysinh    : { type: Date, default: Date.now },
  diachi      : String,
  sodienthoai : String,
  nghenghiep  : String
});

var User = mongoose.model('User', userSchema);

// User.statics.findByMayte = function (mayte, done) {
//   return this.findOne({ mayte: mayte }, function (err, person) {
//     done(err, person);
//   });
// }

module.exports = User;