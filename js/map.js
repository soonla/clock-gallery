// 주소로 좌표를 검색합니다

const locationTab = $(".locationTab");
const locationTabMenu = locationTab.find(".tabMenu > ul > li");
const addressList = [
  { address: "서울 중구 세종대로 110", title: "서울시청", link: "http://www.daum.net" },
  { address: "서울특별시 영등포구 선유로 130", title: "우리학원", link: "http://www.naver.com" },
  { address: "경기 과천시 대공원광장로 102", title: "서울대공원", link: "http://www.google.com" },
];
locationTabMenu.on("click", function () {
  loadMap(addressList[$(this).index()]);
  /*
  if ($(this).index() === 0) {
    loadMap({ address: "서울 중구 세종대로 110", title: "서울시청", link: "http://www.daum.net" });
  } else if ($(this).index() === 1) {
    loadMap({ title: "우리학원", link: "http://www.naver.com", title: "서울특별시 영등포구 선유로 130" });
  } else if ($(this).index() === 2) {
    loadMap({ address: "경기 과천시 대공원광장로 102", title: "서울대공원", link: "http://www.google.com" });
  }
  */
});

function loadMap(mapObj) {
  $("#map").html("");
  var mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

  // 지도를 생성합니다
  var map = new kakao.maps.Map(mapContainer, mapOption);

  // 주소-좌표 변환 객체를 생성합니다
  var geocoder = new kakao.maps.services.Geocoder();
  geocoder.addressSearch(mapObj.address, function (result, status) {
    // 정상적으로 검색이 완료됐으면
    if (status === kakao.maps.services.Status.OK) {
      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      //alert(coords);

      var imageSrc = "../images/contents/town-hall.png", // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(64, 64), // 마커이미지의 크기입니다
        imageOption = { offset: new kakao.maps.Point(32, 64) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
        markerPosition = coords; // 마커가 표시될 위치입니다

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage, // 마커이미지 설정
      });

      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);

      // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      var content = `<div class="customOverlay">
                      <a href="${mapObj.link}" target="_blank">
                          <span class="title">${mapObj.title}</span>
                      </a>
                     </div>`;

      // 커스텀 오버레이가 표시될 위치입니다
      var position = coords;

      // 커스텀 오버레이를 생성합니다
      var customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        position: position,
        content: content,
        yAnchor: 1,
      });

      map.setCenter(coords);
    }
  });
}
loadMap(addressList[0]);
