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