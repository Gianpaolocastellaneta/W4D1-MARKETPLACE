let url ="https://striveschool-api.herokuapp.com/api/product/"

function aggiungiProdotto(){
    let getName = document.getElementById("name").value
    let getDescription = document.getElementById("description").value
    let getBrand = document.getElementById("brand").value
    let getPrice = document.getElementById("price").value
    let getImg = document.getElementById("image").value


    if((getName !== "" )&&(getDescription !== "" )&&(getBrand !== "" )&&(getPrice !== "" )&&(getImg !== "" )){
    fetch(url,{
        method: "POST",
        headers: {
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY3NjEyMzdmNmI0YjAwMTU0MjhmZGUiLCJpYXQiOjE3MTgzOTEzNDQsImV4cCI6MTcxOTYwMDk0NH0.c3dO6wqYRyeAPbLerUCzPVjiB3qM_Zl4AEsk_Sp_Ky0",
            "content-type": "application/json"
            },
        body: JSON.stringify({
            name: getName,
            description: getDescription,
            brand: getBrand,
            price: getPrice,
            imageUrl: getImg
        })
    }).then(response=>{
        //console.log(response)
        if(response.status === 200){
            //alert("Prodotto Aggiunto")
            risultati()
            pulisciForm()
            renderModal("complimenti","Prodotto aggiunto")
           // console.log("prodotto aggiunto")
          
        }else{
            renderModal("Errore","Impossibile aggiungere prodotto")
          // alert("Impossibile inserire il prodotto")
           //console.log("prodotto già esistente")
        }
        })
    }else{
        renderModal("Attenzione","Tutti i campi sono obbligatori",["ok","chiudiModal()"])
        //alert("Tutti i campi sono obbligatori")
    }
}


document.addEventListener("DOMContentLoaded",() => {
    risultati()
})

function modifica(id){
   //console.log("modifico "+ id)
   let overlay = document.getElementById("overlay")
    overlay.classList.remove("d-none")
    let editModal = document.getElementById("editModal")
    editModal.classList.add("d-block")
    
    fetch(url +id,{
        headers: {
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY3NjEyMzdmNmI0YjAwMTU0MjhmZGUiLCJpYXQiOjE3MTgzOTEzNDQsImV4cCI6MTcxOTYwMDk0NH0.c3dO6wqYRyeAPbLerUCzPVjiB3qM_Zl4AEsk_Sp_Ky0",
            "content-type": "application/json"
            },
    }).then(response=>{
        response.json().then(data=>{
            //console.log(data.name)
            document.getElementById("name_edit").value = data.name
            document.getElementById("description_edit").value = data.description
            document.getElementById("brand_edit").value = data.brand
            document.getElementById("price_edit").value = data.price
            document.getElementById("image_edit").value = data.imageUrl
            document.getElementById("id_mod").value = data._id

        })
        
    })

}

function modificaProdotto(){
    let name_mod = document.getElementById("name_edit").value
    let description_mod = document.getElementById("description_edit").value
    let brand_mod = document.getElementById("brand_edit").value
    let price_mod = document.getElementById("price_edit").value
    let image_mod = document.getElementById("image_edit").value
    let id_mod = document.getElementById("id_mod").value

    fetch(url + id_mod,{
        method: "PUT",
        headers: {
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY3NjEyMzdmNmI0YjAwMTU0MjhmZGUiLCJpYXQiOjE3MTgzOTEzNDQsImV4cCI6MTcxOTYwMDk0NH0.c3dO6wqYRyeAPbLerUCzPVjiB3qM_Zl4AEsk_Sp_Ky0",
            "content-type": "application/json"
            },
        body: JSON.stringify({
            name: name_mod,
            description: description_mod,
            brand: brand_mod,
            price: price_mod,
            imageUrl: image_mod,
            _id: id_mod
        })
    }).then(response=>{
        //console.log(response)
        if(response.status === 200){
            alert("Prodotto Modificato")
           // console.log("prodotto aggiunto")
           //pulisciForm()
           chiudiModal()
           risultati()
           
        }else{
           alert("Impossibile modificare il prodotto")
           //console.log("prodotto già esistente")
        }
        })
}

