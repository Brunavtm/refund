//Seleciona os elementos do formulário

const amount = document.getElementById("amount")

//Captura o evento input
amount.oninput = () => {
    //Recebe o valor do input, verifica se tem letras, se tiver retira
    let value = amount.value.replace(/\D/g, "")
    
    //Transforma o valor em centavos
    value = Number(value) / 100
    
    //Atualiza o valor do input
    amount.value = formatCurrencyBRL(value)

}
//Formata o valor do input
function formatCurrencyBRL(value){
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

    return value
}