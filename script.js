// ========== ANIMAÇÃO DE FUNDO - CONSTELAÇÕES TECNOLÓGICAS ==========
function createConstellationAnimation() {
  const canvas = document.getElementById("backgroundAnimationCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];
  // Cores atualizadas para o tema rosa
  const particleColor = "rgba(255, 128, 171, 0.5)"; // --accent-light
  const lineColor = "rgba(255, 128, 171, 0.1)";
  const maxDistance = 120; // Distância para conectar
  let particleCount;

  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Ajustar contagem de partículas com base no tamanho da tela
    particleCount = Math.floor((canvas.width * canvas.height) / 15000);
    if (particleCount > 150) particleCount = 150; // Limite para não sobrecarregar
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * 2 + 1;
      this.vx = (Math.random() - 0.5) * 0.5; // Movimento lento
      this.vy = (Math.random() - 0.5) * 0.5;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = particleColor;
      ctx.fill();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Rebater nas bordas
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
  }

  function init() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function connect() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        // Começa de a+1 para evitar duplicatas
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          ctx.beginPath();
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    connect();
    requestAnimationFrame(animate);
  }

  // Lidar com redimensionamento da janela
  window.addEventListener("resize", () => {
    setCanvasSize();
    init();
  });

  // Iniciar
  setCanvasSize();
  init();
  animate();
}

// ========== CÁLCULO DE ÁREAS ==========
// Cálculo da área do triângulo retângulo
document
  .getElementById("calcular-triangulo")
  .addEventListener("click", function () {
    const cateto1 = parseFloat(document.getElementById("cateto1").value);
    const cateto2 = parseFloat(document.getElementById("cateto2").value);
    const resultado = document.getElementById("resultado-triangulo");
    const button = this;

    // Validação
    if (isNaN(cateto1) || isNaN(cateto2) || cateto1 <= 0 || cateto2 <= 0) {
      resultado.innerHTML =
        '<p style="color: #ff6b6b;">⚠️ Por favor, insira valores válidos para os catetos (números positivos).</p>';
      resultado.style.display = "block";
      return;
    }

    // Feedback visual
    button.textContent = "Calculando...";
    button.disabled = true;

    setTimeout(() => {
      const area = (cateto1 * cateto2) / 2;
      const hipotenusa = Math.sqrt(cateto1 * cateto1 + cateto2 * cateto2);
      
      resultado.innerHTML = `
            <p>📐 Área do triângulo retângulo:</p>
            <p><strong>A = (cateto₁ × cateto₂) / 2</strong></p>
            <p><strong>A = (${cateto1} × ${cateto2}) / 2 = ${area.toFixed(2)}</strong> unidades quadradas</p>
            <p style="margin-top: 10px; font-size: 0.9rem; color: #ff80ab;">
                💡 Dica: A hipotenusa deste triângulo é ${hipotenusa.toFixed(2)} unidades
            </p>
        `;
      resultado.style.display = "block";

      button.textContent = "Calcular Área";
      button.disabled = false;
    }, 500);
  });

// Cálculo da área do paralelogramo
document
  .getElementById("calcular-paralelogramo")
  .addEventListener("click", function () {
    const base = parseFloat(document.getElementById("base-paralelogramo").value);
    const altura = parseFloat(document.getElementById("altura-paralelogramo").value);
    const resultado = document.getElementById("resultado-paralelogramo");
    const button = this;

    // Validação
    if (isNaN(base) || isNaN(altura) || base <= 0 || altura <= 0) {
      resultado.innerHTML =
        '<p style="color: #ff6b6b;">⚠️ Por favor, insira valores válidos para base e altura (números positivos).</p>';
      resultado.style.display = "block";
      return;
    }

    // Feedback visual
    button.textContent = "Calculando...";
    button.disabled = true;

    setTimeout(() => {
      const area = base * altura;
      
      resultado.innerHTML = `
            <p>📊 Área do paralelogramo:</p>
            <p><strong>A = b × h</strong></p>
            <p><strong>A = ${base} × ${altura} = ${area.toFixed(2)}</strong> unidades quadradas</p>
            <p style="margin-top: 10px; font-size: 0.9rem; color: #ff80ab;">
                💡 Lembrete: Esta área é o dobro da área de um triângulo com mesma base e altura
            </p>
        `;
      resultado.style.display = "block";

      button.textContent = "Calcular Área";
      button.disabled = false;
    }, 500);
  });

