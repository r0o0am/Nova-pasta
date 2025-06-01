# Conexão Premiada - Landing Page

Este é o projeto da landing page para a competição "Conexão Premiada" da iGreen Energy.

## Estrutura do Projeto

- `index.html` - Arquivo principal da landing page
- `styles.css` - Estilos CSS para o tema escuro com cores vibrantes
- `script.js` - Funcionalidades JavaScript, incluindo o ranking dinâmico
- `logo.avif` - Logo da iGreen Energy

## Funcionalidades

1. **Design Responsivo**: Layout adaptado para dispositivos móveis e desktop
2. **Tema Escuro com Cores Vibrantes**: Visual festivo com animações e partículas
3. **Formulário Google Forms**: Incorporado para cadastro de participantes
4. **Regulamento**: Incorporado via iframe para consulta
5. **Ranking Dinâmico**: Exibe os participantes com mais indicações

## Instruções para Integração do Ranking

Para implementar o ranking real com Google Sheets, siga estas etapas:

1. Crie uma planilha no Google Sheets para armazenar os registros
2. Configure a planilha com colunas para Nome, Email, Data de Registro, etc.
3. Publique a planilha na web (Arquivo > Publicar na web)
4. Crie um projeto no Google Cloud Console
5. Habilite a API do Google Sheets
6. Crie uma chave de API com restrições apropriadas
7. Substitua o código de exemplo no arquivo script.js com sua implementação real
8. Teste a integração para garantir que os dados sejam exibidos corretamente

Alternativas mais simples:
- Use a biblioteca SheetDB.io para simplificar a integração
- Ou crie uma API simples com Google Apps Script para servir os dados da planilha

## Personalização

Para personalizar a landing page:

- Cores: Edite as variáveis CSS no início do arquivo styles.css
- Textos: Modifique diretamente no arquivo index.html
- Imagens: Substitua o arquivo logo.avif mantendo o mesmo nome

## Contato

Para dúvidas ou suporte:
- E-mail: evertontrindade140@gmail.com
- WhatsApp: (67) 9 9683-4854
