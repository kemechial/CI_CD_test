pipeline {
    agent any

       tools {
        // This tells Jenkins to make the 'NodeJS-16' tool available
        nodejs 'NodeJS-16' 
    }


    environment {
        DOCKER_IMAGE = 'todo-app'
        DOCKER_TAG = "${BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        /*
        stage('Lint') {
            steps {
                sh 'npm run lint || true'
            }
        }
        */
       stage('Test') {
            steps {
                // Use the new script that generates the report
                sh 'npm run test:ci'
            }
            post {
                always {
                    // Point to the correct path for the generated report
                    junit 'test-results/jest/results.xml'
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
               steps {
                      sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} -f Dockerfiles/Dockerfile.app ."
                 }
            }
        }
        
        stage('Deploy') {
            when {
                branch 'master'
            }
            steps {
                script {
                    sh """
                        docker stop todo-app || true
                        docker rm todo-app || true
                        docker run -d --name todo-app -p 8080:80 ${DOCKER_IMAGE}:${DOCKER_TAG}
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
        always {
            cleanWs()
        }
    }
}