//Seleciona os elementos do formulário

const form = document.querySelector("form")
const expense = document.getElementById("expense")
const amount = document.getElementById("amount")
const category = document.getElementById("category")

//Seleciona os elementos da lista
const expenseList = document.querySelector("ul")

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

    expenseAdd(newExpense)
}

//Adiciona um novo item na lista
function expenseAdd(newExpense) {
    try {
        //Cria o elemento para adicionar o item - li - na lista - ul -
        const expenseItem = document.createElement('li')
        expenseItem.classList.add("expense")

        //Cria o icone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        //Cria a informação da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        //Cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        //Cria a categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        //Adiciona name e category na div
        expenseInfo.append(expenseName, expenseCategory)

        //Cria valor da despensa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${
            newExpense.amount.toUpperCase().replace("R$", "")
        }`
    
        //Adiciona informações no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount)

        //Adiciona o item na lista.
        expenseList.append(expenseItem)
    
    
    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.")
        console.log(error)
    }
}