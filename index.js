// Quiz questions
        const questions = [
            {
                question: "What is the capital of France?",
                options: ["London", "Berlin", "Paris", "Madrid"],
                answer: "Paris"
            },
            {
                question: "Which language runs in a web browser?",
                options: ["Java", "C", "Python", "JavaScript"],
                answer: "JavaScript"
            },
            {
                question: "What does CSS stand for?",
                options: [
                    "Central Style Sheets",
                    "Cascading Style Sheets",
                    "Cascading Simple Sheets",
                    "Cars SUVs Sailboats"
                ],
                answer: "Cascading Style Sheets"
            },
            {
                question: "What does HTML stand for?",
                options: [
                    "Hypertext Markup Language",
                    "Hypertext Markdown Language",
                    "Hyperloop Machine Language",
                    "Helicopters Terminals Motorboats Lamborginis"
                ],
                answer: "Hypertext Markup Language"
            },
            {
                question: "Which year was JavaScript launched?",
                options: ["1996", "1995", "1994", "1997"],
                answer: "1995"
            }
        ];

        // DOM elements
        const quizElement = document.getElementById('quiz');
        const questionElement = document.getElementById('question');
        const optionsElement = document.getElementById('options');
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');
        const submitButton = document.getElementById('submit');
        const restartButton = document.getElementById('restart');
        const scoreContainer = document.getElementById('score-container');
        const scoreElement = document.getElementById('score');
        const totalElement = document.getElementById('total');
        const progressBar = document.getElementById('progress');

        // Quiz state
        let currentQuestionIndex = 0;
        let score = 0;
        let userAnswers = new Array(questions.length).fill(null);

        // Initialize the quiz
        function initQuiz() {
            showQuestion();
            updateProgressBar();
            updateButtons();
        }

        // Display the current question
        function showQuestion() {
            const question = questions[currentQuestionIndex];
            questionElement.textContent = question.question;
            
            optionsElement.innerHTML = '';
            question.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.classList.add('option');
                button.textContent = option;
                
                // Highlight selected answer if exists
                if (userAnswers[currentQuestionIndex] === option) {
                    button.classList.add('selected');
                }
                
                button.addEventListener('click', () => selectOption(option, button));
                optionsElement.appendChild(button);
            });
        }

        // Handle option selection
        function selectOption(selectedOption, button) {
            // Remove selected class from all options
            document.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
                opt.classList.remove('correct', 'incorrect');
            });
            
            // Add selected class to clicked option
            button.classList.add('selected');
            
            // Store the user's answer
            userAnswers[currentQuestionIndex] = selectedOption;
            
            // Check if answer is correct (just for visual feedback)
            const correctAnswer = questions[currentQuestionIndex].answer;
            if (selectedOption === correctAnswer) {
                button.classList.add('correct');
            } else {
                button.classList.add('incorrect');
                // Highlight correct answer
                document.querySelectorAll('.option').forEach(opt => {
                    if (opt.textContent === correctAnswer) {
                        opt.classList.add('correct');
                    }
                });
            }
        }

        // Update navigation buttons state
        function updateButtons() {
            prevButton.disabled = currentQuestionIndex === 0;
            
            if (currentQuestionIndex === questions.length - 1) {
                nextButton.style.display = 'none';
                submitButton.style.display = 'block';
            } else {
                nextButton.style.display = 'block';
                submitButton.style.display = 'none';
            }
        }

        // Update progress bar
        function updateProgressBar() {
            const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
            progressBar.style.width = `${progress}%`;
        }

        // Move to next question
        function nextQuestion() {
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                showQuestion();
                updateProgressBar();
                updateButtons();
            }
        }

        // Move to previous question
        function prevQuestion() {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                showQuestion();
                updateProgressBar();
                updateButtons();
            }
        }

        // Calculate and display final score
        function showScore() {
            score = 0;
            userAnswers.forEach((answer, index) => {
                if (answer === questions[index].answer) {
                    score++;
                }
            });
            
            scoreElement.textContent = score;
            totalElement.textContent = questions.length;
            
            quizElement.style.display = 'none';
            scoreContainer.style.display = 'block';
        }

        // Restart the quiz
        function restartQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            userAnswers = new Array(questions.length).fill(null);
            
            quizElement.style.display = 'block';
            scoreContainer.style.display = 'none';
            
            showQuestion();
            updateProgressBar();
            updateButtons();
        }

        // Event listeners
        nextButton.addEventListener('click', nextQuestion);
        prevButton.addEventListener('click', prevQuestion);
        submitButton.addEventListener('click', showScore);
        restartButton.addEventListener('click', restartQuiz);

        