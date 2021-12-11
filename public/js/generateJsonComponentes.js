function gerarJsonComponentes(){

    var componetesNomes = []
    var componetesDescricao = []

    componentesHtml = document.querySelectorAll('[data-componente]');
    componentesHtml.forEach(element => {
        nome = element.querySelector('[data-comp-titulo]').value;
        descricao = element.querySelector('[data-comp-descricao]').value;
        componetesNomes.push(nome);
        componetesDescricao.push(descricao);
    });

    json = {
        componentes:{
            Nomes: componetesNomes,
            descricao: componetesDescricao
        }
    }


    onDownload()

}


function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  function onDownload(){
    download(JSON.stringify(json), "yourfile.json", "text/plain");
}




