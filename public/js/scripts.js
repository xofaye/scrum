
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
	// function initMap() {
 //    	var input = document.getElementById('searchInput');
 //    	var autocomplete = new google.maps.places.Autocomplete(input);
	// }

// var promoteToAdmin = function() {
// 	console.log($(this)[0]);
// 	console.log($(this).data('button'));
// }

var placeSearch;
var autocomplete;

var componentForm = {
	street_number: 'short_name',
	route: 'long_name',
	locality: 'long_name',
	administrative_area_level_1: 'short_name',
	country: 'long_name',
	postal_code: 'short_name'
};

function initAutocomplete() {
	// Create the autocomplete object, restricting the search to geographical
	// location types.
	//console.log(document.getElementById('autocomplete'));
	// if ($('#autocomplete') != null ) {
		autocomplete = new google.maps.places.Autocomplete(	
		(document.getElementById('autocomplete')), {types: ['geocode']});
	//}

	// When the user selects an address from the dropdown, populate the address
	// fields in the form.
	//autocomplete.addListener('place_changed', fillInAddress);
};


// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var geolocation = {
	      		lat: position.coords.latitude,
	      		lng: position.coords.longitude
	    	};
	    	var circle = new google.maps.Circle({
	      		center: geolocation,
	      		radius: position.coords.accuracy
	    	});
	    	autocomplete.setBounds(circle.getBounds());
	  	});
	}
};


$(document).ready(function() {
 	console.log('loaded');
 	console.log(document.getElementById('autocomplete'));
	// function initMap() {
	// 	var input = $("#searchInput");
	// 	var autocomplete = new.google.maps.places.Autocomplete(input);
	// 	google.maps.events.addDomListener(window, 'load', init);
	// }
	if (document.getElementById('autocomplete') !== null) {
		initAutocomplete();
	}

 	//$('#datetimepicker1').datetimepicker();
 	$('.datetimepicker').each(function(){
    	$(this).datetimepicker();
	});

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
    	//console.log($('.form-editProfile').attr('action'));
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
    });

    $('#promoAdmin').click(function() {
    	console.log($(this));
    	console.log($(this).data('button'));
    	var b = $(this).data('button');
    	swal({
	        title: "Are you sure?",
	        text: "This user will be given Admin powers",
	        type: "warning",
	        showCancelButton: true,
	        confirmButtonText: "Yes",
	        closeOnConfirm: false
	    }, function(confirmed){
	        if (confirmed) {
		    	$.ajax({
		    		type: 'POST',
		    		data: {"id": b},
		    		url: "/profile?id=" + b,
		    		success: function(data) {
		    			swal({
							title:"User promoted to Admin",
							type: "success",
							showConfirmButton: false
						});
						setTimeout(function() {
							window.location = data;
						}, 1000);
		    		}
		    	})
		    }
   		})
    });
})