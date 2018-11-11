function showView() {
    let url = "https://opendata.epa.gov.tw/webapi/api/rest/datastore/355000000I-990272/?format=json&token=u5bfeNUmuk+Pk7tvkGpTHA",
        view = document.getElementById("view");
    let instance = axios.create({
        baseURL: url,
        headers: {"Access-Control-Allow-Origin": "*"}
    })
    axios.get(instance)
    .then(function(response){
        view.innerHTML = response;
    })
    .catch(function(){
        view.innerHTML = "error";
    });
}
// showAxios();
function showXhr(){
    let url = "https://opendata.epa.gov.tw/webapi/api/rest/datastore/355000000I-990272/?format=json&token=u5bfeNUmuk+Pk7tvkGpTHA",
        view = document.getElementById("view");
    let req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onload = function(e){
        if(req.readyState == 4){
            if(req.status === 200){
                console.log(req.response);
                view.innerHTML = req.response;
            } else {
                console.error(req.statusText);
            }
        }
    };
    req.onerror = function(){
        console.error(req.statusText);
    };
    req.send(null);
}
showXhr();