var User = require('../domains/user');


User.findOne({ mayte: 'starlord55' }, function(err, user) {
  if (err) throw err;

  // object of the user
  console.log(user);
});
