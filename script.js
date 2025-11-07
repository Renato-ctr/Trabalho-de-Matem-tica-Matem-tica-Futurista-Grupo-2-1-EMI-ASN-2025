// ========== ANIMAÇÃO DE FUNDO - CONSTELAÇÕES TECNOLÓGICAS ==========
function createConstellationAnimation() {
  const canvas = document.getElementById("backgroundAnimationCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];
  // Cores baseadas no seu tema
  const particleColor = "rgba(77, 158, 255, 0.5)"; // --accent-light
  const lineColor = "rgba(77, 158, 255, 0.1)";
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

/*
// ========== ANIMAÇÃO DE FUNDO ANTIGA (REMOVIDA) ==========
function createBackgroundAnimation() {
    // ... código antigo do DNA ...
}
*/

// ========== CÁLCULO DE ÁREAS ==========
// Cálculo da área do triângulo com validação melhorada
document
  .getElementById("calcular-triangulo")
  .addEventListener("click", function () {
    const base = parseFloat(document.getElementById("base-triangulo").value);
    const altura = parseFloat(
      document.getElementById("altura-triangulo").value
    );
    const resultado = document.getElementById("resultado-triangulo");
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
      const area = (base * altura) / 2;
      resultado.innerHTML = `
            <p>📐 Área do triângulo:</p>
            <p><strong>A = (b × h) / 2</strong></p>
            <p><strong>A = (${base} × ${altura}) / 2 = ${area.toFixed(
        2
      )}</strong> unidades quadradas</p>
        `;
      resultado.style.display = "block";

      button.textContent = "Calcular Área";
      button.disabled = false;
    }, 500);
  });

