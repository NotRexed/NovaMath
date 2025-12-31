// Nova Math - Human-Centered JavaScript Functionality
// Natural, purposeful interactions that feel built by educators who care

// Global state management
let currentProblem = null;
let currentDifficulty = 'easy';
let currentTopic = 'mixed';
let quizTimer = null;
let quizStartTime = null;
let quizQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let isQuizActive = false;

// Mathematical problem generators (keeping the good stuff)
const problemGenerators = {
    algebra: {
        easy: [
            () => {
                const x = Math.floor(Math.random() * 10) + 1;
                const a = Math.floor(Math.random() * 5) + 2;
                const b = Math.floor(Math.random() * 20) + 1;
                const result = a * x + b;
                return {
                    question: `Solve for x: ${a}x + ${b} = ${result}`,
                    answer: x,
                    options: [x, x + 1, x - 1, x + 2],
                    solution: [
                        `Start with: ${a}x + ${b} = ${result}`,
                        `Subtract ${b} from both sides: ${a}x = ${result - b}`,
                        `Divide both sides by ${a}: x = ${x}`
                    ]
                };
            }
        ],
        medium: [
            () => {
                const x = Math.floor(Math.random() * 8) + 1;
                const a = Math.floor(Math.random() * 4) + 2;
                const b = Math.floor(Math.random() * 3) + 1;
                const c = Math.floor(Math.random() * 5) + 1;
                const result = a * x + b * x + c;
                return {
                    question: `Solve for x: ${a}x + ${b}x + ${c} = ${result}`,
                    answer: x,
                    options: [x, x + 1, x - 1, Math.floor(result / (a + b))],
                    solution: [
                        `Combine like terms: ${a + b}x + ${c} = ${result}`,
                        `Subtract ${c}: ${a + b}x = ${result - c}`,
                        `Divide by ${a + b}: x = ${x}`
                    ]
                };
            }
        ],
        hard: [
            () => {
                const x = Math.floor(Math.random() * 6) + 1;
                const a = Math.floor(Math.random() * 3) + 2;
                const b = Math.floor(Math.random() * 2) + 1;
                const c = Math.floor(Math.random() * 10) + 1;
                const result = a * x * x + b * x + c;
                return {
                    question: `Solve for x: ${a}x² + ${b}x + ${c} = ${result}`,
                    answer: x,
                    options: [x, x + 1, x - 1, 0],
                    solution: [
                        `This is a quadratic equation: ${a}x² + ${b}x + ${c} = ${result}`,
                        `Rearrange: ${a}x² + ${b}x + ${c - result} = 0`,
                        `Factor or use quadratic formula to find x = ${x}`
                    ]
                };
            }
        ]
    },
    
    geometry: {
        easy: [
            () => {
                const width = Math.floor(Math.random() * 8) + 3;
                const height = Math.floor(Math.random() * 8) + 3;
                const area = width * height;
                return {
                    question: `Find the area of a rectangle with width ${width} and height ${height}`,
                    answer: area,
                    options: [area, area + 1, area - 1, area + 2],
                    solution: [
                        `Area of rectangle = width × height`,
                        `Area = ${width} × ${height} = ${area}`
                    ]
                };
            }
        ]
    }
};

// Initialize application with natural timing
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initializeNaturalAnimations();
        setupScrollReveal();
        setupNavigation();
        
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        switch(currentPage) {
            case 'index.html':
            case '':
                initializeHomePage();
                break;
            case 'lessons.html':
                initializeLessonsPage();
                break;
            case 'practice.html':
                initializePracticePage();
                break;
            case 'about.html':
                initializeAboutPage();
                break;
        }
    }, 100); // Small delay feels more natural
});

// Natural animation initialization
function initializeNaturalAnimations() {
    // Simple fade-in for elements
    const fadeElements = document.querySelectorAll('.reveal-up');
    fadeElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Subtle hover effects
    document.querySelectorAll('.math-card, .topic-card, .practice-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Simple scroll reveal
function setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal-up').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Clean navigation
function setupNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Simple active state
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.style.color = '#c65d07';
            link.style.borderBottom = '2px solid #c65d07';
        }
    });
}

