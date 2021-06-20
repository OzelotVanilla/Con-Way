declare const $: any;

function fmtDate(param) {
    return param < 10 ? "0" + param : param;
}

function setData(obj) {
    for (var p in obj) { document.getElementById(p).innerHTML = obj[p]; }
}

function stabtnClick() {
    $("#game-status").className = "l1";
    $("#stabtn").disabled = true; $("#cwinfo").disabled = true;
    setData({ "game-status": "Lauching", "cwinfo": "Please Wait" });
    setTimeout(function () { setData({ "stabtn": "      -      " }) }, 100);
    setTimeout(function () { setData({ "stabtn": "     <->     " }); }, 200);
    setTimeout(function () { setData({ "stabtn": "    <--->    " }); $("#log1")[0].style.color = "#EBF6F7"; }, 300);
    setTimeout(function () { $("#log2")[0].style.color = "#EBF6F7"; $("#log3")[0].style.color = "#EBF6F7"; }, 350);
    setTimeout(function () { setData({ "stabtn": "   <----->   " }); $("#log1_5")[0].style.color = "#C7DC68" }, 400);
    setTimeout(function () { setData({ "stabtn": "  <------->  " }); $("#log2_5")[0].style.color = "#C7DC68" }, 500);
    setTimeout(function () { setData({ "stabtn": " <---------> " }); }, 600);
    setTimeout(function () { setData({ "stabtn": "<----------->" }); $("#log3_5")[0].style.color = "#C7DC68" }, 700);
    setTimeout(function () { setData({ "stabtn": "<- LOADING ->" }); }, 800);
    setTimeout(function () { $("#enjoy")[0].style.color = "#38A1DB"; }, 900);
    setTimeout(function () {
        window.location.href = "./pages/game/game.html";
    }, 1500);
}

function cwinfoClick() {
    $("#stabtn").disabled = true; $("#cwinfo").disabled = true;
    setData({ "stabtn": "Please Wait" });
    setTimeout(function () { setData({ "cwinfo": "< >" }) }, 100);
    setTimeout(function () { setData({ "cwinfo": "<< >>" }) }, 200);
    setTimeout(function () { setData({ "cwinfo": "<<< >>>" }) }, 300);
    setTimeout(function () { setData({ "cwinfo": "<<<< >>>>" }) }, 400);
    setTimeout(function () { setData({ "cwinfo": "<<<<< >>>>>" }) }, 500);
    setTimeout(function () { setData({ "cwinfo": "<<<<<< >>>>>>" }) }, 600);
    setTimeout(function () {
        window.location.href = "./pages/cwinfo/cwinfo.html";
    }, 1000);
}

setInterval(function () {
    var d = new Date();
    setData({
        "hh": fmtDate(d.getHours()),
        "mm": fmtDate(d.getMinutes()),
        "ss": fmtDate(d.getSeconds()),
        "MM": fmtDate(d.getMonth() + 1),
        "DD": fmtDate(d.getDate()),
        "YYYY": fmtDate(d.getFullYear())
    })
}, 1000)

