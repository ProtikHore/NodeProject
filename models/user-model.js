var db = require('./db');

module.exports = {
	validate: function(user, callback){
		var sql = "SELECT * FROM accounts WHERE username=? AND password=?";
		db.getResult(sql, [user.username, user.password], function(result){
			if(result.length > 0)
			{
				callback(true);
			}
			else
			{
				callback(false);
			}
		});
	}
};
