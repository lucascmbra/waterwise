const botaoMenu = document.querySelector(".botao-menu");
const menuPrincipal = document.getElementById("menu-principal");
const cabecalho = document.querySelector("header");

cabecalho.classList.add("menu-ativo");

function definirMenu(aberto) {
    menuPrincipal.classList.toggle("aberto", aberto);
    botaoMenu.setAttribute("aria-expanded", aberto);
    botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
}

botaoMenu.addEventListener("click", function() {
    definirMenu(botaoMenu.getAttribute("aria-expanded") !== "true");
});

menuPrincipal.addEventListener("click", function(event) {
    if (event.target.closest("a")) {
        definirMenu(false);
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && botaoMenu.getAttribute("aria-expanded") === "true") {
        definirMenu(false);
        botaoMenu.focus();
    }
});

document.addEventListener("click", function(event) {
    if (!cabecalho.contains(event.target)) {
        definirMenu(false);
    }
});

window.addEventListener("resize", function() {
    if (window.innerWidth > 768) {
        definirMenu(false);
    }
});

function iniciarMonitoramento() {
    if (!document.getElementById("form-consumo")) {
        return;
    }

    let registros = [

        {
            perfil: "Residencial",
            consumo: 450,
            origem: "Sensor simulado",
            data: "10/11/2026"
        },

        {
            perfil: "Residencial",
            consumo: 520,
            origem: "Manual",
            data: "11/11/2026"
        },

        {
            perfil: "Residencial",
            consumo: 480,
            origem: "Sensor simulado",
            data: "12/11/2026"
        },

        {
            perfil: "Residencial",
            consumo: 700,
            origem: "Manual",
            data: "13/11/2026"
        },

        {
            perfil: "Residencial",
            consumo: 460,
            origem: "Sensor simulado",
            data: "14/11/2026"
        },

        {
            perfil: "Agrícola",
            consumo: 1200,
            origem: "Sensor simulado",
            data: "10/11/2026"
        },

        {
            perfil: "Agrícola",
            consumo: 1500,
            origem: "Manual",
            data: "11/11/2026"
        },

        {
            perfil: "Agrícola",
            consumo: 1350,
            origem: "Sensor simulado",
            data: "12/11/2026"
        },

        {
            perfil: "Agrícola",
            consumo: 1800,
            origem: "Manual",
            data: "13/11/2026"
        },

        {
            perfil: "Agrícola",
            consumo: 1250,
            origem: "Sensor simulado",
            data: "14/11/2026"
        }

    ];

    let perfilAtual = "Residencial";
    let contadorSensor = 0;

    const configuracoesSensor = {
        "Residencial": {
            consumoBase: 420,
            incrementoPorLeitura: 35,
            faixaVariacao: 180
        },
        "Agrícola": {
            consumoBase: 1000,
            incrementoPorLeitura: 125,
            faixaVariacao: 700
        }
    };

    const consumoTotal = document.getElementById("consumo-total");
    const totalRegistros = document.getElementById("total-registros");
    const situacaoConsumo = document.getElementById("situacao-consumo");
    const listaRegistros = document.getElementById("lista-registros");
    const perfilSelecionado = document.getElementById("perfil-selecionado");
    const tituloRecomendacao = document.getElementById("titulo-recomendacao");
    const textoRecomendacao = document.getElementById("texto-recomendacao");
    const formulario = document.getElementById("form-consumo");
    const campoConsumo = document.getElementById("consumo");
    const mensagemFormulario = document.getElementById("mensagem-formulario");
    const mensagemSensor = document.getElementById("mensagem-sensor");
    const botaoResidencial = document.getElementById("perfil-residencial");
    const botaoAgricola = document.getElementById("perfil-agricola");
    const botaoSensor = document.getElementById("simular-sensor");
    const filtroData = document.getElementById("filtro-data");
    const resultadoHistorico = document.getElementById("resultado-historico");

    function atualizarHistorico() {
        listaRegistros.textContent = "";
        let quantidade = 0;
        let totalAnterior = 0;
        let quantidadeAnterior = 0;
        let quantidadeAlertas = 0;
        let dataEscolhida = "";
        if (filtroData.value !== "") {
            const partes = filtroData.value.split("-");
            dataEscolhida = partes[2] + "/" + partes[1] + "/" + partes[0];
        }
        for (let i = 0; i < registros.length; i++) {
            const registro = registros[i];
            if (registro.perfil !== perfilAtual) {
                continue;
            }
            const temAlerta = quantidadeAnterior > 0 && registro.consumo > (totalAnterior / quantidadeAnterior) * 1.2;
            totalAnterior += registro.consumo;
            quantidadeAnterior++;
            if (dataEscolhida === "" || registro.data === dataEscolhida) {
                const linha = document.createElement("tr");
                const valores = [registro.perfil, registro.consumo.toLocaleString("pt-BR") + " L", registro.origem, registro.data];
                for (let j = 0; j < valores.length; j++) {
                    const celula = document.createElement("td");
                    celula.textContent = valores[j];
                    if (j === 1 && temAlerta) {
                        const aviso = document.createElement("span");
                        aviso.className = "aviso-historico";
                        aviso.textContent = "Alerta: aumento > 20%";
                        aviso.title = "Mais de 20% acima da média das medições anteriores deste perfil.";
                        celula.appendChild(aviso);
                    }
                    linha.appendChild(celula);
                }
                if (temAlerta) {
                    linha.classList.add("registro-alerta");
                    quantidadeAlertas++;
                }
                listaRegistros.appendChild(linha);
                quantidade++;
            }
        }
        resultadoHistorico.textContent = quantidade + (quantidade === 1 ? " medição encontrada." : " medições encontradas.");
        if (quantidadeAlertas > 0) {
            resultadoHistorico.textContent += " " + quantidadeAlertas + (quantidadeAlertas === 1 ? " medição com alerta." : " medições com alerta.");
        }
        if (quantidade === 0) {
            resultadoHistorico.textContent = "Nenhum registro encontrado. Escolha outra data ou limpe o filtro.";
            const linha = document.createElement("tr");
            const celula = document.createElement("td");
            celula.colSpan = 4;
            celula.textContent = "Nenhum registro encontrado.";
            linha.appendChild(celula);
            listaRegistros.appendChild(linha);
        }
    }

    function atualizarPainel() {
        const registrosFiltrados = registros.filter(function(registro) {
            return registro.perfil === perfilAtual;
        });
        let total = 0;
        for (let i = 0; i < registrosFiltrados.length; i++) {
            total += registrosFiltrados[i].consumo;
        }
        const quantidade = registrosFiltrados.length;
        let temAlerta = false;
        situacaoConsumo.textContent = quantidade > 0
            ? registrosFiltrados[quantidade - 1].consumo.toLocaleString("pt-BR") + " L"
            : "Sem registros";
        tituloRecomendacao.textContent = "Comparação com a média";
        consumoTotal.textContent = total.toLocaleString("pt-BR") + " L";
        totalRegistros.textContent = quantidade;
        perfilSelecionado.textContent = "Perfil atual: " + perfilAtual + ".";
        document.getElementById("destino-registro").textContent = "Registrar no perfil " + perfilAtual + ".";
        document.getElementById("titulo-painel").textContent = "Resumo do perfil " + perfilAtual;
        document.getElementById("titulo-historico").textContent = "Histórico do perfil " + perfilAtual;
        document.querySelector("caption").textContent = "Medições demonstrativas do perfil " + perfilAtual;
        if (quantidade === 0) {
            textoRecomendacao.textContent = "Cadastre um consumo para receber recomendações.";
        } else if (quantidade === 1) {
            textoRecomendacao.textContent = "Registre outra medição de mesmo período e contexto para comparar.";
        } else {
            const ultimoRegistro = registrosFiltrados[quantidade - 1];

            const mediaAnterior = (total - ultimoRegistro.consumo) / (quantidade - 1);
            const referencia = " Média das medições anteriores: " + mediaAnterior.toLocaleString("pt-BR", {maximumFractionDigits: 1}) + " L.";
            if (ultimoRegistro.consumo > mediaAnterior * 1.2) {
                temAlerta = true;
                textoRecomendacao.textContent = "Atenção: o último valor ficou mais de 20% acima da média anterior. Confira se o uso mudou ou se há desperdício." + referencia;
            } else {
                textoRecomendacao.textContent = "A última medição não passou do limite de aumento de 20%." + referencia;
            }
        }
        situacaoConsumo.closest(".indicador").classList.toggle("alerta", temAlerta);
        tituloRecomendacao.closest(".recomendacao-card").classList.toggle("alerta", temAlerta);
    }

    function selecionarPerfil(perfil) {
        perfilAtual = perfil;
        botaoResidencial.classList.toggle("selecionado", perfil === "Residencial");
        botaoAgricola.classList.toggle("selecionado", perfil === "Agrícola");
        botaoResidencial.setAttribute("aria-pressed", perfil === "Residencial");
        botaoAgricola.setAttribute("aria-pressed", perfil === "Agrícola");
        mensagemFormulario.textContent = "";
        mensagemSensor.textContent = "";
        mensagemFormulario.className = "";
        mensagemSensor.className = "";
        campoConsumo.removeAttribute("aria-invalid");
        campoConsumo.value = "";
        filtroData.value = "";
        atualizarHistorico();
        atualizarPainel();
    }

    botaoResidencial.addEventListener("click", function() { selecionarPerfil("Residencial"); });
    botaoAgricola.addEventListener("click", function() { selecionarPerfil("Agrícola"); });
    filtroData.addEventListener("change", atualizarHistorico);
    document.getElementById("limpar-filtro").addEventListener("click", function() {
        filtroData.value = "";
        atualizarHistorico();
    });

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();
        const valor = Number(campoConsumo.value);
        mensagemFormulario.className = "";
        if (campoConsumo.value.trim() === "" || !Number.isFinite(valor) || !campoConsumo.validity.valid) {
            mensagemFormulario.textContent = "Informe de 0,1 a 1.000.000 litros, com até uma casa decimal.";
            mensagemFormulario.classList.add("erro");
            campoConsumo.setAttribute("aria-invalid", "true");
            campoConsumo.focus();
            return;
        }
        registros.push({
            perfil: perfilAtual,
            consumo: valor,
            origem: "Manual",
            data: new Date().toLocaleDateString("pt-BR")
        });
        mensagemSensor.textContent = "";
        mensagemSensor.className = "";
        mensagemFormulario.textContent = "Consumo adicionado ao perfil " + perfilAtual + ". O resumo foi atualizado.";
        mensagemFormulario.classList.add("sucesso");
        campoConsumo.removeAttribute("aria-invalid");
        campoConsumo.value = "";
        filtroData.value = "";
        atualizarHistorico();
        atualizarPainel();
        if (situacaoConsumo.closest(".indicador").classList.contains("alerta")) {
            mensagemFormulario.classList.add("atencao");
            mensagemFormulario.textContent = "Consumo adicionado. Atenção: o valor ficou mais de 20% acima da média anterior. O resumo foi atualizado.";
        }
    });

    botaoSensor.addEventListener("click", function() {
        mensagemFormulario.textContent = "";
        mensagemFormulario.className = "";
        const { consumoBase, incrementoPorLeitura, faixaVariacao } = configuracoesSensor[perfilAtual];
        const variacaoConsumo = (contadorSensor * incrementoPorLeitura) % faixaVariacao;
        const consumoSimulado = consumoBase + variacaoConsumo;
        registros.push({
            perfil: perfilAtual,
            consumo: consumoSimulado,
            origem: "Sensor simulado",
            data: new Date().toLocaleDateString("pt-BR")
        });
        contadorSensor++;
        mensagemSensor.textContent = "Leitura fictícia adicionada ao perfil " + perfilAtual + ": " + consumoSimulado + " litros. O resumo foi atualizado.";
        filtroData.value = "";
        atualizarHistorico();
        atualizarPainel();
        const temAlerta = situacaoConsumo.closest(".indicador").classList.contains("alerta");
        mensagemSensor.classList.toggle("atencao", temAlerta);
        if (temAlerta) {
            mensagemSensor.textContent += " Atenção: o valor ficou mais de 20% acima da média anterior.";
        }
    });

    selecionarPerfil("Residencial");
}

iniciarMonitoramento();
