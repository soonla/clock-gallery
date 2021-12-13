const main = $("#main");

let fp = null;
function loadJson(jsonFile) {
  let total = 0;
  $.ajax({
    url: jsonFile,
    success: function (res) {
      console.log(res);
      const clockList = res.clock;
      //forEach(function(item,idx){})
      total = clockList.length;
      let output = "";
      $.each(clockList, function (idx, item) {
        //console.log(item);
        output += `
        <div class="section" style="background-image:url(${item.bg})">
          <div class="info">
            <p class="category" data-splitting>${item.category}</p>
            <h2 class="title" data-splitting>${item.title}</h2>
            <p class="depth" data-splitting><strong>${item.depth}</strong> mm</p>
            <p class="price" data-splitting>CHF ${item.price}</p>
          </div>
        </div>
        `;
      });
      main.html(output);
      Splitting();
      console.log(fp);
      if (fp !== null) {
        $.fn.fullpage.destroy("all");
      }
      $("#main").fullpage({
        scrollBar: true,
        onLeave: function (origin, destination, direction) {
          charMotion(`.section:nth-child(${destination.index + 1}) .char`);
          $(".pagination").text(`${destination.index + 1} / ${total}`);
        },
      });
      fp = $.fn.fullpage;
      charMotion(".section:nth-child(1) .char");
      console.log(fp);
      $(".pagination").text(`1 / ${total}`);
    },
  });
}

//두번 사용하니까 펑션 처리...
function charMotion(char) {
  gsap.from(char, {
    y: -200,
    opacity: 0,
    ease: "bounce",
    duration: 1.5,
    delay: 0.5,
    stagger: {
      //each: 0.01,
      amount: 1,
      from: "random",
    },
  });
}
// $.get("../data/bigbang.json").done(function (res) {
//   console.log(res);
// });

loadJson("../data/bigbang.json");
particlesJS.load("bgParticle", "../data/particlesjs-config.json");

$("#gnb li a").on("click", function (e) {
  e.preventDefault();
  if ($(this).hasClass("selected")) return;
  $(this).addClass("selected").parent().siblings("li").find("a").removeClass("selected");
  const jsonFile = $(this).data("json");
  loadJson(jsonFile);
});

function addZero(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return "" + num;
  }
}
