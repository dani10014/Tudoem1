let btnEnviar = document.querySelector(".enviar");
let corpoLista = document.querySelector(".lista");
let cardsCriados = localStorage.getItem("cards") ? JSON.parse(localStorage.getItem("cards")) : [];
let btnLimpar = document.querySelector(".limpar");

console.log(cardsCriados);


btnLimpar.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})

console.log(cardsCriados);

if(cardsCriados.length > 0){
    for(let i = 0; i < cardsCriados.length; i++){
        criarCards(cardsCriados[i]);
    }
}
function criarCards(dadosCard){
    let card = document.createElement("div");
    card.classList.add("col-6", "mt-2");
    card.innerHTML = `          <div class="card" data-id="${dadosCard.id}">
                                    <h6 class="card-title ms-3 mt-2">${dadosCard.nome}</h6>
                                    <div class="card-body">
                                        <p class="card-text">
                                        <p class="alert alert-info">Adicionado no horario</p>
                                            ${dadosCard.hora}
                                        </p>
                                            <button class="btn btn-danger w-100 excluir-card">Excluir</button>
                                    </div>
                                </div>
                            `
    corpoLista.appendChild(card);

}

btnEnviar.addEventListener("click", function(event){
    event.preventDefault();

    let valorInput = document.querySelector("#textouser").value;
    
    let dataAtual = new Date();
    let horaCriado = String(dataAtual.getHours()).padStart(2, '0') + ":" + String(dataAtual.getMinutes()).padStart(2, '0');

    let novoCard = {
        nome: valorInput,
        hora: horaCriado, 
        id: Date.now()
    };

    cardsCriados.push(novoCard);
    criarCards(novoCard);
    document.querySelector("#textouser").value = "";
    localStorage.setItem("cards", JSON.stringify(cardsCriados));
})

corpoLista.addEventListener("click", function(event){
    if(event.target.classList.contains("excluir-card")){
        let cardClicado = event.target.closest(".card");
        let idProduto = cardClicado.dataset.id;
        
        // 1. Filtra o array, criando uma nova lista sem o card que foi clicado.
        // Note que o ID do dataset é uma string, então o convertemos para número para a comparação.
        cardsCriados = cardsCriados.filter(card => card.id !== Number(idProduto));

        // 2. Salva a nova lista (já sem o card) no localStorage.
        localStorage.setItem("cards", JSON.stringify(cardsCriados));

        // 3. Remove o elemento da tela (a coluna que contém o card).
        cardClicado.parentElement.remove();
    }
})