// Limpar campos
document
  .getElementById("limpar-triangulo")
  .addEventListener("click", function () {
    document.getElementById("cateto1").value = "";
    document.getElementById("cateto2").value = "";
    document.getElementById("resultado-triangulo").style.display = "none";
  });

document
  .getElementById("limpar-paralelogramo")
  .addEventListener("click", function () {
    document.getElementById("base-paralelogramo").value = "";
    document.getElementById("altura-paralelogramo").value = "";
    document.getElementById("resultado-paralelogramo").style.display = "none";
  });

// Permitir calcular com Enter
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const form = this.closest(".interactive-tool");
      const button = form.querySelector("button");
      button.click();
    }
  });
});

// ========== QUIZ ATUALIZADO ==========
const quizQuestions = [
  {
    question: "Qual é a fórmula para calcular a área de um triângulo retângulo?",
    options: [
      "A = b × h",
      "A = (cateto₁ × cateto₂) / 2",
      "A = π × r²",
      "A = (base × altura) / 3"
    ],
    correct: 1
  },
  {
    question: "Qual é a fórmula para calcular a área de um paralelogramo?",
    options: [
      "A = b × h",
      "A = (b × h) / 2",
      "A = (B + b) × h / 2",
      "A = lado × lado"
    ],
    correct: 0
  },
  {
    question: "Em um triângulo retângulo, os catetos são:",
    options: [
      "Os lados que formam o ângulo reto",
      "Sempre os lados mais longos",
      "O lado oposto ao ângulo reto",
      "Sempre iguais"
    ],
    correct: 0
  },
  {
    question: "Um triângulo retângulo com catetos 5 cm e 12 cm tem área igual a:",
    options: ["17 cm²", "30 cm²", "60 cm²", "34 cm²"],
    correct: 1
  },
  {
    question: "Um paralelogramo com base 8 cm e altura 5 cm tem área igual a:",
    options: ["13 cm²", "20 cm²", "40 cm²", "26 cm²"],
    correct: 2
  },
  {
    question: "Qual destas figuras sempre tem lados opostos paralelos?",
    options: ["Triângulo", "Paralelogramo", "Círculo", "Trapézio"],
    correct: 1
  },
  {
    question: "A hipotenusa de um triângulo retângulo:",
    options: [
      "É sempre o menor lado",
      "É o lado oposto ao ângulo reto",
      "É igual à soma dos catetos",
      "É sempre perpendicular aos catetos"
    ],
    correct: 1
  },
  {
    question: "A altura de um paralelogramo é:",
    options: [
      "Sempre igual à base",
      "A distância perpendicular entre as bases paralelas",
      "Sempre um de seus lados",
      "A soma de todos os lados"
    ],
    correct: 1
  },
  {
    question: "Um triângulo retângulo isósceles tem:",
    options: [
      "Três lados diferentes",
      "Dois catetos iguais",
      "Hipotenusa igual a um cateto",
      "Todos os lados iguais"
    ],
    correct: 1
  },
  {
    question: "Se a base de um paralelogramo dobra e a altura permanece a mesma, a área:",
    options: ["Permanece a mesma", "Dobra", "Triplica", "Quadruplica"],
    correct: 1
  },
  {
    question: "O Teorema de Pitágoras aplica-se a:",
    options: [
      "Todos os triângulos",
      "Apenas triângulos retângulos",
      "Apenas triângulos equiláteros",
      "Todos os quadriláteros"
    ],
    correct: 1
  },
  {
    question: "Um paralelogramo com todos os ângulos retos é um:",
    options: ["Losango", "Retângulo", "Trapézio", "Triângulo"],
    correct: 1
  },
  {
    question: "A área de um triângulo retângulo com catetos 6 cm e 8 cm é:",
    options: ["14 cm²", "24 cm²", "48 cm²", "28 cm²"],
    correct: 1
  },
  {
    question: "Se a altura de um paralelogramo é reduzida pela metade e a base permanece a mesma, a área:",
    options: [
      "Dobra",
      "Permanece a mesma",
      "É reduzida pela metade",
      "É quadruplicada"
    ],
    correct: 2
  },
  {
    question: "Em um triângulo retângulo, a soma dos quadrados dos catetos é igual:",
    options: [
      "À área do triângulo",
      "Ao quadrado da hipotenusa",
      "Ao perímetro do triângulo",
      "À soma dos catetos"
    ],
    correct: 1
  },
  {
    question: "Um quadrado é um tipo especial de:",
    options: [
      "Triângulo",
      "Paralelogramo",
      "Círculo",
      "Trapézio"
    ],
    correct: 1
  },
  {
    question: "A área de um paralelogramo é sempre:",
    options: [
      "Metade da área de um triângulo com mesma base e altura",
      "O dobro da área de um triângulo com mesma base e altura",
      "Igual ao seu perímetro",
      "A soma de suas diagonais"
    ],
    correct: 1
  },
  {
    question: "Um triângulo retângulo com catetos 9 cm e 12 cm tem hipotenusa igual a:",
    options: ["15 cm", "21 cm", "18 cm", "25 cm"],
    correct: 0
  },
  {
    question: "Se a área de um paralelogramo é 45 cm² e a base é 9 cm, a altura é:",
    options: ["4 cm", "5 cm", "6 cm", "7 cm"],
    correct: 1
  },
  {
    question: "Qual destes NÃO é um paralelogramo?",
    options: [
      "Quadrado",
      "Retângulo",
      "Losango",
      "Trapézio escaleno"
    ],
    correct: 3
  },
  {
    question: "A área de um triângulo retângulo é 18 cm² e um cateto mede 6 cm. O outro cateto mede:",
    options: ["3 cm", "6 cm", "9 cm", "12 cm"],
    correct: 1
  },
  {
    question: "Em um paralelogramo, as diagonais:",
    options: [
      "São sempre iguais",
      "Cruzam-se no ponto médio",
      "São sempre perpendiculares",
      "São sempre maiores que os lados"
    ],
    correct: 1
  },
  {
    question: "Um triângulo retângulo pode ser:",
    options: [
      "Equilátero",
      "Isósceles ou escaleno",
      "Apenas escaleno",
      "Apenas isósceles"
    ],
    correct: 1
  },
  {
    question: "Se a base e a altura de um paralelogramo são iguais, a figura pode ser um:",
    options: [
      "Quadrado ou losango",
      "Apenas quadrado",
      "Apenas retângulo",
      "Apenas losango"
    ],
    correct: 0
  },
  {
    question: "A relação entre as áreas de um paralelogramo e um triângulo com mesma base e altura é:",
    options: [
      "São iguais",
      "O paralelogramo tem o dobro da área",
      "O triângulo tem o dobro da área",
      "Não há relação"
    ],
    correct: 1
  }
];

