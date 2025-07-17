// Variáveis globais
let previousScreen = '';
let selectedLocation = 'Maputo';

// Funções de navegação
function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    menu.classList.toggle('show');
}

function hideAllScreens() {
    document.querySelectorAll('.options').forEach(screen => {
        screen.style.display = 'none';
    });
    document.getElementById('welcome-screen').style.display = 'none';
}

function showQuestion() {
    hideAllScreens();
    document.getElementById('location-screen').style.display = 'block';
}

function selectLocation(location) {
    selectedLocation = location;
    showOptions();
}

function showOptions() {
    hideAllScreens();
    document.getElementById('options-screen').style.display = 'block';
}

// [Continua com todas as outras funções...]

// Carrega as telas dinamicamente
function loadScreens() {
    const screensContainer = document.getElementById('screens-container');
    
    // Tela de Localização
    screensContainer.innerHTML += `
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
    </div>`;
    
    // [Adicione as outras telas da mesma forma...]
}

// Inicializa o carregamento das telas
document.addEventListener('DOMContentLoaded', loadScreens)
