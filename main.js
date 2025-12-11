let nomes = document.getElementById('nomes')
let sorteio = document.getElementById('sorteio')
let adicionar = document.getElementById('adicionar')
let nome = document.getElementById('nome')

let nomesL = new Set()
let escolhidos = new Map()
let escoDesafios = new Map()
adicionar.addEventListener('click', ()=>{
    if (nome.value === '') return;
    let item = document.createElement('p')
    item.className = "nome"
    item.textContent = nome.value
    nomesL.add(nome.value)
    nomes.append(item)
    nome.value = "";
})
function sortear(){
    let arrayNomes = Array.from(nomesL)
    let arraySorteado = [...arrayNomes] // Cópia para embaralhar
    
    // Embaralha os nomes
    for (let i = arraySorteado.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arraySorteado[i], arraySorteado[j]] = [arraySorteado[j], arraySorteado[i]]
    }
    
    // Garante que ninguém tira a si mesmo
    let valido = false
    while (!valido) {
        valido = true
        for (let i = 0; i < arrayNomes.length; i++) {
            if (arrayNomes[i] === arraySorteado[i]) {
                valido = false
                break
            }
        }
        if (!valido) {
            for (let i = arraySorteado.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [arraySorteado[i], arraySorteado[j]] = [arraySorteado[j], arraySorteado[i]]
            }
        }
    }
    
    // Cria o mapa: quem dá presente para quem
    for (let i = 0; i < arrayNomes.length; i++) {
        escolhidos.set(arrayNomes[i], arraySorteado[i])
    }
    let desafios = [" ",'contrario', 'mimica', 'historia','desenho']
    escolhidos.forEach(e=>{
        let randomizando = Math.random() * desafios.length;
        while(randomizando==" "){
            randomizando = Math.random() * desafios.length
        }
        
        escoDesafios.set(e,desafios[Math.floor(randomizando)])
    })

    console.log(escolhidos)
    console.log(escoDesafios)
}

function gerar_links(){
    let arrayNomes = Array.from(nomesL)
    const divButtons = document.getElementById("buttons")
    for(let i = 0; i < arrayNomes.length; i++){
        const button = document.createElement('button')
        button.textContent = `${arrayNomes[i]}`
        button.className = "button"
        button.onclick = ()=> downloadArchive(arrayNomes[i]);
        divButtons.appendChild(button);
    }
}
function downloadArchive(index){
    const conteudo = `Seu Cripto Amigo é ${escolhidos.get(index)}\nSeu desafio é ${escoDesafios.get(index)}`
    const blob = new Blob([conteudo])
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `${index}.txt`
    link.click()
}
sorteio.addEventListener('click', ()=>{
    if (nomesL.size<=1) return
    sortear()
    gerar_links()
})