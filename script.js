//Algoritimo

// OK     1.Pegar os valores dos INPUTS
// OK     2.Fazer o Cálculo do IMC -> valorIMC
// OK     3.Gerar a classificação IMC
// OK     4.Organizar os dados dos usuários para salvar na lista e gerar a data de cadastro
// OK     5.inserir o usuário na lista(salvar no localStorage)
// OK     6.Função para carregar os usuários(localStorage), chamar ao carregar
// OK     7.Reenderizar o conteúdo da tabela com os usuários cadastrados
// OK     8.Botão para limpar os registros dos formulários(localStorage)

function calcular(event){
    //Previni o recarregar da página
    event.preventDefault();
    console.log('Foi executada a função Calcular');
    let usuario = receberValores();
    let imcCalculado = calcularImc(usuario.altura, usuario.peso);
    let classificacaoImc = classificarImc(imcCalculado);
    console.log(classificacaoImc)
    //Usuario recebe os dados atualizados
    usuario = organizarDados(usuario, imcCalculado, classificacaoImc);
    cadastrarUsuario(usuario);
    window.location.reload();
};

function receberValores(){
    let nomeRecebido = document.getElementById("nome").value.trim();
    let alturaRecebida = document.getElementById("altura").value;
    let pesoRecebido = document.getElementById("peso").value;

    let dadosUsuario = {
        nome: nomeRecebido,
        altura: alturaRecebida,
        peso: pesoRecebido
    };

    return dadosUsuario;
}

function calcularImc(altura_, peso_){
    let imc = peso_ / (altura_ * altura_);
    console.log(imc);
    return imc;
}

function classificarImc(imc_){
    if (imc_ < 18.5){
        return "Abaixo do peso";
    } else if(imc_>=18.5 && imc_ < 25){
        return "Peso Normal";
    } else if(imc_>=25 && imc_ < 30){
        return "Sobrepeso";
    }else {
        return "Obesidade";
    }
}

function organizarDados(dadosUsuario, valorIMC, classificacaoImc){
    // let dataHoraAtual = new Date().toISOString;
    let dataHoraAtual = new Intl.DateTimeFormat('pt-BR', { timeStyle: 'long', dateStyle: 'short' }).format(Date.now());

    console.log(dataHoraAtual);
    //Organizando o objeto para salvar
    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        imc: valorIMC,
        situacaoImc: classificacaoImc,
        dataCadastro: dataHoraAtual
    }

    return dadosUsuarioAtualizado;
}

function cadastrarUsuario(dadosUsuario_){
    let listaUsuarios = [];
    // localStorage.setItem("User", "Cleber")

    //Se tem usuário cadastrado
    if(localStorage.getItem("usuariosCadastrados") != null){
        //Guarda as informações na Array e converte string para Objeto
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }//Se não houver usuário cadastrar o atual
        listaUsuarios.push(dadosUsuario_);
        //Salva a lista de usuarios e converte de Objeto para String
        localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios));
    
}

function carregarUsuarios(){
    let listaCarregada = [];
    if(localStorage.getItem("usuariosCadastrados") != null){
        //Guarda as informações na Array e converte string para Objeto
        listaCarregada = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    if(listaCarregada.length == 0){
        //se a lista estiver vazia mostre uma msg
        let tabela = document.getElementById("corpo-tabela");

        tabela.innerHTML = `<tr class="linha-mensagem">
            <td colspan="6">Nenhum usuário cadastrado 😢</td>
        </tr>`
    } else{
        //Mostrar conteúdo da tabela
        montarTabela(listaCarregada);
    }

    console.log (listaCarregada);
}

window.addEventListener("DOMContentLoaded", () => carregarUsuarios());

function montarTabela(listaUsuarios_){
    let tabela = document.getElementById("corpo-tabela");

    let template = "";

    listaUsuarios_.forEach(usuario => {
        template += `<tr>
            <td data-cell="nome">${usuario.nome}</td>
            <td data-cell="altura">${usuario.altura}</td>
            <td data-cell="peso">${usuario.peso}</td>
             <td data-cell="valor do IMC">${usuario.imc.toFixed(2)}</td>
            <td data-cell="classificação do IMC">${usuario.situacaoImc}</td>
            <td data-cell="data de cadastro">${usuario.dataCadastro}</td> 
        </tr>`
        
    });

    tabela.innerHTML = template;
}

function deletarRegistros(){
    localStorage.removeItem("usuariosCadastrados");
    window.location.reload();
}