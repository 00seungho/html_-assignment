const dongcode = [
    { dong: '종로구', code: 111123 },
    { dong: '중구', code: 111121 },
    { dong: '용산구', code: 111131 },
    { dong: '성동구', code: 111142 },
    { dong: '광진구', code: 111141 },
    { dong: '동대문구', code: 111152 },
    { dong: '중랑구', code: 111151 },
    { dong: '성북구', code: 111161 },
    { dong: '강북구', code: 111291 },
    { dong: '도봉구', code: 111171 },
    { dong: '노원구', code: 111311 },
    { dong: '은평구', code: 111181 },
    { dong: '서대문구', code: 111191 },
    { dong: '마포구', code: 111201 },
    { dong: '양천구', code: 111301 },
    { dong: '강서구', code: 111212 },
    { dong: '구로구', code: 111221 },
    { dong: '금천구', code: 111281 },
    { dong: '영등포구', code: 111231 },
    { dong: '동작구', code: 111241 },
    { dong: '관악구', code: 111251 },
    { dong: '서초구', code: 111262 },
    { dong: '강남구', code: 111261 },
    { dong: '송파구', code: 111273 },
    { dong: '강동구', code: 111274 }
];


$(document).ready(function () {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000, 
        maximumAge: 0
    };
    onGeoError();
    //현재위치를 얻어오는 함수
    navigator.geolocation.getCurrentPosition(onGeoOkay, onGeoError, options);
    function onGeoOkay(position) {
        fetch(`https://hifive.metainsu.co.kr/api/v1/common/gainlocation?lat=${position.coords.longitude}&lon=${position.coords.latitude}`)
            .then(response => response.json())
            .then(data => {
                var mylocation_dong = data.documents[0].address.region_2depth_name;
                var j = 0;
                var found = false;
                for (var i = 0; i < 25; i++) {
                    if (dongcode[i].dong == mylocation_dong) {
                        found = true;
                        j = i;
                        break;
                    }
                };
                if (found) {
                    fetch(`https://hifive.metainsu.co.kr/api/v1/common/gainwhether?code=${dongcode[j].code}`)
                        .then(response => response.json())
                        .then(data => {
                            var pm10 = data.ListAirQualityByDistrictService.row[0].PM10
                            var pm25 = data.ListAirQualityByDistrictService.row[0].PM25
                            var pm10State
                            var pm25State
                            var allState
                            //pm10 상태
                            // pm10 상태
                            if (pm10 >= 0 && pm10 <= 30) {
                                pm10State = "좋음";
                            } else if (pm10 >= 31 && pm10 <= 80) {
                                pm10State = "보통";
                            } else if (pm10 >= 81 && pm10 <= 150) {
                                pm10State = "나쁨";
                            } else if (pm10 >= 151 && pm10 <= 600) {
                                pm10State = "매우나쁨";
                            }

                            // pm25 상태
                            if (pm25 >= 0 && pm25 <= 15) {
                                pm25State = "좋음";
                            } else if (pm25 >= 16 && pm25 <= 35) {
                                pm25State = "보통";
                            } else if (pm25 >= 36 && pm25 <= 75) {
                                pm25State = "나쁨";
                            } else if (pm25 >= 76 && pm25 <= 500) {
                                pm25State = "매우나쁨";
                            }

                            var airQualityState;

                            // pm10과 pm25 중 더 나쁜 상태를 통합 대기질 상태로 설정
                            if (pm10State === "매우나쁨" || pm25State === "매우나쁨") { 
                              airQualityState = "verybad";
                            } else if (pm10State === "나쁨" || pm25State === "나쁨") {
                              airQualityState = "bad";
                            } else if (pm10State === "보통" || pm25State === "보통") {
                              airQualityState = "good";
                            } else {
                              airQualityState = "verygood";
                            }
                            $("#smalldust").text("미세먼지: "+pm10State)
                            $("#mylocation").text("내위치: "+mylocation_dong)
                            $("#verysmalldust").text("초미세먼지: "+pm25State)
                            $("#dustState").attr("src","imgs/"+airQualityState+".png")
                            particulateMatterLoad()
                        })
                        .catch(error => console.log('error', error));
                }
                else {
                    onGeoError();
                }
            })

            .catch(error => console.log('error', error));
    }

    function onGeoError() {
        fetch(`https://hifive.metainsu.co.kr/api/v1/common/gainwhether?code=111123`)
        .then(response => response.json())
        .then(data => {

            var pm10 = data.ListAirQualityByDistrictService.row[0].PM10
            var pm25 = data.ListAirQualityByDistrictService.row[0].PM25
            var pm10State
            var pm25State
            var allState
            //pm10 상태
            // pm10 상태
            if (pm10 >= 0 && pm10 <= 30) {
                pm10State = "좋음";
            } else if (pm10 >= 31 && pm10 <= 80) {
                pm10State = "보통";
            } else if (pm10 >= 81 && pm10 <= 150) {
                pm10State = "나쁨";
            } else if (pm10 >= 151 && pm10 <= 600) {
                pm10State = "매우나쁨";
            }

            // pm25 상태
            if (pm25 >= 0 && pm25 <= 15) {
                pm25State = "좋음";
            } else if (pm25 >= 16 && pm25 <= 35) {
                pm25State = "보통";
            } else if (pm25 >= 36 && pm25 <= 75) {
                pm25State = "나쁨";
            } else if (pm25 >= 76 && pm25 <= 500) {
                pm25State = "매우나쁨";
            }

            var airQualityState;

            // pm10과 pm25 중 더 나쁜 상태를 통합 대기질 상태로 설정
            if (pm10State === "매우나쁨" || pm25State === "매우나쁨") {
              airQualityState = "verybad";
            } else if (pm10State === "나쁨" || pm25State === "나쁨") {
              airQualityState = "bad";
            } else if (pm10State === "보통" || pm25State === "보통") {
              airQualityState = "good";
            } else {
              airQualityState = "verygood";
            }
            $("#smalldust").text("미세먼지: "+pm10State)
            $("#mylocation").text("위치: 종로구")
            $("#verysmalldust").text("초미세먼지: "+pm25State)
            $("#dustState").attr("src","imgs/"+airQualityState+".png")
            particulateMatterLoad()
        })
        .catch(error => console.log('error', error));
    }

});



function particulateMatterLoad(){
    $("#dust").fadeIn('slow');
}

