function showView() {
    let url = "https://www.dep-in.gov.taipei/epb/webservice/toilet.asmx/GetToiletData",
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