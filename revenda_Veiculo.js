//inicia o valor de id em 1
this.id = 1
let arrayCarros = []

function addVeiculo() {
    let carros = {}
    carros.id = this.id;
    carros.marca = document.querySelector("#marca").value;
    carros.modelo = document.querySelector("#modelo").value;
    carros.ano = document.querySelector("#ano").value;
    carros.valor = document.querySelector("#valor").value;

    arrayCarros.push(carros)
}

const cadastrarVeiculo = function() {
    let msg = ''
        //if de validação dos campos
    if (document.querySelector("#marca").value == "") {
        msg = 'Informe a marca do veículo';
        document.querySelector("#marca").focus()

    } else if (document.querySelector("#modelo").value == "") {
        msg = 'Informe o modelo do veículo';
        document.querySelector("#modelo").focus()

    } else if (document.querySelector("#ano").value == "") {
        msg = 'Informe o ano do veículo';
        document.querySelector("#ano").focus()

    } else if (document.querySelector("#valor").value == "") {
        msg = 'Informe o valor do veículo';
        document.querySelector("#valor").focus()
    }
    if (msg != '') {
        alert(msg)
        return
    } else {
        //entra na função de adicionar no array por push os dados do obj carros
        addVeiculo()
            //incrementando o id dos obj carros
        this.id++;
    }

    mostrarTodosCarrosTr(arrayCarros)
    limparFocarCampo()

}
btnNovo.addEventListener("click", () => { cadastrarVeiculo() })

const limparFocarCampo = function() {
    //limpa os campo
    document.querySelector("#marca").value = ""
    document.querySelector("#modelo").value = ""
    document.querySelector("#ano").value = ""
    document.querySelector("#valor").value = ""
        //aponta o foco para o campo marca
    document.querySelector("#marca").focus()
}

const filtrarDadosCarros = function() {
    //verifica se o valor nao esta preenchido
    if (pesquisar.value == "") {
        //listar todos dos carros no  TR
        mostrarTodosCarrosTr(arrayCarros)
    }
    //filtrar os usuario por marca ou modelo ou ano de acordo com o texto digitado no campo
    let arrCarrosEncontrados = arrayCarros.filter(function(carro) {
            return carro.marca.toLocaleLowerCase().includes(pesquisar.value.toLocaleLowerCase()) ||
                carro.modelo.toLocaleLowerCase().includes(pesquisar.value.toLocaleLowerCase()) ||
                carro.ano.includes(pesquisar.value)
        })
        //se o array encontrado tiver tamanho 0 o sistema uma tr com registro nao encontrado
    if (arrCarrosEncontrados.length === 0) {
        //tbody id=listaCarros e insere o html com a informação abaixo
        listaCarros.innerHTML = `
        <tr>
            <td colspan="5" class="text-center"> - NENHUM REGISTRO ENCONTRADO -  </td>
        </tr>
        `
    } else {
        //mostrar os dados filtrados na TR
        mostrarTodosCarrosTr(arrCarrosEncontrados)
    }
}
pesquisar.onkeyup = filtrarDadosCarros

//função so para usar o botao pesquisando por valor
const filtrarDadosCarroslimite = function() {
    //verifica se o valor nao esta preenchido
    if (limite.value == "") {
        //listar todos os usuario na TR
        mostrarTodosCarrosTr(arrayCarros)
    }
    //filtrar os usuario por login ou nome ou senha de acordo com o texto digitado no campo
    let arrCarrosEncontradoslimite = arrayCarros.filter(function(carro) {
            return Number(carro.valor) <= Number(limite.value)
        })
        //se o array encontrado tiver tamanho 0 o sistema uma tr com registro nao encontrado
    if (arrCarrosEncontradoslimite.length === 0) {
        //tbody id=dadosUsuario e insere o html com a informação abaixo
        listaCarros.innerHTML = `
        <tr>
            <td colspan="5" class="text-center"> - NENHUM REGISTRO ENCONTRADO -  </td>
        </tr>
        `
    } else {
        //mostrar os dados filtrados na TR
        mostrarTodosCarrosTr(arrCarrosEncontradoslimite)
    }
    if(document.querySelector('#limite').value == ""){
        mostrarTodosCarrosTr(arrayCarros)
        return
    
    }
}
btnPesquisar.addEventListener("click", () => { filtrarDadosCarroslimite() })

const mostrarTodosCarrosTr = function(arrayCarros) {
    let mostrarTrTela = ""
        //iterar o array usuarios montando um HTML de tr e td com os todos os dados
    arrayCarros.forEach(function(carro) {
            mostrarTrTela += `
        <tr>
            <td>${carro.id}</td>
            <td>${carro.marca}</td>
            <td>${carro.modelo}</td>
            <td>${carro.ano}</td>
            <td>${carro.valor}</td>
        </tr>
        `
        })
        //tbody id=dadosUsuario e insere o html montado acima
    listaCarros.innerHTML = mostrarTrTela
}