function fmtDate(param): string
{
    return param < 10 ? "0" + param : param;
}

function setData(obj): void
{
    for (var p in obj) { document.getElementById(p).innerHTML = obj[p]; }
}

function stabtnClick()
{
    // $("#log1")[0].style.color = "#EBF6F7";
    // $("#log2")[0].style.color = "#EBF6F7"; $("#log3")[0].style.color = "#EBF6F7"; 
    // $("#log1_5")[0].style.color = "#C7DC68"; $("#log2_5")[0].style.color = "#C7DC68" 
    // $("#log3_5")[0].style.color = "#C7DC68" 
    // $("#enjoy")[0].style.color = "#38A1DB";
    $("#game-status")[0].className = "l1";
    (<HTMLButtonElement>$("#stabtn")[0]).disabled = true;
    (<HTMLButtonElement>$("#stabtn")[0]).disabled = true;
    setData({ "game-status": "Lauching", "cwinfo": "Please Wait" });
    setTimeout(function () { setData({ "stabtn": "      -      " }) }, 100);
    setTimeout(function () { setData({ "stabtn": "     <->     " }); }, 200);
    setTimeout(function () { setData({ "stabtn": "    <--->    " }); }, 300);
    setTimeout(function () { setData({ "stabtn": "   <----->   " }); }, 400);
    setTimeout(function () { setData({ "stabtn": "  <------->  " }); }, 500);
    setTimeout(function () { setData({ "stabtn": " <---------> " }); }, 600);
    setTimeout(function () { setData({ "stabtn": "<----------->" }); }, 700);
    setTimeout(function () { setData({ "stabtn": "<- LOADING ->" }); }, 800);
    setTimeout(
        function ()
        {
            window.location.href = "./pages/game/game.html";
        }, 1500
    );
}

function cwinfoClick()
{
    (<HTMLButtonElement>$("#stabtn")[0]).disabled = true;
    (<HTMLButtonElement>$("#stabtn")[0]).disabled = true;
    setData({ "stabtn": "Please Wait" });
    setTimeout(function () { setData({ "cwinfo": "< >" }) }, 100);
    setTimeout(function () { setData({ "cwinfo": "<< >>" }) }, 200);
    setTimeout(function () { setData({ "cwinfo": "<<< >>>" }) }, 300);
    setTimeout(function () { setData({ "cwinfo": "<<<< >>>>" }) }, 400);
    setTimeout(function () { setData({ "cwinfo": "<<<<< >>>>>" }) }, 500);
    setTimeout(function () { setData({ "cwinfo": "<<<<<< >>>>>>" }) }, 600);
    setTimeout(
        function ()
        {
            window.location.href = "./pages/cwinfo/cwinfo.html";
        }, 1000
    );
}

setInterval(
    function ()
    {
        var d = new Date();
        setData(
            {
                "hh": fmtDate(d.getHours()),
                "mm": fmtDate(d.getMinutes()),
                "ss": fmtDate(d.getSeconds()),
                "MM": fmtDate(d.getMonth() + 1),
                "DD": fmtDate(d.getDate()),
                "YYYY": fmtDate(d.getFullYear())
            }
        )
    }, 1000
)

$(preloadPatternLib);

var [pattern_loaded, stage_loaded] = [false, false];

function release()
{
    if (pattern_loaded && stage_loaded)
    {
        (<HTMLButtonElement>$("#stabtn")[0]).disabled = false;
    }
}

function preloadPatternLib(): void
{
    $.ajax(
        "/js/lifegame/patternLib.json",
        {
            dataType: "text"
        }
    ).done(
        (data: string) =>
        {
            sessionStorage.setItem("patternLib", data);
            pattern_loaded = true;
            release();
        }
    );

    $.ajax(
        "/js/lifegame/stageLib.json",
        {
            dataType: "text"
        }
    ).done(
        (data: string) =>
        {
            sessionStorage.setItem("stageLib", data);
            stage_loaded = true;
            release();
        }
    )
}