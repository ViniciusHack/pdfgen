// @ts-nocheck
let value = 0

let blocoCards = document.querySelector('[data-cards]')
 
let template = `
<div class="card comp-card" data-componente="">
<div class="card-body">
<fieldset >
    <input class="form-control" type="text" placeholder="Default input" name="titles" data-comp-titulo>
    <br>
    <textarea class="form-control" id="exampleFormControlTextarea1" name="descriptions" rows="3" data-comp-descricao></textarea>
    <br>
    </fieldset>
    <button type="button" class="btn btn-outline-success" onclick="salvaCard(this)">Salvar</button>
    <button type="button" class="btn btn-outline-danger"onclick="deletaCard(this)">Deletar</button>
</div>
</div>`



function criaCard() {
    let containerCard = document.createElement("div");
    containerCard.innerHTML = template;

    blocoCards?.appendChild(containerCard)
}

function editaCard(a) {
    a.parentElement.parentElement.querySelector('fieldset').disabled = false
    a.textContent = "Salvar"
    a.setAttribute('onclick', 'salvaCard(this)')
}

function salvaCard(a) {
    a.parentElement.parentElement.querySelector('fieldset').disabled = true
    a.textContent = "Editar"
    a.setAttribute('onclick', 'editaCard(this)')
}

function deletaCard(a) {

    r = confirm("Quer deletar esse card?");
    if (r == true) {
        a.parentElement.parentElement.parentElement.remove()
    }

}

function deletaTodosCard() {

    r = confirm("Quer deletar todos os cards?");
    if (r == true) {

        g = document.querySelectorAll('[data-componente]')
        g.forEach(element => {
            element.parentElement.remove()
        });
    }

}

function deletaTodosCardDirect() {


    g = document.querySelectorAll('[data-componente]')
    g.forEach(element => {
        element.parentElement.remove()
    });


}


function criaCardUpload(nome, descricao) {

    let templateUpload= `
<div class="card comp-card" data-componente="">
<div class="card-body">
<fieldset >
    <input class="form-control" type="text" placeholder="Default input" data-comp-titulo value="${nome}">
    <br>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" data-comp-descricao >${descricao}</textarea>
    <br>
    </fieldset>
    <button type="button" class="btn btn-outline-success" onclick="salvaCard(this)">Salvar</button>
    <button type="button" class="btn btn-outline-danger"onclick="deletaCard(this)">Deletar</button>
</div>
</div>`

    containerCard = document.createElement("div");
    containerCard.innerHTML = templateUpload;

    blocoCards.appendChild(containerCard)
}