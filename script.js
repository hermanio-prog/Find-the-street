// Variáveis globais
let previousScreen = '';
let selectedLocation = 'Maputo';

// Função para alternar o menu
function toggleMenu(menuId) {
    const menus = document.querySelectorAll('.menu-content');
    menus.forEach(menu => {
        if (menu.id !== menuId) menu.classList.remove('show');
    });
    
    const menu = document.getElementById(menuId);
    menu.classList.toggle('show');
}

// Fechar menus ao clicar fora
window.onclick = function(event) {
    if (!event.target.matches('.menu-btn')) {
        const menus = document.querySelectorAll('.menu-content');
        menus.forEach(menu => {
            menu.classList.remove('show');
        });
    }
}

// Navegação entre telas
function hideAllScreens() {
    document.querySelectorAll('.options').forEach(screen => {
        screen.style.display = 'none';
    });
    document.getElementById('welcome-screen').style.display = 'none';
}

function showScreen(screenId) {
    hideAllScreens();
    document.getElementById(screenId).style.display = 'block';
}

function goHome() {
    showScreen('welcome-screen');
}

function showQuestion() {
    showScreen('location-screen');
}

function selectLocation(location) {
    selectedLocation = location;
    showScreen('options-screen');
}

function backToOptions() {
    showScreen('options-screen');
}

function showReportProblem() {
    previousScreen = 'options-screen';
    showScreen('report-screen');
}

function submitProblem() {
    const description = document.getElementById('problem-description').value;
    if (!description.trim()) {
        alert('Por favor, descreva o problema.');
        return;
    }
    
    console.log('Problema reportado:', {location: selectedLocation, description});
    document.getElementById('problem-description').value = '';
    showScreen('thank-you-screen');
}

function showAlternativeRoutes() {
    previousScreen = 'options-screen';
    showScreen('routes-screen');
}

function showRouteOptions(routeType) {
    let mapsUrl = 'https://www.google.com/maps/dir/?api=1&travelmode=driving';
    
    switch(routeType) {
        case 'fastest':
            mapsUrl += '&avoid=tolls|ferries';
            break;
        case 'no_traffic':
            mapsUrl += '&departure_time=now';
            break;
        case 'urban':
            mapsUrl += '&avoid=highways';
            break;
    }
    
    mapsUrl += `&destination=${encodeURIComponent(selectedLocation)}, Moçambique`;
    window.open(mapsUrl, '_blank');
}

function openSafeRoutes() {
    window.open(`https://www.google.com/maps/search/rotas+seguras+${encodeURIComponent(selectedLocation)}`, '_blank');
}

function showAboutUs() {
    previousScreen = 'welcome-screen';
    showScreen('about-screen');
}

function showHelp() {
    previousScreen = 'welcome-screen';
    showScreen('help-screen');
}

function showInfo() {
    previousScreen = 'welcome-screen';
    showScreen('info-screen');
}

function backToPreviousScreen() {
    showScreen(previousScreen || 'welcome-screen');
}

