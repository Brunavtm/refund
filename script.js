//Seleciona os elementos do formulário

const form = document.querySelector("form")
const expense = document.getElementById("expense")
const amount = document.getElementById("amount")
const category = document.getElementById("category")

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

//Captura evento de submit
form.onsubmit = (event) =>{
//Retira o padrão de recarregar a pagina onsubmit
    event.preventDefault()

    //Cria um objeto com as informações da nova despesa.
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    console.log(newExpense)
}