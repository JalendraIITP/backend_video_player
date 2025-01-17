# Sudoku Solver

This repository provides an efficient solution for solving Sudoku puzzles using a combination of **image processing**, **machine learning**, and **algorithmic optimization** techniques. It demonstrates how diverse technologies can work together to solve constraint-based problems like Sudoku.

---

## Table of Contents

- [Introduction](#introduction)
- [Technology Stack](#technology-stack)
- [Algorithm Overview](#algorithm-overview)
- [Getting Started](#getting-started)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Results](#results)
- [References](#references)

---

## Introduction

Sudoku is a logic-based, combinatorial number-placement puzzle. The goal is to fill a 9×9 grid with digits such that each column, each row, and each of the nine 3×3 sub-grids contain all the digits from 1 to 9. This project implements a **Sudoku Solver** using a pipeline that integrates image processing, machine learning, and backtracking algorithms.

---

## Technology Stack

This project leverages the following technologies:

1. <img src="https://upload.wikimedia.org/wikipedia/commons/3/32/OpenCV_Logo_with_text_svg_version.svg" alt="OpenCV" width="30" height="30"> **OpenCV**: For image processing to extract Sudoku grids from images.

2. <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="ReactJS" width="30" height="30"> **ReactJS**: For an interactive and user-friendly frontend interface.

3. <div style="background-color: white; color:white; padding: 5px; border-radius: 5px; display: inline-block;">
   <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Flask_logo.svg" alt="FlaskAPI" width="30" height="30"> **FlaskAPI**: To serve as the backend, handling image processing and solution generation.
</div>

4. <img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg" alt="TensorFlow" width="30" height="30"> **Convolutional Neural Networks (CNN)**: To predict digits from the extracted grid.



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

### Prerequisites

Ensure you have the following software installed:

- **Python** 3.x
- Libraries:
  - **OpenCV**
  - **Flask**
  - **NumPy**
  - **TensorFlow** (or PyTorch for CNNs)
- **Node.js** (for running the ReactJS frontend)

---

### Installation

1. **Clone this repository**:

    ```bash
    git clone https://github.com/YourUsername/Sudoku-Solver.git
    cd Sudoku-Solver
    ```

2. **Install the required dependencies**:

    ```bash
    pip install -r requirements.txt
    cd frontend
    npm install
    ```

3. **Set up the CNN model**:
   - Place your pre-trained CNN model file in the `models` directory.

---

## Features

- **Image-based Sudoku Solving**: Upload an image of a Sudoku puzzle to get the solution.
- **Accurate Digit Recognition**: Uses a CNN for reliable digit prediction.
- **Efficient Backtracking**: Solves recognized grids with advanced optimizations.
- **Interactive Frontend**: User-friendly interface built with ReactJS.
- **API Integration**: Modular backend using FlaskAPI.

---

## Usage

1. **Start the backend server**:

    ```bash
    python app.py
    ```

2. **Run the frontend**:

    ```bash
    cd frontend
    npm start
    ```

3. **Upload an image**:
   - Use the frontend interface to upload a Sudoku puzzle image.

4. **View Results**:
   - The solution is displayed interactively on the web interface.

---

## Results

The Sudoku Solver can process images and solve puzzles with varying difficulty levels. Below are sample results:

### Input Image:
![Input Image](images/sample_input.jpg)

### Recognized Grid:

---

## References

- **Sudoku Solving Techniques**: A comprehensive guide to constraint-based solving methods.
- **Backtracking Algorithms**: Implementation insights from GeeksforGeeks and other algorithmic resources.
- **OpenCV Documentation**: For image preprocessing techniques.
- **CNN for Digit Recognition**: Insights from TensorFlow and PyTorch documentation.

Feel free to raise issues or contribute to this project to improve its performance and features!

**THANKS**
