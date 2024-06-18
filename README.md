# Bookflex - books recommendation system

## Usage of Recommandation System

Dependencies:
- __Python 3.9__
- Flask - 3.0.3
- Flask-Cors - 1.11.1
- joblib - 1.2.0
- nltk - 3.8.1
- numpy - 1.26.4
- pandas - 2.2.2
- scikit_learn - 1.3.0
- scipy - 1.11.3
- text2emotion - 0.0.5


1. First, download Miniconda: [Miniconda Installation Guide](https://docs.anaconda.com/free/miniconda/)
2. Go to the model directory:
   ```bash
   cd python-model
4. Create a new environment:
   ```bash
   conda create --name the_environment_name python=3.9 --file requirements.txt
5. Then activate the conda environment:
   ```bash
   conda activate the_enviroment_name
6. Change into the route directiory and run:
   ```bash
   python ./RecommandationAPI.py

## Usage of web application(frontend)

Requirements:
- installed npm

1. Go to the frontend directory:
   ```bash
   cd web-front
2. Install needed packages:
   ```bash
   npm install
3. Start development version of react application:
   ```bash
   npm start
4. Application can be accessed at http://localhost:3000/
