Notification.requestPermission(R);
function R (result) {
    console.log(result);
}

let dni=['poniedzialek','wtorek','sroda','czwartek','piatek','sobota','niedziela'];
let colors=['whitesmoke','aliceblue','lightskyblue','lavender','linen','lightblue','skyblue'];
var hourheight = document.getElementsByTagName("li")[0].offsetHeight + 30;

//zapełnienie planu
function fillSchedule()
{
    for (dzien in plan)
    {
        var day = dni[dzien];
        let dziendiv = document.getElementById(day);
        dziendiv.style.marginLeft = dzien*155 + 5 + "px";
        for(lek in plan[dzien])
        {
            var day = dni[dzien];
            let dziendiv = document.getElementById(day);
            let lekcja = plan[dzien][lek];
            let lekcjadiv = document.createElement("DIV");
            lekcjadiv.innerHTML = lekcja.Start + "-" + lekcja.End + "<br />" + lekcja.Name;
            var godzina = lekcja.Start.split(":");
            godzina[0] = parseInt(godzina[0],10);
            godzina[1] = parseInt(godzina[1],10);
            lekcjadiv.style.top = (((godzina[0] - 8) + (godzina[1] / 60)) * hourheight) + "px";
            lekcjadiv.style.left = 0;
            lekcjadiv.classList.add("lekcja");
            lekcjadiv.style.background = colors[dzien];
            var godzina1 = lekcja.End.split(":");
            godzina1[0] = parseInt(godzina1[0],10);
            godzina1[1] = parseInt(godzina1[1],10);
            var padding = ((((godzina1[1]/60 + godzina1[0]) - (godzina[1]/60 + godzina[0])) * hourheight) - 2) + "px";
            lekcjadiv.style.height = padding;
            if(lekcja.Link && lekcja.Link != "")
            {
                lekcjadiv.onclick = function(){
                    document.location.href = lekcja.Link;
                }
                lekcjadiv.classList.add("clickable");
                lekcjadiv.title = lekcja.Link;
            }
            dziendiv.appendChild(lekcjadiv);
        }
    }
    if(document.getElementById('niedziela').childElementCount == 1)
    {
        document.getElementById('niedziela').style.display = "none"
        if(document.getElementById('sobota').childElementCount == 1) document.getElementById('sobota').style.display = "none";
    }
}

fillSchedule();

function checktime()
{
    var teraz = new Date();
    var dzientyg = teraz.getDay() - 1;
    var hour = teraz.getHours();
    var minute = teraz.getMinutes();
    for(lek in plan[dzientyg])
    {
        let lekcja = plan[dzientyg][lek];
        if(lekcja.Notify)
        {
            var godzina = lekcja.Start.split(":");
            godzina[0] = parseInt(godzina[0],10);
            godzina[1] = parseInt(godzina[1],10);
            if(hour == godzina[0])
            {
                if(minute == godzina[1])
                {
                    var text = "Zaczynają się zajęcia: " + lekcja.Name;
                    var img = 'icon.png';
                    var notification = new Notification('Początek zajęć', { body: text, icon: img })
                    if(lekcja.Link && lekcja.Link != "")
                    {
                        let url = lekcja.Link;
                        notification.onclick = function(event) {
                            event.preventDefault();
                            window.open(url,'_blank');
                        }
                    }/*
                    let div = document.getElementById(dni[dzientyg]).children[lek];
                    div.style.background = 'orange';
                    div.classList.add("NOW");*/
                }
            }
        }
    }
}
checktime();
setInterval(checktime, 60*1000); //sprawdzaj co 30 sekund

function scsw()
{
    var starylink = document.head.getElementsByTagName("link")[0];
    if(starylink.href.split("/")[starylink.href.split("/").length-1] == "style.css")
    {
        starylink.href = "styl2.css";
    }
    else
    {
        starylink.href = "style.css";
    }
}