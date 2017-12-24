var db = require('./db');

module.exports = {
	getAll: function(callback){
		var sql = "SELECT * FROM bandconcerts";
		db.getResult(sql,null, function(result){
			callback(result);
		});
	},

	get: function(concertId, callback){
		var sql = "SELECT * FROM bandconcerts WHERE concertNo=?";
		db.getResult(sql, [concertId], function(result){
			callback(result[0]);
		});
	},

	getTicket: function(userMobileNo, callback){
		var sql = "SELECT * FROM tickets WHERE userMobileNo=?";
		db.getResult(sql, [userMobileNo], function(result){
			callback(result[0]);
		});
	},

	insert: function(ticket, callback){
		var sql = "INSERT INTO tickets VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		db.executeGetId(sql, [ticket.userName, ticket.userEmail, ticket.userMobile, ticket.concertName, ticket.concertDateTime, ticket.issueDate, ticket.concertVenue, ticket.ticketQuantity, ticket.totalPrice], function(id){
			if(id <= 0)
			{
				callback(false);
			}
			else
			{
				callback(true);
			}
		});
	},

	//-----------------------------
	update: function(concert, callback){
		var sql = "UPDATE bandconcerts SET bandName=?, concertName=?, concertDateTime=?, concertVenue=?, ticketQuantity=?, perTicketPrice=? WHERE concertNo=?";
		db.execute(sql, [concert.bandName, concert.concertName, concert.concertDateTime, concert.concertVenue, concert.ticketQuantity, concert.perTicketPrice, concert.concertNo], function(flag){
			callback(flag);
		});
	},
	//------------------------------


};
