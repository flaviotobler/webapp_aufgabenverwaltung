var offlineNotification = document.getElementById('offline');

function addTask()
{
    var taskname = document.getElementById("taskname").value;
    var req = new XMLHttpRequest();
    req.open("POST","/addTask");
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify({'name': taskname}));
    loadSiteT();
}

function loadSiteT(){
    document.getElementById("liste").innerHTML = "";
    var req = new XMLHttpRequest();
    req.onload = function(){
        if( this.status == 200 && this.responseText != null){
            JSON.parse(req.responseText).forEach(function(task){
                var div = document.createElement("div");
                div.className = "col-sm-12 col-md-6 col-lg-4 col-xl-3";
                var lable = document.createElement("lable");
                lable.className = "form-check-lable";
                var input = document.createElement("input");
                input.className = "form-check-input";
                input.type = "checkbox";
                input.value = "";
                input.addEventListener('click', checkboxC);
                input.id = task.id;
                var p = document.createElement("P");
                var text = task.name;
                p.innerHTML = text;
                lable.appendChild(input);
                lable.appendChild(p);
                div.appendChild(lable);
                document.getElementById("liste").appendChild(div)
        });
        } else{
            //something went wrong
        }
    }
    req.open("GET","/selectionT");
    req.send();
}
function loadSiteD(){
    document.getElementById("liste").innerHTML = "";
    var req = new XMLHttpRequest();
    req.onload = function(){
        if( this.status == 200 && this.responseText != null){
            JSON.parse(req.responseText).forEach(function(task){
                var div = document.createElement("div");
                div.className = "col-sm-12 col-md-6 col-lg-4 col-xl-3";
                var lable = document.createElement("lable");
                lable.className = "form-check-lable";
                var input = document.createElement("input");
                input.className = "form-check-input";
                input.type = "checkbox";
                input.value = "";
                input.checked = true;
                input.addEventListener('click', checkboxU);
                input.id = task.id;
                var p = document.createElement("P");
                var text = task.name;
                p.innerHTML = text;
                lable.appendChild(input);
                lable.appendChild(p);
                div.appendChild(lable);
                document.getElementById("liste").appendChild(div)
        });
        } else{
            //something went wrong
        }
    }
    req.open("GET","/selectionD");
    req.send();
}

function checkboxC()
{
    var index = event.target.id;
    var req = new XMLHttpRequest();
    req.open("POST","/close");
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify({'id': index}));
    loadSiteT();
}

function checkboxU()
{
    var index = $(this).attr('id');
    var req = new XMLHttpRequest();
    req.open("POST","/open");
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify({'id': index}));
    loadSiteD();
}

function showIndicator() {
    offlineNotification.innerHTML = 'You are currently offline.';
    offlineNotification.className = 'showOfflineNotification';
}
function hideIndicator() {
    offlineNotification.className = 'hideOfflineNotification';
    loadSiteT();
}

window.addEventListener('online', hideIndicator);
window.addEventListener('offline', showIndicator);