// Renderizar questões do quiz
function renderQuizQuestions() {
  const quizContainer = document.getElementById("quiz-questions");
  quizContainer.innerHTML = ""; // Limpar conteúdo anterior

  quizQuestions.forEach((q, index) => {
    const questionElement = document.createElement("div");
    questionElement.className = "question";
    questionElement.innerHTML = `
            <h4>${index + 1}. ${q.question}</h4>
            <div class="options">
                ${q.options
                  .map(
                    (option, i) => `
                    <div class="option" data-question="${index}" data-option="${i}">
                        <span class="option-letter">${String.fromCharCode(
                          65 + i
                        )}</span>
                        ${option}
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;
    quizContainer.appendChild(questionElement);
  });

  // Adicionar event listeners após renderizar
  document.querySelectorAll(".option").forEach((option) => {
    option.addEventListener("click", function () {
      const questionIndex = this.getAttribute("data-question");
      const optionIndex = this.getAttribute("data-option");

      // Remover seleção anterior nesta questão
      document
        .querySelectorAll(`.option[data-question="${questionIndex}"]`)
        .forEach((opt) => {
          opt.classList.remove("selected");
        });

      // Selecionar esta opção
      this.classList.add("selected");
    });
  });
}

// Verificar respostas do quiz
document
  .getElementById("verificar-respostas")
  .addEventListener("click", function () {
    let score = 0;
    const totalQuestions = quizQuestions.length;

    quizQuestions.forEach((q, index) => {
      const selectedOption = document.querySelector(
        `.option[data-question="${index}"].selected`
      );
      const correctOption = document.querySelector(
        `.option[data-question="${index}"][data-option="${q.correct}"]`
      );

      if (selectedOption) {
        if (
          parseInt(selectedOption.getAttribute("data-option")) === q.correct
        ) {
          score++;
          selectedOption.classList.add("correct");
        } else {
          selectedOption.classList.add("incorrect");
          correctOption.classList.add("correct-answer");
        }
      } else {
        // Se não respondeu, mostrar a correta
        correctOption.classList.add("correct-answer");
      }
    });

    // Mostrar resultados
    showQuizResults(score, totalQuestions);
  });

