# QuizPlay

A timed multiple-choice quiz about React, built with React.

Built as a practice project while learning React.

![Quiz page](<screenshots/quiz page.png>)

## Features

- 7 questions about React, with the answers shuffled (Fisher-Yates) for each question
- "Question X of 7" indicator and a 10-second timer per question shown as a progress bar; unanswered questions are skipped automatically, or skip manually
- Answer with the mouse or press 1-4 on the keyboard
- The selected answer is highlighted, then marked correct or wrong before moving on
- Summary screen with your score, the percentage of skipped, correct and incorrect answers, and a per-question review that shows the correct answer for anything you missed
- Best score saved in `localStorage`, and a "Play again" button to restart
- Responsive layout for phones

## Tech stack

- React 18
- Vite 4
- Deployed to GitHub Pages from the `gh-pages` branch (`base: '/QuizPlay/'` in `vite.config.js`)

## Getting started

Prerequisites: Node.js 18+ and npm.

```bash
git clone https://github.com/AkshayTripathiAI/QuizPlay.git
cd QuizPlay
npm install
npm run dev
```

Then open the URL Vite prints (by default http://localhost:5173).

Other scripts: `npm run build`, `npm run preview`.

## Project structure

```
src/
  questions.js          # question bank (the first answer in each list is the correct one)
  components/
    Quiz.jsx            # tracks answers, shows Summary when done
    Question.jsx        # one question + answer state
    Answers.jsx         # shuffled answer buttons
    QuestionTimer.jsx   # countdown progress bar
    Summary.jsx         # results screen
```
