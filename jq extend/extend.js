$.extend({
	component: function(def, fn) {
		var str = 'var _templateFuncion = ' + fn.toString();
		str = str.replace(/{{/g, "'+").replace(/}}/g, "+'");
		eval(str);
		$(function() {
			_templateFuncion();
		})
	}
});


$.component('个人资料', function() {
    alert(54121.143123);

});



$.component('个人资料', function() {
    alert("我我我own");

})
