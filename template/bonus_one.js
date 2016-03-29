// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

var text = "";
var t = $('li');

var maindata;	

(function() {
	// Magic!
	
	
	if($('li').length !=0) {
	document.getElementsByTagName('li').style.listStyleType = 'none';
	}
	
	$.getJSON('http://www.mattbowytz.com/simple_api.json?data=all', function(data){
		
		data = data['data'];
		
		
		maindata = data.interests;
		maindata = maindata.concat(data.programming);
	});
	
	console.log('Keepin\'n it clean with an external script!');
	
	$('#user_in').focus(function(){
		populate(maindata);


	});
	
	
	$('#user_in').on('keyup', function(){
	
			text = document.getElementById("user_in").value;
			populate(maindata);
	});

	
	
	
	
})();

function findMatches(item) {
	len = text.length;
	text = text.toUpperCase();
	item = item.toUpperCase();
	var str = item.substring(0, len);
	res = str.localeCompare(text);
	return res == 0;



}

function populate(arr) {
	arr.sort();
	arr = arr.filter(findMatches);
	unpopulate();
	$.each(arr, function(key,val){
			var node = document.createElement('li');
			var textnode = document.createTextNode(val);
			node.style.listStyleType = 'none';
			node.className = 'listel';
			node.style.backgroundColor = 'lightgrey';
			node.appendChild(textnode);
			document.getElementById('listy').appendChild(node);
		
	});


	$(document).ready(function() {

		$('.listel').hover(function(){
			var t = $(this);
			$(this)[0].style.backgroundColor = 'lightblue';
		
		}, function() {
			$(this)[0].style.backgroundColor = 'lightgrey';
		
		
		});
		
			$('.listel').on('click',	function() {
			$('#user_in').focus();
			topic = $(this)[0].innerHTML;
			window.open('https://www.google.com/#q=' + topic);
			
		
		});
	
		document.getElementById('mainForm').onsubmit = function() {
					
					$.getJSON('http://www.mattbowytz.com/simple_api.json?data=all', function(data){
						data = data['data'];	
						maindata = data.interests;
						maindata = maindata.concat(data.programming);
					});
					text = document.getElementById("user_in").value;
					a = maindata.filter(findMatches);
					window.open('https://www.google.com/#q=' + a);
					
		
		};
		
	});
	
	

}




function unpopulate() {


	var list = document.getElementById("listy");
	var first = list.firstChild;
	while (list.hasChildNodes()) {
		list.removeChild(list.firstChild);
	}
		

}	