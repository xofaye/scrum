
var showFormInput = function() {
	var form = $(".form-group");
	for (var i=0; i<form.length; i++){
		if (form[i].style.display == "none"){
		    form[i].style.display = "block";
		}
		else {
		    form[i].style.display = "none";
		}
	}
}

var showForm = function() {
	var form = $("#editEvent");
	if (form[0].style.display == "none"){
		form[0].style.display = "block";
	}
	else {
		form[0].style.display = "none"
	}
}


$(document).ready(function() {
 	console.log('loaded');

 	$('#datetimepicker1').datetimepicker();

 	$('#deleteEvent').on('click',function(e){
        e.preventDefault();
        var form = $(this).parents('form');
          swal({
              title: "Are you sure?",
              type: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes",
              closeOnConfirm: false
          }, function(confirmed){
              if (confirmed) form.submit();
          });
      });

	$('#deleteUser').on('click',function(e){
	    e.preventDefault();
	    var form = $(this).parents('form');
	    swal({
	        title: "Are you sure?",
	        text: "You will not be able to see or join any more events",
	        type: "warning",
	        showCancelButton: true,
	        confirmButtonText: "Yes, I'm leaving!",
	        closeOnConfirm: false
	    }, function(confirmed){
	        if (confirmed) form.submit();
	    });
	});

 	$('.rsvp').on('click', function(e){
 		e.preventDefault();
 		var form = $(this).parents('form');
 		var id = form.serialize();
 		$.ajax({
 			type: 'POST',
 			url: form.attr('action'),
 			data: form.serialize(),
 			dataType: 'text',
 			success: function() {
 				swal({
 					title: "RSVP'd!",
					type: "success",
					showConfirmButton: false
 				});
 				setTimeout(function() {
 					window.location = "/event?" + id;
 				}, 1000);
 			}
 		})
    });

    $('.unrsvp').on('click', function(e){
		e.preventDefault();
 		var form = $(this).parents('form');
 		var id = form.serialize();
 		$.ajax({
 			type: 'POST',
 			url: form.attr('action'),
 			data: form.serialize(),
 			dataType: 'text',
 			success: function() {
 				swal({
 					title: "unRSVP'd",
					type: "error",
					showConfirmButton: false
 				});
 				setTimeout(function() {
 					window.location = "/event?" + id;
 				}, 1000);
 			}  	
    	})
 	});

    $('#createEvent').submit(function(e) {
    	e.preventDefault();
    	//console.log('submit');
    	//console.log($('#createEvent').serialize());
    	$.ajax({
    		type: 'POST',
    		data: $('#createEvent').serialize(),
    		url: '/createEvent',
    		success: function(data) {
				swal({
					title:"Event Created!",
					type: "success",
					showConfirmButton: false
				});
				setTimeout(function() {
					window.location = "/event?id=" + data;
				}, 1000);
    		}
    	})
    });

    $('.form-editProfile').submit(function(e) {
    	e.preventDefault();
    	console.log($('.form-editProfile').attr('action'));
    	$.ajax({
    		type: 'POST',
    		data: $('.form-editProfile').serialize(),
    		url: $('.form-editProfile').attr('action'),
    		success: function(data) {
    			swal({
					title:"Profile Updated",
					type: "success",
					showConfirmButton: false
				});
				setTimeout(function() {
					window.location = data;
				}, 1000);
    		}
    	})
    })

 })