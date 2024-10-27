function validateForm(){
    var url = document.getElementById("inputUrl").value
    var titulo = document.getElementById("inputTitulo").value
    var descricao = document.getElementById("inputDescricao").value

    if(url == "") {
        alert("URL is required");
        return false
    }

    if(titulo == "") {
        alert("titulo is required");
        return false
    }

    if(descricao == "") {
        alert("descricao is required");
        return false
    }

    return true
}

function showData(){
    var videoList;
    if(localStorage.getItem("videoList") == null) {
        videoList = [];
    } else {
        videoList = JSON.parse(localStorage.getItem("videoList"))
    }

    var html = "";

    videoList.forEach(function(element, index){
        html += "<tr>"
        html += "<td>" + element.url + "</td>"
        html += "<td>" + element.titulo + "</td>"
        html += "<td>" + element.descricao + "</td>"
        html += '<td><button onclick="deleteData(' + index +')" class="btn btn-danger">Deletar</button></td>'
        html += '<td><button onclick="updateData(' + index +')" class="btn btn-warning">Editar</button></td>'
        
        html += "<tr>"
    })

    document.querySelector("#crudTable tbody").innerHTML = html
}

document.onload = showData()

function addData() {
    if(validateForm() == true) {
        var url = document.getElementById("inputUrl").value
        var titulo = document.getElementById("inputTitulo").value
        var descricao = document.getElementById("inputDescricao").value

        var videoList;

        if(localStorage.getItem("videoList") == null) {
            videoList = [];
        } else {
            videoList = JSON.parse(localStorage.getItem("videoList"))
        }

        videoList.push({
            url: url,
            titulo: titulo,
            descricao: descricao,
        })

        localStorage.setItem("videoList", JSON.stringify(videoList));

        showData()

        document.getElementById("inputUrl").value = ""
        document.getElementById("inputTitulo").value = ""
        document.getElementById("inputDescricao").value = ""
    }
}

function deleteData(index) {
    var videoList;
    if(localStorage.getItem("videoList") == null) {
        videoList = [];
    } else {
        videoList = JSON.parse(localStorage.getItem("videoList"))
    }

    videoList.splice(index, 1);
    localStorage.setItem("videoList", JSON.stringify(videoList))
    showData()
}

function updateData(index) {
    document.getElementById("Submit").style.display = "none"
    document.getElementById("Update").style.display = "block"

    var videoList;
    if(localStorage.getItem("videoList") == null) {
        videoList = [];
    } else {
        videoList = JSON.parse(localStorage.getItem("videoList"))
    }

    document.getElementById("inputUrl").value  = videoList[index].url
    document.getElementById("inputTitulo").value = videoList[index].titulo
    document.getElementById("inputDescricao").value = videoList[index].descricao

    document.querySelector("#Update").onclick = function(){
        if(validateForm() == true) {
            videoList[index].url = document.getElementById("inputUrl").value
            videoList[index].titulo = document.getElementById("inputTitulo").value
            videoList[index].descricao = document.getElementById("inputDescricao").value

            localStorage.setItem("videoList", JSON.stringify(videoList))

            showData()

            document.getElementById("inputUrl").value  = ""
            document.getElementById("inputTitulo").value = ""
            document.getElementById("inputDescricao").value = ""

            document.getElementById("Submit").style.display = "block"
            document.getElementById("Update").style.display = "none"
        }
    }
    
}