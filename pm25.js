// function showAxios() {
//     let url = "/text.json",
//         view = document.getElementById("view");
//     let instance = axios.create({
//         baseURL: url
//     })
//     axios.get(instance)
//     .then(function(response){
//         view.innerHTML = response;
//     })
//     .catch(function(){
//         view.innerHTML = "error";
//     });
// }
// showAxios();
function showXhr(){
    let url = "https://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=adef2044-760f-40bd-8e13-a7fda6d011de",
        view = document.getElementById("view");
    // fetch (url, {method: "GET", mode: "same-origin"})
    // .then(function(response){
    //     if(!response.ok){
    //         view.innerHTML = "Loaded error";
    //     } else {
    //         view.innerHTML = response;
    //     }
    // })
    // .catch(function(){
    //     view.innerHTML = "Error";
    // })
    let req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onload = function(e){
        if(req.readyState == 4){
            if(req.status === 200){
                let obj = JSON.parse(this.responseText);
                view.innerHTML = obj.result.results[0];
                view.innerHTML += this.responseText;
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