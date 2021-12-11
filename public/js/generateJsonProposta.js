
class Componentes {
    constructor(nome, descricao, itens) {
        this.nome = nome;
        this.descricao = descricao
        this.itens = itens;
    }
}



function gerarJsonProposta(){

    var empresa = document.querySelector("")
    var endereco = document.querySelector("")
    var responsavel = document.querySelector("")
    var head = document.querySelector("")
    var cnpj = document.querySelector("")
    var telefone = document.querySelector("")
    var email = document.querySelector("")
    var prazoExecucao = document.querySelector("")
    var propostaComercial = document.querySelector("")

    proposta = {
        empresa: "Integrare",
        endereco: "R. Benjamin Constant, 3.228 - sl 04 - Costa e Silva, Joinville - SC, 89217-705",
        responsavel: "Eduardo da Luz",
        head: "anton",
        cnpj: "35.047.345/0001-85",
        telefone: "(47) 3207-7254",
        email: "contato@integrareagencia.com.br",
        prazoExecucao: "Contrato terá duração de ${quatidadeMeses} meses de duração. Sendo prorrogado automaticamente em caso da não manifestação do cliente.",
        propostaComercial: {
            comp1: [
                "nome do item",
                "descrição",
                "Itens ${campo dinamicos}"
            ],
            comp2: [
                "nome do item",
                "descrição",
                "Itens ${campo dinamicos}"
            ]
        },
        investimentoMensal: "R$6800",
        condicoesPagamento: "6x"

    }

}







function capturaComponentes() {
    componentesHtml = document.querySelectorAll('');
    componentesHtml.forEach(element => {
        nome = element.querySelector("")
        descricao = element.querySelector("")
        itens = element.querySelector("")
        new Componentes(nome, descricao, itens)
    });
}



