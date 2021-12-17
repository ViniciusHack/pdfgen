// @ts-nocheck
const company = document.querySelector('input[name="company"]')
const email = document.querySelector('input[name="email"]')
const phone = document.querySelector('input[name="phone"]')
const head = document.querySelector('input[name="head"]')
const cnpj = document.querySelector('input[name="cnpj"]')
const address = document.querySelector('input[name="address"]')
const proposal = document.querySelector('input[name="proposal"]')
const responsible = document.querySelector('input[name="responsible"]')
const carouselInner = document.querySelector(".carousel-inner")
const active = document.querySelector(".carousel-item.active")
const badges = document.querySelector(".container-badges")

// const test = [0,1,2,3,4,5,6,7,8,9]

// const size = 3; 

// let arrayOfArrays = [];


// for (let i=0; i<test.length; i+=size) {
//      arrayOfArrays.push(test.slice(i,i+size));
// }
// console.log(arrayOfArrays);

async function loadBadges() {
    const { data } = await axios.get("/consult")
    const allCards = data.data.phase.cards.edges

    let arrBlocks = []

    for (let i = 0; i < allCards.length; i+=5) {
        arrBlocks.push(allCards.slice(i, i+5))
    }
    let templateDiv = `
    <div class="carousel-item">
        <div class="container-badges d-flex justify-content-center">
    
        </div>
    </div>
    `

    arrBlocks.forEach((badgeBlock, index) => {
        if(index === 0) {
            badgeBlock.forEach(badge => {
                const template = `
                <span class="badge badge-pill badge-primary badge-card" onclick="handleOnClick(this)" data-cardid="${badge.node.id}">${badge.node.title}</span>
                `
                active.children[0].innerHTML += template
            })
        } else {
            carouselInner.innerHTML += templateDiv
            badgeBlock.forEach(badge => {
                const template = `
                    <span class="badge badge-pill badge-primary badge-card" onclick="handleOnClick(this)" data-cardid="${badge.node.id}">${badge.node.title}</span>
                `
                const allItems = document.querySelectorAll(".carousel-item")
                allItems[index].children[0].innerHTML += template
            })
        }
    })

}
async function handleOnClick(el) {
    const id = el.dataset.cardid
    async function loadCardDetails() {

        const { data } = await axios.get("/card", { params: { id }})
        const allFields = data.data.card.fields
            allFields.forEach(info => {
                if(info.name === 'Nome da Empresa') company.value = info.value
                else if(info.name === "Telefone") phone.value = info.value
                else if(info.name === "Email") email.value = info.value
                else if(info.name === "Vendedor") {
                    let infoHead = info.value.split('"')[1]
                    if(infoHead === undefined) {
                        infoHead = ""
                    }
                    head.value = infoHead
                }
                else if(info.name === "CNPJ") cnpj.value = info.value
                else if(info.name.includes("Endere")) address.value = info.value
                else if(info.name.includes("Proposta N")) proposal.value = info.value
                else if (info.name === "Nome do Contato") responsible.value = info.value
            })
        
    }
    loadCardDetails()
}