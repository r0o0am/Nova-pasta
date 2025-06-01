// Configuração de partículas para o fundo
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    setupAccordion();
    initializeRanking();
});

// Criar partículas para o fundo
function createParticles() {
    const container = document.querySelector('.particles-container');
    const colors = ['#4CAF50', '#8BC34A', '#CDDC39'];
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Tamanho aleatório
        const size = Math.random() * 50 + 10;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posição aleatória
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Cor aleatória
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        
        // Opacidade aleatória
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        
        // Atraso na animação
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        
        container.appendChild(particle);
    }
}

// Configurar o comportamento do acordeão na seção FAQ
function setupAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Fechar todos os outros itens
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alternar o estado do item atual
            item.classList.toggle('active');
        });
    });
}

// Inicializar o ranking
function initializeRanking() {
    // Simulação de dados para o ranking (será substituído pela integração real)
    fetchRankingData();
    
    // Atualizar o ranking a cada 1 hora
    setInterval(fetchRankingData, 1000 * 60 * 60);
}

// Buscar dados do ranking da planilha usando SheetDB
function fetchRankingData() {
    // URL da API SheetDB fornecida pelo usuário
    const sheetdbUrl = 'https://sheetdb.io/api/v1/dyv8x7za9omhl';
    
    // Exibir mensagem de carregamento
    document.getElementById('ranking-list').innerHTML = '<div class="ranking-loading">Carregando ranking...</div>';
    
    // Buscar dados da API SheetDB
    fetch(sheetdbUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do ranking');
            }
            return response.json();
        })
        .then(data => {
            // Processar os dados recebidos
            const rankingData = data.map((row, index) => {
                return {
                    position: index + 1 ,
                    name: row.nome || row.Nome || 'Participante',  // Ajuste conforme o nome da coluna na sua planilha
                    score: parseInt(row.indicacoes || row.Indicacoes || row.pontos || row.Pontos || 0)  // Ajuste conforme o nome da coluna
                };
            });
            
            // Ordenar por pontuação (do maior para o menor)
            rankingData.sort((a, b) => b.score - a.score);
            
            // Atualizar posições após ordenação
            rankingData.forEach((item, index) => {
                item.position = index + 1;
            });
            
            // Atualizar a interface
            updateRankingUI(rankingData);
            
            // Atualizar contagem total
            const currentCount = rankingData.reduce((total, item) => total + item.score, 0);
            const targetCount = 40;
            
            document.getElementById('current-count').textContent = currentCount;
            document.getElementById('target-count').textContent = targetCount;
            
            // Atualizar barra de progresso
            const progressPercentage = Math.min((currentCount / targetCount) * 100, 100);
            document.getElementById('progress-indicator').style.width = `${progressPercentage}%`;
        })
        .catch(error => {
            console.error('Erro ao buscar dados do ranking:', error);
            // Mostrar mensagem de erro na interface
            document.getElementById('ranking-list').innerHTML = '<div class="ranking-loading">Erro ao carregar o ranking. Tente novamente mais tarde.</div>';
            
            // Em caso de erro, mostrar alguns dados de exemplo para não deixar vazio
            const fallbackData = [
                { position: 1, name: "Maria Silva", score: 8 },
                { position: 2, name: "João Oliveira", score: 6 },
                { position: 3, name: "Ana Santos", score: 5 }
            ];
            
            // Atualizar a interface com dados de fallback
            updateRankingUI(fallbackData);
            
            // Atualizar contagem com dados de fallback
            const currentCount = fallbackData.reduce((total, item) => total + item.score, 0);
            document.getElementById('current-count').textContent = currentCount;
            
            // Atualizar barra de progresso
            const progressPercentage = Math.min((currentCount / 40) * 100, 100);
            document.getElementById('progress-indicator').style.width = `${progressPercentage}%`;
        });
}

// Atualizar a interface do ranking com os dados recebidos
function updateRankingUI(data) {
    const rankingList = document.getElementById('ranking-list');
    
    // Limpar o conteúdo atual
    rankingList.innerHTML = '';
    
    // Adicionar cada item do ranking
    data.forEach(item => {
        const rankingItem = document.createElement('div');
        rankingItem.classList.add('ranking-item');
        
        // Adicionar classe especial para os três primeiros colocados
        if (item.position <= 3) {
            rankingItem.classList.add(`top-${item.position}`);
        }
        
        rankingItem.innerHTML = `
            <div class="rank-position">${item.position}</div>
            <div class="rank-name">${item.name}</div>
            <div class="rank-score">${item.score}</div>
        `;
        
        rankingList.appendChild(rankingItem);
    });
}

// Código para integração real com Google Sheets
// Esta é uma função de exemplo que você pode implementar para buscar dados reais
function fetchRealRankingData() {
    // Para implementar a integração real com o Google Sheets, você precisaria:
    // 1. Criar uma API key no Google Cloud Console
    // 2. Habilitar a Google Sheets API
    // 3. Compartilhar a planilha publicamente ou com a conta de serviço
    // 4. Usar a API do Google Sheets para buscar os dados
    
    // Exemplo de código para buscar dados (necessita de configuração adicional):
    /*
    const sheetId = 'SEU_ID_DA_PLANILHA';
    const sheetRange = 'Nome_Da_Aba!A2:C50'; // Ajuste conforme sua planilha
    const apiKey = 'SUA_API_KEY';
    
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}?key=${apiKey}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Processar os dados recebidos
            const rankingData = data.values.map((row, index) => {
                return {
                    position: index + 1,
                    name: row[0], // Coluna A - Nome
                    score: parseInt(row[1]) // Coluna B - Pontuação
                };
            });
            
            // Ordenar por pontuação (do maior para o menor)
            rankingData.sort((a, b) => b.score - a.score);
            
            // Atualizar posições após ordenação
            rankingData.forEach((item, index) => {
                item.position = index + 1;
            });
            
            // Atualizar a interface
            updateRankingUI(rankingData);
            
            // Atualizar contagem total
            const currentCount = rankingData.reduce((total, item) => total + item.score, 0);
            document.getElementById('current-count').textContent = currentCount;
            
            // Atualizar barra de progresso
            const progressPercentage = Math.min((currentCount / 40) * 100, 100);
            document.getElementById('progress-indicator').style.width = `${progressPercentage}%`;
        })
        .catch(error => {
            console.error('Erro ao buscar dados do ranking:', error);
            // Mostrar mensagem de erro na interface
            document.getElementById('ranking-list').innerHTML = '<div class="ranking-loading">Erro ao carregar o ranking. Tente novamente mais tarde.</div>';
        });
    */
}

// Instruções para implementação real do ranking com Google Sheets:
/*
Para implementar o ranking real com Google Sheets, siga estas etapas:

1. Crie uma planilha no Google Sheets para armazenar os registros
2. Configure a planilha com colunas para Nome, Email, Data de Registro, etc.
3. Publique a planilha na web (Arquivo > Publicar na web)
4. Crie um projeto no Google Cloud Console
5. Habilite a API do Google Sheets
6. Crie uma chave de API com restrições apropriadas
7. Substitua o código de exemplo acima com sua implementação real
8. Teste a integração para garantir que os dados sejam exibidos corretamente

Alternativa mais simples:
- Use a biblioteca SheetDB.io para simplificar a integração
- Ou crie uma API simples com Google Apps Script para servir os dados da planilha
*/
