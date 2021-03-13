function that(p) { return document.getElementById(p); }

function fmtDate(param) {
    return param < 10 ? "0" + param : param;
}

function setData(obj) {
    for (p in obj) { document.getElementById(p).innerHTML = obj[p]; }
}

function stabtnClick() {
    that("game-status").className = "l1";
    setData({ "cwinfo": "Please Wait" })
    for (var i = 1; i < 4; i++) { that("log" + i).style.color = "#EBF6F7"; }
    for (var i = 1; i < 4; i++) { that("log" + i + "_5").style.color = "#C7DC68"; }
    setTimeout();
    // that.setData({ stabtn_avai: false, cwinfo_avai: false, l1open: true });
    // setTimeout(function () { that.setData({ stabtn_text: "      -      " }) }, 100);
    // setTimeout(function () { that.setData({ stabtn_text: "     <->     " }) }, 200);
    // setTimeout(function () { that.setData({ stabtn_text: "    <--->    ", l2open: true }) }, 300);
    // setTimeout(function () { that.setData({ l3open: true, l4open: true }) }, 350);
    // setTimeout(function () { that.setData({ stabtn_text: "   <----->   ", l2_5open: true }) }, 400);
    // setTimeout(function () { that.setData({ stabtn_text: "  <------->  ", l3_5open: true }) }, 500);
    // setTimeout(function () { that.setData({ stabtn_text: " <---------> " }) }, 600);
    // setTimeout(function () { that.setData({ stabtn_text: "<----------->", l4_5open: true }) }, 700);
    // setTimeout(function () { that.setData({ stabtn_text: "<- LOADING ->" }) }, 800);
    // setTimeout(function () { that.setData({ enjoy: true }) }, 900);
    // setTimeout(function () {
    //     wx.redirectTo({
    //         url: '../lifegame/lifegame',
    //     })
    // }, 1500);
}

setInterval(function () {
    var d = new Date();
    setData({
        "hh": fmtDate(d.getHours()),
        "mm": fmtDate(d.getMinutes()),
        "ss": fmtDate(d.getSeconds()),
        "MM": fmtDate(d.getMonth() + 1),
        "DD": fmtDate(d.getDay()),
        "YYYY": fmtDate(d.getFullYear())
    })
}, 1000)