// Cálculo da área do trapézio com validação melhorada
document
  .getElementById("calcular-trapezio")
  .addEventListener("click", function () {
    const baseMaior = parseFloat(document.getElementById("base-maior").value);
    const baseMenor = parseFloat(document.getElementById("base-menor").value);
    const altura = parseFloat(document.getElementById("altura-trapezio").value);
    const resultado = document.getElementById("resultado-trapezio");
    const button = this;

    // Validação
    if (
      isNaN(baseMaior) ||
      isNaN(baseMenor) ||
      isNaN(altura) ||
      baseMaior <= 0 ||
      baseMenor <= 0 ||
      altura <= 0
    ) {
      resultado.innerHTML =
        '<p style="color: #ff6b6b;">⚠️ Por favor, insira valores válidos para as bases e altura (números positivos).</p>';
      resultado.style.display = "block";
      return;
    }

    if (baseMenor >= baseMaior) {
      resultado.innerHTML =
        '<p style="color: #ff6b6b;">⚠️ A base maior deve ser maior que a base menor.</p>';
      resultado.style.display = "block";
      return;
    }

    // Feedback visual
    button.textContent = "Calculando...";
    button.disabled = true;

    setTimeout(() => {
      const area = ((baseMaior + baseMenor) * altura) / 2;
      resultado.innerHTML = `
            <p>📊 Área do trapézio:</p>
            <p><strong>A = [(B + b) × h] / 2</strong></p>
            <p><strong>A = [(${baseMaior} + ${baseMenor}) × ${altura}] / 2 = ${area.toFixed(
        2
      )}</strong> unidades quadradas</p>
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
    document.getElementById("base-triangulo").value = "";
    document.getElementById("altura-triangulo").value = "";
    document.getElementById("resultado-triangulo").style.display = "none";
  });

document
  .getElementById("limpar-trapezio")
  .addEventListener("click", function () {
    document.getElementById("base-maior").value = "";
    document.getElementById("base-menor").value = "";
    document.getElementById("altura-trapezio").value = "";
    document.getElementById("resultado-trapezio").style.display = "none";
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

// ========== QUIZ ==========
const quizQuestions = [
  {
    question: "Qual é a fórmula para calcular a área de um triângulo?",
    options: [
      "A = b × h",
      "A = (b × h) / 2",
      "A = π × r²",
      "A = (B + b) × h / 2"
    ],
    correct: 1
  },
  {
    question: "Qual é a fórmula para calcular a área de um trapézio?",
    options: [
      "A = b × h",
      "A = (b × h) / 2",
      "A = π × r²",
      "A = (B + b) × h / 2"
    ],
    correct: 3
  },
  {
    question: "Em um triângulo, a altura é:",
    options: [
      "Sempre igual à base",
      "A medida perpendicular à base",
      "Sempre o lado mais longo",
      "A soma de todos os lados"
    ],
    correct: 1
  },
  {
    question: "Um triângulo com base 10 cm e altura 6 cm tem área igual a:",
    options: ["16 cm²", "30 cm²", "60 cm²", "32 cm²"],
    correct: 1
  },
  {
    question:
      "Um trapézio com bases 8 cm e 4 cm e altura 5 cm tem área igual a:",
    options: ["20 cm²", "30 cm²", "40 cm²", "60 cm²"],
    correct: 1
  },
  {
    question: "Qual destas figuras sempre tem um par de lados paralelos?",
    options: ["Triângulo", "Trapézio", "Círculo", "Pentágono"],
    correct: 1
  },
  {
    question: "A unidade de medida de área é:",
    options: [
      "Sempre em metros",
      "Uma unidade de comprimento",
      "Uma unidade de comprimento ao quadrado",
      "Sempre em centímetros"
    ],
    correct: 2
  },
  {
    question: "Um triângulo equilátero tem:",
    options: [
      "Três lados diferentes",
      "Dois lados iguais",
      "Três lados iguais",
      "Um ângulo reto"
    ],
    correct: 2
  },
  {
    question: "A altura de um triângulo:",
    options: [
      "É sempre um de seus lados",
      "Pode estar fora do triângulo",
      "É sempre menor que a base",
      "É a soma de dois lados"
    ],
    correct: 1
  },
  {
    question: "Em um trapézio, as bases são:",
    options: [
      "Os lados não paralelos",
      "Os lados paralelos",
      "Sempre os lados mais longos",
      "Sempre iguais"
    ],
    correct: 1
  },
  {
    question: "A área de um triângulo retângulo com catetos 3 cm e 4 cm é:",
    options: ["7 cm²", "12 cm²", "6 cm²", "5 cm²"],
    correct: 2
  },
  {
    question:
      "Se a base de um triângulo dobra e a altura permanece a mesma, a área:",
    options: ["Permanece a mesma", "Dobra", "Triplica", "Quadruplica"],
    correct: 1
  },
  {
    question: "Um trapézio isósceles tem:",
    options: [
      "Bases iguais",
      "Lados não paralelos iguais",
      "Todos os lados iguais",
      "Ângulos da base diferentes"
    ],
    correct: 1
  },
  {
    question: "A fórmula de Heron é usada para calcular a área de:",
    options: [
      "Qualquer polígono",
      "Triângulos quando se conhecem os três lados",
      "Trapézios",
      "Círculos"
    ],
    correct: 1
  },
  {
    question:
      "Se a altura de um triângulo é reduzida pela metade e a base permanece a mesma, a área:",
    options: [
      "Dobra",
      "Permanece a mesma",
      "É reduzida pela metade",
      "É quadruplicada"
    ],
    correct: 2
  },
  {
    question: "Em um trapézio, a altura é:",
    options: [
      "A medida de um dos lados não paralelos",
      "A distância perpendicular entre as bases",
      "Sempre igual à base menor",
      "A soma das bases"
    ],
    correct: 1
  },
  {
    question: "Um triângulo com área 24 cm² e base 8 cm tem altura igual a:",
    options: ["3 cm", "6 cm", "12 cm", "4 cm"],
    correct: 1
  },
  {
    question: "A área de um trapézio com bases 12 cm e 8 cm e altura 5 cm é:",
    options: ["40 cm²", "50 cm²", "60 cm²", "100 cm²"],
    correct: 1
  },
  {
    question: "Qual destes NÃO é um tipo de trapézio?",
    options: [
      "Trapézio isósceles",
      "Trapézio escaleno",
      "Trapézio retângulo",
      "Trapézio equilátero"
    ],
    correct: 3
  },
  {
    question: "Um triângulo com lados 5 cm, 12 cm e 13 cm é:",
    options: ["Acutângulo", "Obtusângulo", "Equilátero", "Retângulo"],
    correct: 3
  },
  {
    question:
      "Se as bases de um trapézio são 10 cm e 6 cm, e a área é 40 cm², a altura é:",
    options: ["4 cm", "5 cm", "6 cm", "8 cm"],
    correct: 1
  },
  {
    question:
      "A área de um triângulo pode ser calculada usando dois lados e o ângulo entre eles através da fórmula:",
    options: [
      "A = a × b × cos(θ)",
      "A = (1/2) × a × b × sen(θ)",
      "A = a × b × tan(θ)",
      "A = (a + b) × sen(θ) / 2"
    ],
    correct: 1
  },
  {
    question: "Um trapézio com bases iguais é na verdade um:",
    options: [
      "Triângulo",
      "Retângulo", // Assumindo trapézio retângulo, ou paralelogramo em geral
      "Quadrado",
      "Losango"
    ],
    correct: 1 // Mantendo a lógica do quiz original (Retângulo/Paralelogramo)
  },
  {
    question: "Se a área de um triângulo é 18 cm² e a altura é 6 cm, a base é:",
    options: ["3 cm", "6 cm", "9 cm", "12 cm"],
    correct: 1
  },
  {
    question: "A área de um trapézio é sempre:",
    options: [
      "Maior que a área de um triângulo com a mesma altura",
      "A média das áreas das bases",
      "A soma das áreas de dois triângulos", // Se dividido pela diagonal
      "O produto da altura pela base menor"
    ],
    correct: 2
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
      "🎉 Excelente! Você domina completamente o conteúdo sobre áreas!";
    performanceMessage.style.color = "#00d4aa";
  } else if (percentage >= 70) {
    performanceMessage.textContent =
      "👍 Muito bom! Você tem um ótimo conhecimento sobre áreas.";
    performanceMessage.style.color = "#4d9eff";
  } else if (percentage >= 50) {
    performanceMessage.textContent =
      "💡 Bom! Continue estudando para melhorar seu desempenho.";
    performanceMessage.style.color = "#ffb74d";
  } else {
    performanceMessage.textContent =
      "📚 Estude um pouco mais os conceitos de área e tente novamente!";
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
  // createBackgroundAnimation(); // <-- Função antiga removida
  createConstellationAnimation(); // <-- Nova função

  // Renderizar questões do quiz
  renderQuizQuestions();
});
