const btnEnviar = document.querySelector(".enviar");
const corpoLista = document.querySelector(".lista");
let cardsCriados = localStorage.getItem("cards") ? JSON.parse(localStorage.getItem("cards")) : [];
const btnLimpar = document.querySelector(".limpar");
const botoesCalcul = document.querySelectorAll('.botoes button:not(#botao-calcular)');
const botoesDivisor = document.querySelectorAll(".divisores button:not(#botao-excluir)");
const displayCalcu = document.querySelector("#display-calcul");
const botaoExcluir = document.querySelector("#botao-excluir");
const botaoCalcular = document.querySelector("#botao-calcular");
let toastLiveExample = document.getElementById('liveToast');
let primeiroValor = 0;
let segundoValor = 0;
let divisorSelecionado = "";

console.log(divisorSelecionado);
console.log(botoesDivisor)
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
    
    if(valorInput === ""){
        alert("Preencha o campo")
        return;
    }

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

    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show();
})

corpoLista.addEventListener("click", function(event){
    if(event.target.classList.contains("excluir-card")){
        let cardClicado = event.target.closest(".card");
        let idProduto = cardClicado.dataset.id;
        
        cardsCriados = cardsCriados.filter(card => card.id !== Number(idProduto));

        localStorage.setItem("cards", JSON.stringify(cardsCriados));

        cardClicado.parentElement.remove();
    }
})
botoesCalcul.forEach((button) => {
    button.addEventListener("click",function(){
        let botaoNumero = button.textContent;
        displayCalcu.value += botaoNumero;
    })
});
botoesDivisor.forEach((button) => {
    button.addEventListener("click",function(){
        if(divisorSelecionado !== ""){
            return
        }
        if(displayCalcu.value === ""){
            return;
        }

        primeiroValor = parseFloat(displayCalcu.value)
        divisorSelecionado = ` ${button.textContent} `;
        displayCalcu.value += divisorSelecionado;
        console.log(primeiroValor);
        console.log(divisorSelecionado);
    })
});
botaoCalcular.addEventListener("click", function(){
        

        let valorvisor = displayCalcu.value;
        
        let partes = valorvisor.split(divisorSelecionado);
        
        let segundoValor = parseFloat(partes[1])

        let resultado = 0;
        let sinal = divisorSelecionado.trim();

        if(sinal === "x"){
            resultado = primeiroValor * segundoValor;
            displayCalcu.value = resultado;
        }else if(sinal === "-"){
            resultado = primeiroValor - segundoValor;
            displayCalcu.value = resultado
        }else if(sinal === "+"){
            resultado = primeiroValor + segundoValor;
            displayCalcu.value = resultado
        }else if(sinal === "÷"){
            resultado = primeiroValor / segundoValor;
            displayCalcu.value = resultado
        }
        
        primeiroValor = 0;
        segundoValor = 0;
        divisorSelecionado= "";
    })
botaoExcluir.addEventListener("click", function(){
        displayCalcu.value = displayCalcu.value.slice(0, -1);
        if(displayCalcu.value === ""){
            primeiroValor = 0;
            segundoValor = 0;
            divisorSelecionado = "";
        }
});