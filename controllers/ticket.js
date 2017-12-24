var express = require('express');
var router = express.Router();
var ticketsModel = require.main.require('./models/ticket-model');

router.get('/', function(request, response){
	ticketsModel.getAll(function(result){
		var data = {
			catList: result
		};
		response.render('tickets/index', data);
	});

});





router.get('/purchase/:id', function(request, response){
	var concertId = request.params.id;
	ticketsModel.get(concertId, function(ticket){
		//console.log(ticket.ticketQuantity);
		response.render('tickets/purchase', ticket);
	});

});

router.post('/purchase/:id', function(request, response){






		var convertedconcertdate = new Date(request.body.concertdatetime)
		var currentDate = new Date();
		var cat = {
		userId: request.body.concertno,
		userName: request.body.name,
		userEmail: request.body.email,
		userMobile: request.body.mobile,
		concertName: request.body.concertname,
		concertDateTime: convertedconcertdate,
		issueDate: currentDate,
		concertVenue: request.body.concertvanue,
		ticketQuantity: request.body.num,
		totalPrice: request.body.totalPrice
	};

		//-----------------------------------------
		var quan = cat.ticketQuantity
		//console.log(quan);

		var concertId = request.params.id;
		ticketsModel.get(concertId, function(ticket){
			var tquan = ticket.ticketQuantity;
			//console.log(tquan);
			var fquan = tquan - quan;
			console.log(fquan);
			var concert = {
					concertNo: ticket.concertNo,
					bandName: ticket.bandName,
					concertName: ticket.concertName,
					concertDateTime: ticket.concertDateTime,
					concertVenue: ticket.concertVenue,
					ticketQuantity: fquan,
					perTicketPrice: ticket.perTicketPrice
				};

				ticketsModel.update(concert, function(success){
					if(success)
					{
						//response.redirect('/concert');
						//response.send('okk');
						console.log('okk');
					}
					else
					{
						response.send('Error inserting data');
					}
				});

		});





		//------------------------------------------

	ticketsModel.insert(cat, function(success){
		if(success)
		{
			var uid = {
				id: request.body.mobile
			};
			response.render('tickets/print', uid);
		}
		else
		{
			response.send('Error inserting data');
		}
	});

});


router.get('/print/:id', function(request, response){
	var userMobileNo = request.params.id;
	ticketsModel.getTicket(userMobileNo, function(ticket){
		response.render('tickets/download', ticket);
	});

});

module.exports = router;