// Homepage initialization
function initializeHomePage() {
    if (document.getElementById('functionPlotter')) {
        setupFunctionPlotter();
    }
    initializeProgressCharts();
}

// Simple function plotter
function setupFunctionPlotter() {
    const plotterContainer = document.getElementById('functionPlotter');
    if (!plotterContainer) return;
    
    const sketch = (p) => {
        let currentFunction = 'sin';
        
        p.setup = () => {
            const canvas = p.createCanvas(plotterContainer.offsetWidth - 32, 320);
            canvas.parent('functionPlotter');
            p.background(247, 243, 233); // Cream background
        };
        
        p.draw = () => {
            p.background(247, 243, 233);
            p.translate(p.width / 2, p.height / 2);
            
            // Simple axes
            p.stroke(200);
            p.strokeWeight(1);
            p.line(-p.width / 2, 0, p.width / 2, 0);
            p.line(0, -p.height / 2, 0, p.height / 2);
            
            // Plot function with hand-drawn feel
            p.stroke(124, 132, 113); // Sage green
            p.strokeWeight(3);
            p.noFill();
            p.beginShape();
            
            for (let x = -p.width / 2; x < p.width / 2; x += 3) {
                let y = 0;
                const scaledX = x / 20;
                
                switch(currentFunction) {
                    case 'sin':
                        y = Math.sin(scaledX) * 50;
                        break;
                    case 'cos':
                        y = Math.cos(scaledX) * 50;
                        break;
                    case 'parabola':
                        y = scaledX * scaledX * 0.3 - 30;
                        break;
                    case 'exponential':
                        y = Math.exp(scaledX * 0.1) * 8 - 40;
                        break;
                }
                
                // Add slight imperfection
                y += Math.sin(x * 0.1) * 2;
                p.vertex(x, -y);
            }
            p.endShape();
        };
        
        window.setPlotterFunction = (func) => {
            currentFunction = func;
        };
    };
    
    new p5(sketch);
}

// Simple charts
function initializeProgressCharts() {
    if (document.getElementById('progressChart')) {
        const progressChart = echarts.init(document.getElementById('progressChart'));
        const progressOption = {
            title: { text: 'Weekly Progress', textStyle: { fontSize: 16, color: '#2c2c2c' } },
            tooltip: { trigger: 'axis' },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: { type: 'value' },
            series: [{
                data: [12, 19, 15, 22, 18, 25, 20],
                type: 'line',
                smooth: true,
                itemStyle: { color: '#7a8471' },
                lineStyle: { color: '#7a8471', width: 3 }
            }]
        };
        progressChart.setOption(progressOption);
    }
    
    if (document.getElementById('masteryChart')) {
        const masteryChart = echarts.init(document.getElementById('masteryChart'));
        const masteryOption = {
            title: { text: 'Topic Mastery', textStyle: { fontSize: 16, color: '#2c2c2c' } },
            tooltip: { trigger: 'item' },
            series: [{
                type: 'pie',
                radius: '70%',
                data: [
                    { value: 35, name: 'Algebra', itemStyle: { color: '#7a8471' } },
                    { value: 25, name: 'Geometry', itemStyle: { color: '#c65d07' } },
                    { value: 20, name: 'Statistics', itemStyle: { color: '#2c2c2c' } },
                    { value: 20, name: 'To Learn', itemStyle: { color: '#e9ecef' } }
                ]
            }]
        };
        masteryChart.setOption(masteryOption);
    }
}

// Problem solver functions
function selectProblemType(type) {
    currentTopic = type;
    generateNewProblem();
    updateProblemDisplay();
}

