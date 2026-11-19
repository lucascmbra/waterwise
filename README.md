# WaterWise — CitizenTech

Protótipo acadêmico desenvolvido para a **Global Solution 2026/2** da FIAP, turma **1ESOR**.

O WaterWise ajuda moradores e pequenos produtores a acompanhar o uso de água e identificar aumentos que mereçam investigação. O problema abordado é a dificuldade de interpretar medições e perceber possíveis desperdícios na rotina. O protótipo demonstra essa proposta com dados fictícios, sem sensores reais ou backend.

## Como abrir

1. Extraia o arquivo ZIP da entrega.
2. Abra `index.html` diretamente no navegador.

Não é necessário instalar dependências, compilar o projeto ou iniciar um servidor. A navegação e a simulação funcionam sem conexão com a internet.

## Páginas e funcionalidades

- **Início:** público beneficiado, problema, dado real com fonte e Objetivos de Desenvolvimento Sustentável (ODS) relacionados.
- **Solução:** funcionamento da proposta, perfis de usuário e limites do protótipo.
- **Monitoramento:** dez registros iniciais em um array de objetos (cinco por perfil), histórico renderizado pelo DOM, seleção de perfil, filtro por data, registro manual com validação e botão que simula uma leitura de sensor.
- **Impacto:** benefícios esperados, indicadores propostos e relação com os ODS.
- **Equipe:** identificação dos cinco integrantes e seus RMs.

### Página de Monitoramento

**Regra de alerta.** No histórico, medições que superam em mais de 20% a média das medições anteriores do mesmo perfil recebem destaque e um rótulo de alerta. A comparação considera os registros anteriores mesmo quando o filtro exibe apenas uma data. O limite de 20% é uma regra demonstrativa definida pelo grupo, não uma referência técnica de consumo ideal nem um diagnóstico de vazamento. A comparação só faz sentido entre períodos e contextos equivalentes.

**Painel e filtro.** O painel considera todos os registros do perfil selecionado; o filtro por data altera apenas a tabela. Ao adicionar um registro ou trocar de perfil, o filtro é limpo para que a nova medição fique visível.

**Formulário.** Aceita valores de 0,1 a 1.000.000 litros, com até uma casa decimal, e exibe mensagens de erro e confirmação na própria página, sem utilizar `alert()`.

**Dados.** Os registros permanecem apenas na memória da página e são apagados ao recarregá-la. Tanto os registros iniciais quanto as leituras geradas pelo botão são fictícios. Não há envio de dados a um servidor nem validação com usuários reais.

## Tecnologias utilizadas

- **HTML5:** estrutura semântica das páginas e formulários.
- **CSS3:** estilos, Flexbox, Grid e media queries para responsividade.
- **JavaScript puro:** arrays de objetos, condicionais, laços, funções, eventos, validações e manipulação do DOM.

Não são utilizados frameworks, bibliotecas externas, banco de dados ou ferramentas de build.

## Estrutura do projeto

```text
index.html
pages/
  solucao.html
  monitoramento.html
  impacto.html
  equipe.html
css/
  style.css
js/
  script.js
img/
  favicon.svg
README.md
integrantes.txt
entrega.pdf
```

A estrutura acima apresenta os principais arquivos. Outros recursos de imagem podem estar presentes na pasta `img/`.

## Integrantes

| Nome                               | RM     |
| ---------------------------------- | ------ |
| Kevin Bernardo Figueiredo da Rocha | 576163 |
| Ivan Gabriel Soares Guatura        | 574467 |
| Lucas de Aguiar Coimbra            | 575586 |
| Erick Oliveira da Silva Alonso     | 575365 |
| Paulo César dos Santos Morais      | 576540 |

## Vídeo pitch e publicação

- **Vídeo pitch (até 3 minutos):** https://youtu.be/-EysLc1vuMk
- **Site publicado:** https://waterwise-ashy.vercel.app

Os links do vídeo e do site também constam no PDF de identificação incluído na entrega. Verifique se o vídeo pode ser acessado em uma aba anônima.

## Fontes

- [Instituto Trata Brasil — Estudo de Perdas de Água 2026, SINISA ano-base 2024](https://tratabrasil.org.br/wp-content/uploads/2026/06/Release-Perdas-de-Agua-2026_final-revGO.pdf): 39,53% de perdas na distribuição. Esse indicador contextualiza o problema; não representa desperdício doméstico nem economia obtida pelo WaterWise.
- [ONU Brasil — ODS 6](https://brasil.un.org/pt-br/sdgs/6): meta 6.4, eficiência no uso da água.
- [ONU Brasil — ODS 12](https://brasil.un.org/pt-br/sdgs/12): metas 12.2 e 12.8, uso eficiente de recursos e informação para hábitos sustentáveis.
- [ONU Brasil — ODS 2](https://brasil.un.org/pt-br/sdgs/2) e [ODS 11](https://brasil.un.org/pt-br/sdgs/11): conexões complementares com agricultura e comunidades sustentáveis.

Fontes consultadas em 19/11/2026. O impacto real do protótipo ainda precisa ser medido em um piloto.

## Uso de IA generativa

O ChatGPT foi utilizado como ferramenta de apoio à pesquisa e conferência de fontes, revisão de textos, explicação e correção de erros de HTML, CSS e JavaScript, e elaboração e revisão da documentação.
