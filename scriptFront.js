let url = "https://striveschool-api.herokuapp.com/api/product/"
let carrello = []
let prezzoTotale = 0
let prodotti = []

document.addEventListener("DOMContentLoaded", () => {
    let sezioneProdotti = document.getElementById("prodotti")
    fetch(url, {
        headers: {
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY3NjEyMzdmNmI0YjAwMTU0MjhmZGUiLCJpYXQiOjE3MTgzOTEzNDQsImV4cCI6MTcxOTYwMDk0NH0.c3dO6wqYRyeAPbLerUCzPVjiB3qM_Zl4AEsk_Sp_Ky0",
            "content-type": "application/json"
        },
    }).then(response => {
        response.json().then(data => {
            prodotti = data
            data.forEach(element => {
                let productId = element._id;
                sezioneProdotti.innerHTML += `
                <div id="${productId}" class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                    <div class="card m-2">
                        <div class="card-body text-center">
                            <img src="${element.imageUrl}" class="card-img-top" style="width: 190px; height: 100px"/>
                            <h5 class="card-title mt-4">${element.name}</h5>
                            <h6 class="card-subtitle mb-1 text-body-secondary">${element.brand}</h6>
                            <p class="card-text mb-0">${element.price}€</p>
                            <button type="button" class="btn btn-dark p-2 mb-2" onclick="aggiungiAlCarrello('${element.name}', '${element.price}')">Aggiungi al carrello</button><br>
                            <a href="#" id="detailsButton-${productId}" class="dettagli pt-2">Dettagli Prodotto</a>
                            <div id="spinner-${productId}" class="spinner"></div>
                        </div>
                    </div>
                </div>`;
            });

            data.forEach(element => {
                let productId = element._id;
                document.getElementById(`detailsButton-${productId}`).addEventListener('click', function (event) {
                    event.preventDefault();
                    //spinner
                    document.getElementById(`spinner-${productId}`).style.display = 'block';

                    setTimeout(function () {
                        window.location.href = `dettagli.html?id=${productId}`;
                    }, 2000);
                });
            });
        });
    });

    //campo di ricerca
    document.getElementById('form1').addEventListener('input', function () {
        cercaProdotto(this.value);
    });


});

function aggiungiAlCarrello(name, price) {
    let sezioneCarrello = document.getElementById("listaCarrello")
    let newLi = document.createElement("li")
    newLi.innerHTML = "<span>" + name + "</span> - Prezzo: <span class='fw-bold'>" + price + "€</span>"
    sezioneCarrello.appendChild(newLi)
    carrello.push(name)
    let contatore = document.getElementById("contatoreCarrello")
    contatore.textContent = "(" + carrello.length + ")"
    prezzoTotale += parseFloat(price)
    let divPrezzo = document.getElementById('totale')
    divPrezzo.innerHTML = "Totale Carrello: " + prezzoTotale + "€"
}

function svuotaCarrello() {
    carrello = []
    let divPrezzo = document.getElementById('totale')
    divPrezzo.innerHTML = ""
    let contatore = document.getElementById("contatoreCarrello")
    contatore.textContent = "(" + carrello.length + ")"
    let ulCarrello = document.getElementById("listaCarrello")
    ulCarrello.innerHTML = ""
}

function cercaProdotto(searchText) {
    let sezioneProdotti = document.getElementById("prodotti");
    sezioneProdotti.innerHTML = ""; // Pulisco la sezione dei prodotti

    prodotti.forEach(element => {
        if (element.name.toLowerCase().includes(searchText.toLowerCase())) {
            let productId = element._id;
            sezioneProdotti.innerHTML += `
            <div id="${productId}" class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                <div class="card m-2">
                    <div class="card-body text-center">
                        <img src="${element.imageUrl}" class="card-img-top" style="width: 190px; height: 100px"/>
                        <h5 class="card-title mt-4">${element.name}</h5>
                        <h6 class="card-subtitle mb-1 text-body-secondary">${element.brand}</h6>
                        <p class="card-text mb-0">${element.price}€</p>
                        <button type="button" class="btn btn-dark p-2 mb-2" onclick="aggiungiAlCarrello('${element.name}', '${element.price}')">Aggiungi al carrello</button><br>
                        <a href="#" id="detailsButton-${productId}" class="dettagli pt-2">Dettagli Prodotto</a>
                        <div id="spinner-${productId}" class="spinner"></div>
                    </div>
                </div>
            </div>`;
        }
    });

    //eventlistener per i bottoni "Dettagli Prodotto"
    prodotti.forEach(element => {
        let productId = element._id;
        if (document.getElementById(`detailsButton-${productId}`)) {
            document.getElementById(`detailsButton-${productId}`).addEventListener('click', function (event) {
                event.preventDefault();
                // Mostro lo spinner
                document.getElementById(`spinner-${productId}`).style.display = 'block';

                setTimeout(function () {
                    window.location.href = `dettagli.html?id=${productId}`;
                }, 2000);
            });
        }
    });
}