function generateNewProblem() {
    const generators = problemGenerators[currentTopic];
    if (!generators) return;
    
    const difficultyGenerators = generators[currentDifficulty];
    if (!difficultyGenerators || difficultyGenerators.length === 0) return;
    
    const randomGenerator = difficultyGenerators[Math.floor(Math.random() * difficultyGenerators.length)];
    currentProblem = randomGenerator();
    
    const correctAnswer = currentProblem.answer;
    const shuffledOptions = [...currentProblem.options].sort(() => Math.random() - 0.5);
    const correctIndex = shuffledOptions.indexOf(correctAnswer);
    
    currentProblem.shuffledOptions = shuffledOptions;
    currentProblem.correctIndex = correctIndex;
}

function updateProblemDisplay() {
    if (!currentProblem) return;
    
    const problemDisplay = document.getElementById('problem-display');
    if (!problemDisplay) return;
    
    problemDisplay.innerHTML = `
        <div class="text-center p-6">
            <h3 class="font-display text-2xl font-semibold text-gray-900 mb-6">
                ${currentProblem.question}
            </h3>
            <div class="grid grid-cols-2 gap-4 max-w-md mx-auto">
                ${currentProblem.shuffledOptions.map((option, index) => `
                    <button onclick="submitAnswer(${index})" 
                            class="p-4 border-2 border-gray-300 rounded hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 text-lg font-medium">
                        ${option}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

function submitAnswer(selectedIndex) {
    if (!currentProblem) return;
    
    const isCorrect = selectedIndex === currentProblem.correctIndex;
    showFeedback(isCorrect);
    
    if (isCorrect) {
        setTimeout(() => {
            generateNewProblem();
            updateProblemDisplay();
            hideFeedback();
        }, 1500);
    }
}

function showFeedback(isCorrect) {
    const feedbackArea = document.getElementById('feedback-area');
    const feedbackText = document.getElementById('feedback-text');
    
    if (feedbackArea && feedbackText) {
        feedbackArea.className = `mt-4 p-4 rounded ${isCorrect ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'}`;
        feedbackText.textContent = isCorrect ? '✓ Correct! Nice work.' : '✗ Not quite. Try again!';
        feedbackArea.classList.remove('hidden');
    }
}

function hideFeedback() {
    const feedbackArea = document.getElementById('feedback-area');
    if (feedbackArea) {
        feedbackArea.classList.add('hidden');
    }
}

function getHint() {
    if (!currentProblem || !currentProblem.solution) return;
    
    const solutionArea = document.getElementById('solution-area');
    const stepsContainer = document.getElementById('solution-steps');
    
    if (solutionArea && stepsContainer) {
        stepsContainer.innerHTML = currentProblem.solution.map(step => 
            `<div class="solution-step bg-gray-50 p-3 rounded border-l-4 border-blue-400">${step}</div>`
        ).join('');
        solutionArea.classList.remove('hidden');
    }
}

// Practice page functions
function initializePracticePage() {
    setupDifficultyButtons();
}

function setupDifficultyButtons() {
    const difficultyBtns = document.querySelectorAll('.difficulty-btn');
    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            difficultyBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentDifficulty = this.textContent.toLowerCase();
        });
    });
}

function startQuickPractice() {
    showQuizInterface('Quick Practice', `${currentTopic} • ${currentDifficulty}`);
    generateQuizQuestions(5);
    startQuiz();
}

function startTimedChallenge() {
    showQuizInterface('Timed Challenge', '5 minutes • Mixed topics');
    generateQuizQuestions(15);
    startQuizWithTimer(300);
}

function createCustomQuiz() {
    const questionCount = 10;
    showQuizInterface('Custom Quiz', `${questionCount} questions • No time limit`);
    generateQuizQuestions(questionCount);
    startQuiz();
}

function showQuizInterface(title, subtitle) {
    document.getElementById('quiz-interface').classList.remove('hidden');
    document.getElementById('quiz-title').textContent = title;
    document.getElementById('quiz-subtitle').textContent = subtitle;
    document.getElementById('quiz-interface').scrollIntoView({ behavior: 'smooth' });
}

function generateQuizQuestions(count) {
    quizQuestions = [];
    for (let i = 0; i < count; i++) {
        generateNewProblem();
        quizQuestions.push({...currentProblem});
    }
    currentQuestionIndex = 0;
    userAnswers = [];
}