function rimuovi(id){
    //console.log("elimino "+id)
    let modal = document.getElementById("deleteModal")
    let modalFooter = document.getElementById("modal-footer")
    modalFooter.innerHTML =""
    modalFooter.innerHTML += `<button type="button" class="btn btn-danger" onclick="confermaEliminazione('${id}')">Si, elimina</button>`
    modal.classList.add("d-block")
    let overlay=document.getElementById("overlay")
    overlay.classList.remove("d-none")
}

function chiudiModal(){
    let modal = document.getElementById("deleteModal")
    modal.classList.remove("d-block")
    let overlay=document.getElementById("overlay")
    overlay.classList.add("d-none")
    let editModal = document.getElementById("editModal")
    editModal.classList.remove("d-block")
    let renderModal = document.getElementById("renderModal")
    renderModal.classList.remove("d-block")
}

function confermaEliminazione(id){
    //console.log("confermo eliminazione" +id )
       fetch(url +id,{
        method: "DELETE",
        headers: {
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY3NjEyMzdmNmI0YjAwMTU0MjhmZGUiLCJpYXQiOjE3MTgzOTEzNDQsImV4cCI6MTcxOTYwMDk0NH0.c3dO6wqYRyeAPbLerUCzPVjiB3qM_Zl4AEsk_Sp_Ky0",
            "content-type": "application/json"
                }
        }).then(response=>{
            // console.log(response)
            if(response.status === 200 || response.status ===204){
              chiudiModal()
              alert("Prodotto eliminato")
             // console.log("prodotto aggiunto")
             risultati()
          }else{
             alert("Opss Impossibile eliminare prodotto")
             //console.log("prodotto già esistente")
          }
          })
   
  }

 function risultati(){
    let prodotti = document.getElementById("prodottiAggiunti")
    prodotti.innerHTML=""
    fetch(url,{
        headers: {
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY3NjEyMzdmNmI0YjAwMTU0MjhmZGUiLCJpYXQiOjE3MTgzOTEzNDQsImV4cCI6MTcxOTYwMDk0NH0.c3dO6wqYRyeAPbLerUCzPVjiB3qM_Zl4AEsk_Sp_Ky0",
            "content-type": "application/json"
            },
    }).then(response=>{
        response.json().then(data=>{
            //console.log(data)
            data.forEach(element => {
              //  console.log(element)
            prodotti.innerHTML += `<div class="ps-3 mt-5"><tr><td> ${element._id}</td><td><img src="${element.imageUrl}" alt="" style="width: 40px; height: 40px"></td><td>${element.name}</td><td>${element.brand}</td><td>${element.description}</td><td>${element.price}€</td>
            <td><button class="btn btn-primary border-1 rounded-circle" onclick="modifica('${element._id}')"><svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
</svg></button></td><td><button class="ms-1 btn btn-danger border-1 rounded-circle" onclick="rimuovi('${element._id}')"><svg xmlns="http://www.w3.org/2000/svg"  width="30" height="30" fill="currentColor" class="bi bi-trash ps-auto " viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></button></td></tr>
            </div>`

            });
        })
        
    })
 }

 function pulisciForm(){
    document.getElementById("name").value = ""
    document.getElementById("description").value = ""
    document.getElementById("brand").value = ""
    document.getElementById("price").value = ""
    document.getElementById("image").value = ""
 }

 function renderModal(title,body,ok,canc){
  
    
    // <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    //       <button type="button" class="btn btn-primary">Save changes</button>
    let modal = document.getElementById("renderModal")
    modal.classList.add("d-block")
    document.querySelector("#modal-title").innerHTML = title
    document.querySelector("#modal-body").innerHTML = body

    if(ok!==null){
        document.querySelector("#modal-footerR").innerHTML = `<button type="button" class="btn btn-primary" onclick="${ok[1]}">${ok[0]}</button>`
    }
}