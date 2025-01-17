# Sudoku Solver

This web application provides an efficient solution of Sudoku puzzles using a combination of **image processing**, **machine learning**, and **Backtracking Algorithm** techniques.

---

## Table of Contents

- [Introduction](#introduction)
- [Tech Stack](#tech-stack🛠)
- [Algorithm Overview](#algorithm-overview)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Interface](#interface)
- [References](#references)

---

## Introduction

Sudoku is a logic-based, combinatorial number-placement puzzle. The goal is to fill a 9×9 grid with digits such that each column, each row, and each of the nine 3×3 sub-grids contain all the digits from 1 to 9. This project implements a **Sudoku Solver** using a pipeline that integrates image processing, machine learning, and backtracking algorithms.

---


## Tech Stack🛠
<p align="center"> <img src="https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white"> <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white"> </p> <p align="center"> <img src="https://img.shields.io/badge/Numpy-013243?style=for-the-badge&logo=numpy&logoColor=white"> <img src="https://img.shields.io/badge/Matplotlib-11557C?style=for-the-badge&logo=matplotlib&logoColor=white"> <img src="https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white"> <img src="https://img.shields.io/badge/Scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> </p>

---

## Algorithm Overview

The implemented Sudoku Solver pipeline includes:

1. **Image Processing with OpenCV**:
   - Extract the Sudoku grid from an input image.
   - Perform perspective transformation and preprocessing to enhance grid visibility.

2. **Digit Recognition with CNN**:
   - Predict digits in each cell of the extracted grid.
   - Handle empty cells appropriately.

3. **Backtracking Algorithm**:
   - Solve the recognized grid using recursive backtracking, ensuring that the solution follows Sudoku rules.

4. **Frontend Integration**:
   - Enable users to upload images and view results interactively through the ReactJS-based frontend.

---

## Getting Started

### Installation

1. **Clone this repository**:

    ```bash
    git clone https://github.com/YourUsername/Sudoku-Solver.git
    cd Sudoku-Solver
    ```

2. **Install frontend dependencies**:

    ```bash
    cd Frontend
    npm install
    ```
3. **Install backend dependencies**:

    ```bash
    cd Backend
    pip install -r requirements.txt
    ```

4. **Set up the CNN model**:
   - Place your pre-trained CNN model file in the `Model` directory.

---

## Usage

1. **Start the backend server**:

    ```bash
    cd Backend
    python server.py
    ```

2. **Run the frontend**:

    ```bash
    cd Frontend
    npm start
    ```

3. **Upload an image**:
   - Use the frontend interface to upload a Sudoku puzzle image.

4. **View Results**:
   - Click the solve button, and the solution will be displayed interactively on the web interface.

---

## Interface


---

## References

- **Sudoku Solving Techniques**: A comprehensive guide to constraint-based solving methods.
- **Backtracking Algorithms**: Implementation insights from GeeksforGeeks and other algorithmic resources.
- **OpenCV Documentation**: For image preprocessing techniques.
- **CNN for Digit Recognition**: Insights from TensorFlow and PyTorch documentation.

Feel free to raise issues or contribute to this project to improve its performance and features!

**THANKS**
