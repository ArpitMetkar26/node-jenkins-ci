pipeline {
  agent any

  environment {
    NODE_ENV = 'development'
    REPO_URL = 'https://github.com/ArpitMetkar26/node-jenkins-ci.git'
  }

  stages {

    stage('Clone') {
      steps {
        git branch: 'main', url: "${REPO_URL}"
      }
    }

    stage('Matrix Build') {
      matrix {
        axes {
          axis {
            name 'NODE_VERSION'
            values '16', '18'
          }
        }

        stages {

          stage('Install') {
            steps {
              ws("workspace-${NODE_VERSION}") {
                sh '''
                  rm -rf *
                  git clone ${REPO_URL} .
                  echo "Node version:"
                  node -v
                  rm -rf node_modules package-lock.json
                  npm install
                '''
              }
            }
          }

          stage('Test') {
            steps {
              ws("workspace-${NODE_VERSION}") {
                sh 'npm test'
              }
            }
            post {
              always {
                archiveArtifacts artifacts: '**/junit.xml', allowEmptyArchive: true
              }
            }
          }
        }
      }
    }

    stage('Deploy (Dummy)') {
      steps {
        echo 'Starting dummy deployment...'
        sh '''
          echo "Deploying application..."
          sleep 2
          echo "Dummy deployment successful"
        '''
      }
    }
  }

  post {
    success {
      echo '✅ Build Succeeded!'
    }
    failure {
      echo '❌ Build Failed!'
    }
  }
}
