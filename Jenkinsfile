pipeline {
    agent any

    tools {
        // Instalamos la versión de Node.js configurada como "nodejs" y la añadimos al path.
        nodejs "nodejs"
    }

    stages {
        stage('Checkout') {
            steps {
                // Obtener el código desde un repositorio de GitHub.
                git 'https://github.com/MartinOchoa09/apiHoming.git'
            }
        }
        
        stage('Install') {
            steps {
                // Instalar las dependencias usando npm
                sh 'npm install'
                
                // Para ejecutar en Windows, usar:
                bat 'npm install'
            }
        }
        
        stage('Build') {
            steps {
                // Construir el proyecto, si aplica
                // Por ejemplo, si tienes scripts de build en package.json:
                sh 'npm run build'
                
                // Para ejecutar en Windows, usar:
                   bat 'npm run start'
            }
        }
        
        stage('Test') {
            steps {
                // Ejecutar los tests usando npm
                sh 'npm test'
                
                // Para ejecutar en Windows:
                bat 'npm test'
            }
            
            post {
                // Si los tests se ejecutaron, registrar los resultados y archivar los artefactos
                success {
                    junit '**/test-results.xml' // Ajusta esto según el formato de tus resultados de test
                    archiveArtifacts 'build/**' // Ajusta esto según los artefactos generados en tu build
                }
            }
        }
    }
    
    post {
        // Notificaciones y acciones a tomar al final del pipeline
        always {
            echo 'Pipeline completo.'
        }
        
        success {
            echo 'Pipeline exitoso.'
        }
        
        failure {
            echo 'Pipeline fallido.'
        }
    }
}