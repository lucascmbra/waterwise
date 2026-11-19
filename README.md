# WaterWise — CitizenTech

Protótipo acadêmico da Global Solution 2026/2, FIAP, turma 1ESOR.

O WaterWise ajuda moradores e pequenos produtores a acompanhar o uso de água e perceber aumentos que mereçam investigação. O problema é a dificuldade de interpretar medições e identificar possíveis desperdícios na rotina. O protótipo demonstra essa proposta com dados fictícios, sem sensores reais ou backend.

## Como abrir

Extraia o ZIP e abra `index.html` diretamente no navegador. Não é necessário instalar dependências, compilar ou iniciar servidor. A navegação e a simulação funcionam sem internet.

## Páginas e funcionalidades

- **Início:** público beneficiado, problema, dado real com fonte e ODS.
- **Solução:** funcionamento, perfis de usuário e limites do protótipo.
- **Monitoramento:** dez objetos iniciais (cinco de cada perfil), histórico criado pelo DOM, seleção de perfil, filtro por data, registro manual validado e botão que simula um sensor.
- **Impacto:** benefícios esperados, indicadores propostos e relação com os ODS.
- **Equipe:** os cinco integrantes e seus RMs.

### Página de Monitoramento

**Regra de alerta.** No histórico, medições que superam em mais de 20% a média das medições anteriores do mesmo perfil recebem destaque e um rótulo de alerta. A comparação usa os registros anteriores mesmo quando o filtro exibe apenas uma data. O limite de 20% é uma regra demonstrativa do grupo, não uma referência técnica de consumo ideal nem um diagnóstico de vazamento. A comparação só faz sentido entre períodos e contextos equivalentes.

**Painel e filtro.** O painel considera todos os registros do perfil selecionado; o filtro de data altera apenas a tabela. Ao adicionar um registro ou trocar de perfil, o filtro é limpo para que a nova medição fique visível.

**Formulário.** Aceita de 0,1 a 1.000.000 litros, com até uma casa decimal, e mostra erros e confirmação na própria página.

**Dados.** Permanecem apenas na memória da página e são apagados ao recarregar. Os registros iniciais e as leituras do botão são fictícios. Não há envio a servidor nem validação com usuários reais.

## Tecnologias e estrutura

HTML5, CSS3 e JavaScript puro: HTML semântico, Flexbox, Grid, media queries, arrays de objetos, condicionais, laços, funções, eventos e manipulação do DOM. Não há frameworks, bibliotecas externas, banco de dados ou ferramentas de build.

```text
index.html
pages/solucao.html
pages/monitoramento.html
pages/impacto.html
pages/equipe.html
css/style.css
js/script.js
js/menu.js
img/favicon.svg
README.md
integrantes.txt
```

## Integrantes

| Nome                               | RM     |
| ---------------------------------- | ------ |
| Kevin Bernardo Figueiredo da Rocha | 576163 |
| Ivan Gabriel Soares Guatura        | 574467 |
| Lucas de Aguiar Coimbra            | 575586 |
| Erick Oliveira da Silva Alonso     | 575365 |
| Paulo César dos Santos Morais      | 576540 |

## Vídeo pitch e publicação

- **Vídeo pitch (até 3 min):** [INSERIR LINK PÚBLICO AQUI]
- **Site publicado:** não publicado; o projeto foi preparado para execução local.

## Fontes

- [Instituto Trata Brasil — Estudo de Perdas de Água 2026, SINISA ano-base 2024](https://tratabrasil.org.br/wp-content/uploads/2026/06/Release-Perdas-de-Agua-2026_final-revGO.pdf): 39,53% de perdas na distribuição. Esse indicador contextualiza o problema; não representa desperdício doméstico nem economia obtida pelo WaterWise.
- [ONU Brasil — ODS 6](https://brasil.un.org/pt-br/sdgs/6): meta 6.4, eficiência no uso da água.
- [ONU Brasil — ODS 12](https://brasil.un.org/pt-br/sdgs/12): metas 12.2 e 12.8, uso eficiente de recursos e informação para hábitos sustentáveis.
- [ONU Brasil — ODS 2](https://brasil.un.org/pt-br/sdgs/2) e [ODS 11](https://brasil.un.org/pt-br/sdgs/11): conexões complementares à agricultura e às comunidades sustentáveis.

Fontes consultadas em 19/11/2026. O impacto real do protótipo ainda precisa ser medido em um piloto.

## Uso de IA generativa

Foi utilizado o ChatGPT como ferramenta de apoio em: pesquisa e conferência de fontes, revisão de textos, explicação e correção de erros de HTML/CSS/JavaScript, e da documentação.