// Mostrar resultados do quiz
function showQuizResults(score, total) {
  const results = document.getElementById("quiz-results");
  const scoreText = document.getElementById("score-text");
  const performanceMessage = document.getElementById("performance-message");

  const percentage = (score / total) * 100;

  scoreText.textContent = `Você acertou ${score} de ${total} questões! (${percentage.toFixed(
    1
  )}%)`;

  if (percentage >= 90) {
    performanceMessage.textContent =
      "🎉 Excelente! Você domina completamente o conteúdo sobre triângulos retângulos e paralelogramos!";
    performanceMessage.style.color = "#00d4aa";
  } else if (percentage >= 70) {
    performanceMessage.textContent =
      "👍 Muito bom! Você tem um ótimo conhecimento sobre áreas.";
    performanceMessage.style.color = "#ff80ab";
  } else if (percentage >= 50) {
    performanceMessage.textContent =
      "💡 Bom! Continue estudando para melhorar seu desempenho.";
    performanceMessage.style.color = "#ffb74d";
  } else {
    performanceMessage.textContent =
      "📚 Estude um pouco mais os conceitos de área do triângulo retângulo e paralelogramo!";
    performanceMessage.style.color = "#ff6b6b";
  }

  results.style.display = "block";
  results.scrollIntoView({ behavior: "smooth" });
}

// Reiniciar quiz
document
  .getElementById("reiniciar-quiz")
  .addEventListener("click", function () {
    document.querySelectorAll(".option").forEach((option) => {
      option.classList.remove(
        "selected",
        "correct",
        "incorrect",
        "correct-answer"
      );
    });

    document.getElementById("quiz-results").style.display = "none";
    document
      .getElementById("quiz-questions")
      .scrollIntoView({ behavior: "smooth" });
  });

// ========== NAVEGAÇÃO SUAVE ==========
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// ========== INICIALIZAÇÃO ==========
document.addEventListener("DOMContentLoaded", function () {
  // Criar animação de fundo
  createConstellationAnimation();

  // Renderizar questões do quiz
  renderQuizQuestions();
});
