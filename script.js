const filmesLista = [];

function fazerLogin() {
    const inputNome = document.getElementById('input-nome');
    const nomeDigitado = inputNome.value.trim();

    if (nomeDigitado !== '') {
        localStorage.setItem('usuarioAtual', nomeDigitado);
        atualizarInterface();
        navegarPara('tela-inicio');
    } else {
        alert('Por favor, digite seu nome!');
    }
}

function sair() {
    localStorage.removeItem('usuarioAtual');
    verificarSessao();
}

function atualizarInterface() {
    const nomeSalvo = localStorage.getItem('usuarioAtual') || 'Usuário';
    
    const saudacao = document.getElementById('saudacao-usuario');
    if (saudacao) {
        saudacao.innerText = `Olá, ${nomeSalvo}`;
    }

    const avatar = document.getElementById('avatar-usuario');
    if (avatar) {
        avatar.innerText = nomeSalvo.charAt(0).toUpperCase();
    }
}

function verificarSessao() {
    const nomeSalvo = localStorage.getItem('usuarioAtual');
    if (nomeSalvo) {
        atualizarInterface();
        navegarPara('tela-inicio');
    } else {
        navegarPara('tela-login');
    }
}

function navegarPara(idTelaDestino) {
    const telas = document.querySelectorAll('.tela');
    telas.forEach(tela => {
        tela.classList.add('oculta');
        tela.classList.remove('ativa');
    });

    const telaAtiva = document.getElementById(idTelaDestino);
    if(telaAtiva) {
        telaAtiva.classList.remove('oculta');
        telaAtiva.classList.add('ativa');
    }

    if(idTelaDestino === 'tela-lista') {
        renderizarLista();
    }
}

function renderizarLista() {
    const container = document.getElementById('lista-conteudo');
    container.innerHTML = ''; 
    
    if (filmesLista.length === 0) {
        container.innerHTML = '<p class="empty-msg" style="text-align: center; margin-top: 40px;">Esta lista ainda não tem nenhum título adicionado.</p>';
        return;
    }

    filmesLista.forEach(filme => {
        const htmlDoFilme = `
            <div class="movie-item" onclick="alert('Redirecionar para detalhes do ID: ' + ${filme.id})">
                <div class="movie-cover">Capa</div>
                <div class="movie-info">
                    <strong>${filme.titulo}</strong>
                    <p style="font-size: 12px; color: gray;">${filme.plataforma} · por ${filme.adicionadoPor}</p>
                </div>
                <div class="movie-votos">
                    <span class="movie-votes">${filme.votos}</span>
                </div>
            </div>
        `;
        container.innerHTML += htmlDoFilme;
    });
}

function enviarMensagem() {
    const input = document.getElementById('input-mensagem');
    const texto = input.value.trim();
    const nomeSalvo = localStorage.getItem('usuarioAtual') || 'Você';

    if (texto !== '') {
        const chatContainer = document.getElementById('chat-mensagens');
        const novaMsg = `
            <div class="msg ana">
                <p><strong>${nomeSalvo}:</strong> ${texto}</p>
            </div>
        `;
        chatContainer.innerHTML += novaMsg;
        input.value = '';
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

verificarSessao();
