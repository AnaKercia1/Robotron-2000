const MAX_PECAS = 18;
const pecasDisponiveis = document.querySelector('[data-disponivel]');


const ajustes = document.querySelectorAll('[data-operacao]');


const statsAtuais = document.querySelectorAll('[data-stats]');


const corAtual = document.querySelector('[data-cor-robo]');
const botoesCor = document.querySelectorAll('[data-opcao-cor]');


const botaoCriar = document.querySelector('.producao');

const modal = document.querySelector('.modal__sucesso');
const modalFechar = document.querySelector('.modal__fechar');

const statsPorPeca = {
    "bracos": {
        "forca": 29,
        "poder": 35,
        "energia": -18,
        "velocidade": -5
    },

    "blindagem": {
        "forca": 41,
        "poder": 20,
        "energia": 0,
        "velocidade": -20
    },

    "nucleos": {
        "forca": 0,
        "poder": 7,
        "energia": 48,
        "velocidade": -10
    },

    "pernas": {
        "forca": 27,
        "poder": 21,
        "energia": -25,
        "velocidade": 54
    },

    "foguetes": {
        "forca": 0,
        "poder": 28,
        "energia": 0,
        "velocidade": -2
    }
}

function alteraCorRobo(cor) {
    corAtual.src = `img/robotron-${cor}.png`
}


function alteraEstiloBotao(botao) {
    document.querySelector('[data-cor-ativa]').removeAttribute('data-cor-ativa');
    botao.setAttribute('data-cor-ativa', '');
}

function ajustaQuantidadePecas(operacao, peca) {
    const quantidadePeca = peca.querySelector('[data-quantidade]');
    let quantidadeDisponivel = parseInt(pecasDisponiveis.textContent);
    if (operacao === '+' && quantidadeDisponivel > 0) {
        quantidadePeca.value++;
        quantidadeDisponivel--;
        pecasDisponiveis.textContent = quantidadeDisponivel;
    }else if (operacao === '-' && quantidadePeca.value > 0) {
        quantidadePeca.value--;
        quantidadeDisponivel++;
        pecasDisponiveis.textContent += 1;
        pecasDisponiveis.textContent = quantidadeDisponivel;
    }
}

function atualizaStats() {
    const pecas = document.querySelectorAll('[data-peca]');
    const novosStats = { 
        "forca": 0,
        "poder": 0,
        "energia": 0,
        "velocidade": 0
    }

    pecas.forEach((peca) => {
        const quantidade = parseInt(peca.querySelector('[data-quantidade]').value);
        const nomePeca = peca.dataset.peca;
        const valorStats = statsPorPeca[nomePeca]; 
        for (stat in valorStats) {
            novosStats[stat] += valorStats[stat] * quantidade;
        }
    })

    statsAtuais.forEach(stat => {
        stat.textContent = novosStats[stat.dataset.stats];
        console.log(novosStats)
    })
}

function mostraRoboProduzido() {
    const imagemLoading = document.querySelector('.modal__loading')
    const imagemRobo = document.querySelector('.modal__imagem');
    const statsRobo = document.querySelector('.modal__estatisticas');
    const modalRobo = document.querySelector('.modal__robo');
    const tituloModal = document.querySelector('.modal__titulo');

    modalRobo.classList.add('modal--hide');

    setTimeout(() => {
        imagemLoading.classList.add('modal--hide');          
        tituloModal.innerText = 'Robotron pronto para salvar o planeta!'
        imagemRobo.src = corAtual.src;
        statsRobo.innerHTML = ''; 
        statsAtuais.forEach(stat => {
            const estatistica = document.createElement('p');
            estatistica.innerText = `${stat.dataset.stats}: ${stat.innerText}`;
            statsRobo.appendChild(estatistica);
        })    
        modalRobo.classList.remove('modal--hide');
    }, 3500);
}

function fechaModal(){
    const imagemLoading = document.querySelector('.modal__loading');
    const tituloModal = document.querySelector('.modal__titulo');
    
    modal.classList.add('modal--hide');

    imagemLoading.classList.remove('modal--hide');
    tituloModal.innerText = 'Produzindo seu Robotron, aguarde...';
}


ajustes.forEach((ajuste) => {
    ajuste.addEventListener('click', (e) => {
        const operacao = e.target.dataset.operacao;
        const peca = e.target.parentNode;

        ajustaQuantidadePecas(operacao, peca);
        atualizaStats();
    })
})

botoesCor.forEach((botao) => {
    botao.addEventListener('click', (e) => {
        corEscolhida = e.target.dataset.opcaoCor;
        alteraCorRobo(corEscolhida);
        alteraEstiloBotao(botao);
    })
})

botaoCriar.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('modal--hide');
    mostraRoboProduzido();
})
modalFechar.addEventListener('click', () => {
    fechaModal();
})

modal.addEventListener('click', (e) => {
    if (e.target == modal) {
        fechaModal();
    }
})
pecasDisponiveis.textContent = MAX_PECAS;