function startQuiz() {
    isQuizActive = true;
    displayCurrentQuestion();
}

function startQuizWithTimer(seconds) {
    startQuiz();
    quizStartTime = Date.now();
    quizTimer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - quizStartTime) / 1000);
        const remaining = seconds - elapsed;
        
        if (remaining <= 0) {
            endQuiz();
            return;
        }
        
        const minutes = Math.floor(remaining / 60);
        const secs = remaining % 60;
        document.getElementById('quiz-timer').textContent = 
            `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
}

function displayCurrentQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        endQuiz();
        return;
    }
    
    const question = quizQuestions[currentQuestionIndex];
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('progress-text').textContent = `${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    document.getElementById('progress-fill').style.width = `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`;
    
    const optionsContainer = document.getElementById('answer-options');
    optionsContainer.innerHTML = question.shuffledOptions.map((option, index) => `
        <button class="w-full text-left p-4 border border-gray-300 rounded hover:border-orange-500 hover:bg-orange-50 transition-all duration-200" 
                onclick="selectAnswer(${index})">
            ${String.fromCharCode(65 + index)}) ${option}
        </button>
    `).join('');
}

function selectAnswer(answerIndex) {
    userAnswers[currentQuestionIndex] = answerIndex;
    const buttons = document.querySelectorAll('#answer-options button');
    buttons.forEach((btn, index) => {
        btn.classList.remove('border-orange-500', 'bg-orange-50');
        if (index === answerIndex) {
            btn.classList.add('border-orange-500', 'bg-orange-50');
        }
    });
}

function endQuiz() {
    isQuizActive = false;
    if (quizTimer) {
        clearInterval(quizTimer);
        quizTimer = null;
    }
    
    let correct = 0;
    quizQuestions.forEach((question, index) => {
        if (userAnswers[index] === question.correctIndex) {
            correct++;
        }
    });
    
    const score = Math.round((correct / quizQuestions.length) * 100);
    showQuizResults(correct, quizQuestions.length, score);
}

function showQuizResults(correct, total, score) {
    document.getElementById('quiz-interface').innerHTML = `
        <div class="text-center py-12 bg-white rounded-xl">
            <div class="text-6xl mb-4">🎉</div>
            <h2 class="font-display text-4xl font-bold text-gray-900 mb-4">Quiz Complete!</h2>
            <div class="text-3xl font-bold text-orange-600 mb-2">${score}%</div>
            <p class="text-xl text-gray-600 mb-8">You got ${correct} out of ${total} questions correct!</p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button onclick="location.reload()" class="bg-orange-500 text-white px-8 py-3 rounded hover:bg-orange-600 transition-colors duration-200">
                    Try Again
                </button>
                <button onclick="window.location.href='lessons.html'" class="border-2 border-orange-500 text-orange-500 px-8 py-3 rounded hover:bg-orange-50 transition-colors duration-200">
                    Study More
                </button>
            </div>
        </div>
    `;
}

