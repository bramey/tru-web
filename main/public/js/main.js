$(function(){
	$("#menu > li").hover(function(){

		$("#menu a").removeClass("active");
		$(this).children().addClass("active");
		$(this).addClass("open");

	}, function(){

		$(this).children().removeClass("active");
		$(this).removeClass("open");

	});
});