// Carrega todas as telas dinamicamente
function loadAllScreens() {
    const screensContainer = document.getElementById('screens-container');
    
    screensContainer.innerHTML = `
    <!-- Tela de Localização -->
    <div class="container options" id="location-screen">
        <button class="menu-btn" onclick="toggleMenu('menuContent2')">☰</button>
        <div class="menu-content" id="menuContent2">
            <a href="#" onclick="goHome()">Home</a>
            <a href="#" onclick="showAboutUs()">Sobre Nós</a>
            <a href="#" onclick="showHelp()">Ajuda</a>
            <a href="#" onclick="showInfo()">Informações</a>
        </div>
        <h2>SUA LOCALIZAÇÃO</h2>
        <button onclick="selectLocation('Maputo')">MAPUTO</button>
        <button onclick="selectLocation('Gaza')">GAZA</button>
        <button onclick="selectLocation('Inhambane')">INHAMBANE</button>
        <button onclick="selectLocation('Outros')">OUTRAS REGIÕES</button>
    </div>

    <!-- Tela de Opções -->
    <div class="container options" id="options-screen">
        <button class="menu-btn" onclick="toggleMenu('menuContent3')">☰</button>
        <div class="menu-content" id="menuContent3">
            <a href="#" onclick="goHome()">Home</a>
            <a href="#" onclick="showAboutUs()">Sobre Nós</a>
            <a href="#" onclick="showHelp()">Ajuda</a>
            <a href="#" onclick="showInfo()">Informações</a>
        </div>
        <h2>OPÇÕES</h2>
        <button onclick="showReportProblem()">REPORTAR PROBLEMA</button>
        <button onclick="showAlternativeRoutes()">ROTAS ALTERNATIVAS</button>
        <button onclick="openSafeRoutes()">VIAS SEGURAS</button>
        <button onclick="showInfo()">SAIBA MAIS</button>
    </div>

    <!-- Tela de Reportar Problema -->
    <div class="container options" id="report-screen">
        <button class="menu-btn" onclick="toggleMenu('menuContent4')">☰</button>
        <div class="menu-content" id="menuContent4">
            <a href="#" onclick="goHome()">Home</a>
            <a href="#" onclick="showAboutUs()">Sobre Nós</a>
            <a href="#" onclick="showHelp()">Ajuda</a>
            <a href="#" onclick="showInfo()">Informações</a>
        </div>
        <h2>REPORTAR PROBLEMA</h2>
        <p>Descreva o problema encontrado na via:</p>
        <textarea id="problem-description" placeholder="Ex: Buraco grande na Avenida 24 de Julho, próximo ao semáforo..."></textarea>
        <button onclick="submitProblem()">ENVIAR RELATO</button>
        <button class="back-btn" onclick="backToOptions()">VOLTAR</button>
    </div>

    <!-- Tela de Confirmação -->
    <div class="container options" id="thank-you-screen">
        <button class="menu-btn" onclick="toggleMenu('menuContent5')">☰</button>
        <div class="menu-content" id="menuContent5">
            <a href="#" onclick="goHome()">Home</a>
            <a href="#" onclick="showAboutUs()">Sobre Nós</a>
            <a href="#" onclick="showHelp()">Ajuda</a>
            <a href="#" onclick="showInfo()">Informações</a>
        </div>
        <h2>OBRIGADO!</h2>
        <p class="thank-you-message">Seu relato foi enviado com sucesso!</p>
        <p>Agradecemos por contribuir para estradas mais seguras.</p>
        <button onclick="backToOptions()">VOLTAR AO INÍCIO</button>
    </div>

    <!-- Tela de Rotas Alternativas -->
    <div class="container options" id="routes-screen">
        <button class="menu-btn" onclick="toggleMenu('menuContent6')">☰</button>
        <div class="menu-content" id="menuContent6">
            <a href="#" onclick="goHome()">Home</a>
            <a href="#" onclick="showAboutUs()">Sobre Nós</a>
            <a href="#" onclick="showHelp()">Ajuda</a>
            <a href="#" onclick="showInfo()">Informações</a>
        </div>
        <h2>ROTAS ALTERNATIVAS</h2>
        <button onclick="showRouteOptions('fastest')">CAMINHOS RÁPIDOS</button>
        <button onclick="showRouteOptions('no_traffic')">SEM CONGESTIONAMENTOS</button>
        <button onclick="showRouteOptions('urban')">RUAS URBANAS</button>
        <button class="back-btn" onclick="backToOptions()">VOLTAR</button>
    </div>

    <!-- Tela Sobre Nós -->
    <div class="container options" id="about-screen">
        <button class="menu-btn" onclick="toggleMenu('menuContent7')">☰</button>
        <div class="menu-content" id="menuContent7">
            <a href="#" onclick="goHome()">Home</a>
            <a href="#" onclick="showAboutUs()">Sobre Nós</a>
            <a href="#" onclick="showHelp()">Ajuda</a>
            <a href="#" onclick="showInfo()">Informações</a>
        </div>
        <h2>SOBRE NÓS</h2>
        <p><strong>Sistema "Find Your Hole"</strong></p>
        <p>Plataforma para reportar buracos e problemas nas estradas.</p>
        <p><strong>Equipe:</strong></p>
        <ul class="team-list">
            <li>Hermanio Cuamba</li>
            <li>Arlindo Chantel</li>
            <li>Klinton Juvêncio</li>
            <li>Anis de Lacerda</li>
            <li>Everton</li>
        </ul>
        <button class="back-btn" onclick="backToPreviousScreen()">VOLTAR</button>
    </div>

    <!-- Tela de Ajuda -->
    <div class="container options" id="help-screen">
        <button class="menu-btn" onclick="toggleMenu('menuContent8')">☰</button>
        <div class="menu-content" id="menuContent8">
            <a href="#" onclick="goHome()">Home</a>
            <a href="#" onclick="showAboutUs()">Sobre Nós</a>
            <a href="#" onclick="showHelp()">Ajuda</a>
            <a href="#" onclick="showInfo()">Informações</a>
        </div>
        <h2>AJUDA</h2>
        <p><strong>Como usar:</strong></p>
        <ol class="team-list">
            <li>Selecione sua localização</li>
            <li>Escolha uma opção</li>
            <li>Siga as instruções</li>
        </ol>
        <button class="back-btn" onclick="backToPreviousScreen()">VOLTAR</button>
    </div>

    <!-- Tela de Informações -->
    <div class="container options" id="info-screen">
        <button class="menu-btn" onclick="toggleMenu('menuContent9')">☰</button>
        <div class="menu-content" id="menuContent9">
            <a href="#" onclick="goHome()">Home</a>
            <a href="#" onclick="showAboutUs()">Sobre Nós</a>
            <a href="#" onclick="showHelp()">Ajuda</a>
            <a href="#" onclick="showInfo()">Informações</a>
        </div>
        <h2>INFORMAÇÕES</h2>
        <p>Sistema desenvolvido para melhorar a mobilidade urbana em Moçambique.</p>
        <p>Financiado pelas portagens da cidade de Maputo.</p>
        <button class="back-btn" onclick="backToPreviousScreen()">VOLTAR</button>
    </div>`;
}

// Inicializa o site quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    loadAllScreens();
    hideAllScreens();
    document.getElementById('welcome-screen').style.display = 'block';
});
