/* global bootbox: false, console: false, S: false, moment: false */


$(document).ready(function(){
  $('#newsModal').modal({
    show:false
  });
  var findNews = function(newsId){
    $.ajax('/news/newsInfo',{
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify({
        newsId: newsId
      }),
      success: function(res){
        if('success' === res.status){
          console.log()
          var news = res.news;
          var jNewsModal = $('#newsModal');
          var jNewsTitle = $('#newsTitle');
          var jNewsContent = $('#newsContent');
          var jNewsImage = $('#newsImage');
          var jNewsPostedDate = $('#newsPostedDate');
          var jNewsId = $('#newsId');
          jNewsTitle.val(news.title);
          jNewsContent.val(news.content);
          jNewsImage.val(news.photoUrl);
          jNewsPostedDate.val(moment(news.datePosted).format("dddd, MMMM Do YYYY"));
          jNewsId.val(news.id);
          jNewsModal.modal('show');
        } else {
          bootbox.alert('ERROR: News failed to load');
        }
      }
    });
  }
  $('.newsButton').on('click',function(){
    var newsId = $(this).attr('data-id');
    findNews(newsId)
  });
});
