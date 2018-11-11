function showView() {
    let url = "https://opendata.epa.gov.tw/webapi/api/rest/datastore/355000000I-990272/?format=xml&token=u5bfeNUmuk+Pk7tvkGpTHA",
        view = document.getElementById("view");
    axios.get(url)
    .then(function(response){
        view.innerHTML = this.response;
    })
    .catch(function(){
        view.innerHTML = "error";
    });
}
showView();