// Lessons page functions
function initializeLessonsPage() {
    // Simple card interactions
    document.querySelectorAll('.topic-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

function openTopic(topic) {
    alert(`Opening ${topic} lessons... This would show detailed lesson content.`);
}

function demoPythagorean() {
    const demoContainer = document.getElementById('pythagorean-demo');
    if (!demoContainer) return;
    
    demoContainer.innerHTML = `
        <div class="relative w-full h-full flex items-center justify-center p-4">
            <svg width="200" height="150" viewBox="0 0 200 150" class="border border-gray-300 rounded">
                <polygon points="50,120 150,120 150,30 50,120" fill="none" stroke="#7a8471" stroke-width="3"/>
                <rect x="50" y="120" width="100" height="30" fill="rgba(198, 93, 7, 0.2)" stroke="#c65d07" stroke-width="2"/>
                <rect x="150" y="30" width="30" height="90" fill="rgba(122, 132, 113, 0.2)" stroke="#7a8471" stroke-width="2"/>
                <text x="100" y="140" text-anchor="middle" font-size="14" fill="#2c2c2c">a²</text>
                <text x="165" y="80" text-anchor="middle" font-size="14" fill="#2c2c2c">b²</text>
                <text x="100" y="70" text-anchor="middle" font-size="14" fill="#2c2c2c">c²</text>
            </svg>
        </div>
    `;
}

function demoQuadratic() {
    const demoContainer = document.getElementById('quadratic-demo');
    if (!demoContainer) return;
    
    demoContainer.innerHTML = `
        <div class="text-center p-4">
            <p class="text-lg font-medium text-gray-900 mb-4">y = ax² + bx + c</p>
            <div class="space-y-3">
                <div>
                    <label class="block text-sm font-medium text-gray-700">a = 1</label>
                    <input type="range" min="0.5" max="3" step="0.1" value="1" class="w-32">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">b = 0</label>
                    <input type="range" min="-5" max="5" step="0.1" value="0" class="w-32">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">c = 0</label>
                    <input type="range" min="-10" max="10" step="0.1" value="0" class="w-32">
                </div>
            </div>
        </div>
    `;
}

function resetDemo() {
    const containers = ['pythagorean-demo', 'quadratic-demo'];
    containers.forEach(id => {
        const container = document.getElementById(id);
        if (container) {
            container.innerHTML = `
                <div class="text-center text-gray-500 p-8">
                    <div class="text-4xl mb-2">📐</div>
                    <p>Interactive visualization</p>
                </div>
            `;
        }
    });
}

// About page functions
function initializeAboutPage() {
    // Simple number animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
                
                let currentValue = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        currentValue = numericValue;
                        clearInterval(timer);
                    }
                    
                    if (finalValue.includes('K')) {
                        target.textContent = Math.floor(currentValue / 1000) + 'K+';
                    } else if (finalValue.includes('%')) {
                        target.textContent = Math.floor(currentValue) + '%';
                    } else if (finalValue.includes('★')) {
                        target.textContent = (Math.floor(currentValue) / 10).toFixed(1) + '★';
                    } else {
                        target.textContent = Math.floor(currentValue).toLocaleString() + '+';
                    }
                }, 40);
                
                observer.unobserve(target);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function showContactForm() {
    alert('Contact: hello@novamath.com\n\nWe\'d love to hear from you!');
}

function showCareers() {
    alert('We\'re always looking for passionate educators and developers!\n\nEmail us at careers@novamath.com');
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function plotFunction(func) {
    if (window.setPlotterFunction) {
        window.setPlotterFunction(func);
    }
}

function generatePattern(type) {
    alert(`Generating ${type} pattern...`);
}

function showStatistics(type) {
    alert(`Showing ${type} statistics...`);
}

// Additional practice functions
function startFocusedPractice(topic) {
    alert(`Starting focused practice for ${topic}...`);
}

function startAccuracyChallenge() {
    alert('Starting accuracy challenge...');
}

function startSpeedTraining() {
    alert('Starting speed training...');
}

// Export functions
window.selectProblemType = selectProblemType;
window.submitAnswer = submitAnswer;
window.getHint = getHint;
window.scrollToSection = scrollToSection;
window.plotFunction = plotFunction;
window.generatePattern = generatePattern;
window.showStatistics = showStatistics;
window.startQuickPractice = startQuickPractice;
window.startTimedChallenge = startTimedChallenge;
window.createCustomQuiz = createCustomQuiz;
window.selectAnswer = selectAnswer;
window.nextQuestion = nextQuestion;
window.openTopic = openTopic;
window.demoPythagorean = demoPythagorean;
window.demoQuadratic = demoQuadratic;
window.resetDemo = resetDemo;
window.showContactForm = showContactForm;
window.showCareers = showCareers;
window.startFocusedPractice = startFocusedPractice;
window.startAccuracyChallenge = startAccuracyChallenge;
window.startSpeedTraining = startSpeedTraining;