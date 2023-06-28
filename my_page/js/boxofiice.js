var thisDay = new Date();
var year = thisDay.getFullYear();
var month = ('0' + (thisDay.getMonth() + 1)).slice(-2);
var day = ('0' + (thisDay.getDate()-1)).slice(-2);
var yesterday = year+month+day;

$(document).ready(function() {
  fetch(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=4a641bb278841b94d2175b50d98d61e9&targetDt=${yesterday}&itemPerPage=5`)
  .then(response => response.json())
  .then(data => {
    $("#time").text("날짜 : "+data.boxOfficeResult.showRange);
    $("#1th").text("1위: "+data.boxOfficeResult.dailyBoxOfficeList[0].movieNm)
    $("#2th").text("2위: "+data.boxOfficeResult.dailyBoxOfficeList[1].movieNm)
    $("#3th").text("3위: "+data.boxOfficeResult.dailyBoxOfficeList[2].movieNm)
    $("#4th").text("4위: "+data.boxOfficeResult.dailyBoxOfficeList[3].movieNm)
    $("#5th").text("5위: "+data.boxOfficeResult.dailyBoxOfficeList[4].movieNm)
    boxofficeLoad();
})

  .catch(error => {
    $("#5th").text("데이터 불러오기 오류")
    boxofficeLoad();
    console.error('Error:', error);
});

  $('#x').click(function(event) {
      event.preventDefault(); // 버튼의 기본 동작 막기
      $("#boxoffice").fadeOut('slow');
      $("#backgroundGray").fadeOut('slow');
    });
  });

  function boxofficeLoad(){
    $('#boxoffice').fadeIn('slow');
    $('#backgroundGray').fadeIn('slow');
  }