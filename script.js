document.getElementById("formAluno").addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const nota1 = parseFloat(document.getElementById("nota1").value);
  const nota2 = parseFloat(document.getElementById("nota2").value);
  const nota3 = parseFloat(document.getElementById("nota3").value);

  const media = ((nota1 + nota2 + nota3) / 3).toFixed(2);
  const status = media >= 7 ? "Aprovado" : "Reprovado";

  const lista = document.getElementById("listaAlunos");
  const novaLinha = document.createElement("tr");

  novaLinha.innerHTML = `
    <td>${nome}</td>
    <td>${nota1}</td>
    <td>${nota2}</td>
    <td>${nota3}</td>
    <td>${media}</td>
    <td class="${status.toLowerCase()}">${status}</td>
  `;

  lista.appendChild(novaLinha);

  // Limpar formulário
  document.getElementById("formAluno").reset();
});
