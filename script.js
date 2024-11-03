//Seleciona os elementos do formulário

const form = document.querySelector("form")
const expense = document.getElementById("expense")
const amount = document.getElementById("amount")
const category = document.getElementById("category")

//Seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

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
        
        //Atualiza quantidade de despesas
        updateTotals()
    
    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.")
        console.log(error)
    }
}

function updateTotals(){
    try {
        //Recupera todos os itens da lista
        const items = expenseList.children
        
        //Atualiza quantidade de despesas
        expensesQuantity.textContent = `${items.length} ${
            items.length > 1 ? "despesas" : "despesa"
        }`

        //Variavel para incrmentar o total
        let total = 0

        //Percorre cada item da lista
        for (let item =0; item < items.length; item++) {
            const itemAmount = items[item].querySelector(".expense-amount")

            
        //Remove caracteres não númericos e substitui virgula por ponto.
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".")
        
        //Converte valor para float
        value = parseFloat(value)

        //Verifica se é um número válido
        if(isNaN(value)) {
            return alert("Não foi possível calcular o total. O valor não parece um número.")
        }

        //Incrementa o valor total
        total += Number(value)
        
        }

        //Cria a span para adicionar o R$ formatado.
        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"

        //Formata o valor e remove o R$ exibido pela small
        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

        //Limpa o conteudo do HMTL
        expensesTotal.innerHTML = ""

        //Adiciona o symbol e valor formatado
        expensesTotal.append(symbolBRL, total)

    } catch (error) {
        console.log(error)
        alert("não foi possível atualizar os totais.")
    }
}