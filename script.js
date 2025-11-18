
<script>
        // Variáveis globais para armazenar os dados e o limite de aprovação
        let listaAlunos = [];
        const LIMITE_APROVACAO = 6.0;
        const STORAGE_KEY = 'cadastroAlunos';

        // Elementos do DOM
        const form = document.getElementById('formCadastro');
        const tabelaBody = document.querySelector('#tabelaAlunos tbody');
        const mensagemErro = document.getElementById('mensagemErro');
        const statusVazio = document.getElementById('statusVazio');

        /**
         * Carrega os dados dos alunos armazenados no localStorage.
         */
        function carregarAlunos() {
            const dadosSalvos = localStorage.getItem(STORAGE_KEY);
            if (dadosSalvos) {
                try {
                    listaAlunos = JSON.parse(dadosSalvos);
                } catch (e) {
                    console.error("Erro ao carregar dados do localStorage:", e);
                    listaAlunos = [];
                }
            }
            renderizarTabela();
        }

        /**
         * Salva a lista de alunos atual no localStorage.
         */
        function salvarAlunos() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(listaAlunos));
        }

        /**
         * Calcula a média e determina o status (Aprovado/Reprovado).
         * @param {number} nota1 - Primeira nota.
         * @param {number} nota2 - Segunda nota.
         * @returns {object} - Objeto contendo a média formatada e o status.
         */
        function calcularResultado(nota1, nota2) {
            const media = (nota1 + nota2) / 2;
            const status = media >= LIMITE_APROVACAO ? 'Aprovado' : 'Reprovado';
            return {
                media: media.toFixed(2), // Formata para 2 casas decimais
                status: status
            };
        }

        /**
         * Renderiza a tabela de alunos com os dados atuais.
         */
        function renderizarTabela() {
            tabelaBody.innerHTML = ''; // Limpa as linhas existentes

            if (listaAlunos.length === 0) {
                statusVazio.classList.remove('hidden');
                return;
            } else {
                statusVazio.classList.add('hidden');
            }

            listaAlunos.forEach(aluno => {
                const resultado = calcularResultado(aluno.nota1, aluno.nota2);
                const classeStatus = resultado.status === 'Aprovado' ? 'status-aprovado' : 'status-reprovado';

                const newRow = tabelaBody.insertRow();
                newRow.className = 'whitespace-nowrap'; // Garante que a linha não quebre em telas pequenas

                // Célula Nome
                let cell = newRow.insertCell();
                cell.textContent = aluno.nome;
                cell.className = 'px-6 py-3 text-sm font-medium text-gray-900';

                // Célula Nota 1
                cell = newRow.insertCell();
                cell.textContent = aluno.nota1.toFixed(2);
                cell.className = 'px-6 py-3 text-sm text-gray-500';

                // Célula Nota 2
                cell = newRow.insertCell();
                cell.textContent = aluno.nota2.toFixed(2);
                cell.className = 'px-6 py-3 text-sm text-gray-500';

                // Célula Média
                cell = newRow.insertCell();
                cell.textContent = resultado.media;
                cell.className = 'px-6 py-3 text-sm font-medium';

                // Célula Resultado (com destaque visual)
                cell = newRow.insertCell();
                cell.textContent = resultado.status;
                // Aplica a classe CSS para o destaque visual (Critério de Estilização)
                cell.className = `px-6 py-3 text-sm font-semibold ${classeStatus} rounded-full text-center`;
            });
        }

        /**
         * Trata o envio do formulário, valida, calcula e adiciona o aluno.
         * @param {Event} event - O evento de submissão do formulário.
         */
        function handleSubmit(event) {
            event.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const nota1Str = document.getElementById('nota1').value;
            const nota2Str = document.getElementById('nota2').value;

            // Converte e valida os números (Boas Práticas: Validação de Input)
            const nota1 = parseFloat(nota1Str);
            const nota2 = parseFloat(nota2Str);

            // Validação
            if (!nome || isNaN(nota1) || isNaN(nota2) || nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10) {
                mensagemErro.classList.remove('hidden');
                return;
            } else {
                mensagemErro.classList.add('hidden');
            }

            // Cria o objeto do novo aluno
            const novoAluno = {
                nome: nome,
                nota1: nota1,
                nota2: nota2
            };

            // Adiciona à lista
            listaAlunos.push(novoAluno);

            // Salva e atualiza a tabela
            salvarAlunos();
            renderizarTabela();

            // Limpa os campos após o cadastro (Critério de Funcionalidade)
            form.reset(); 
            document.getElementById('nome').focus(); // Foco no primeiro campo
        }

        // 1. Inicializa o carregamento dos dados e a renderização ao carregar a página
        window.onload = carregarAlunos;

        // 2. Adiciona o listener para o evento de submissão do formulário
        form.addEventListener('submit', handleSubmit);

    </script>
</body>
</html>