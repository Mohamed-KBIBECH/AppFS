pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Cloner le dépôt depuis Git
                git 'https://github.com/Mohamed-KBIBECH/DevSecOps.git'
            }
        }
        stage('Build') {
            steps {
                // Construire le projet avec Maven
                // Utiliser mvnw si Maven Wrapper est utilisé, sinon remplacer par 'mvn'
                bat 'mvnw clean install'
            }
        }
        stage('Test') {
            steps {
                // Exécuter les tests unitaires et d'intégration
                bat 'mvnw test'
            }
        }
        stage('Package') {
            steps {
                // Créer le package JAR ou WAR
                bat 'mvnw package'
            }
        }
        stage('Deploy') {
            steps {
                // Déploiement (peut être ajusté selon vos besoins)
                echo 'Déploiement de l\'application...'
            }
        }
        stage('Secret Scanning') {
    steps {
        echo 'Scanning des secrets avec GitLeaks...'
        bat 'gitleaks detect --source . --report-format json --report-path gitleaks-report.json'
    }
}
        stage('Analyze Secrets Report') {
    steps {
        script {
            def report = readFile('gitleaks-report.json')
            if (report.contains('leak')) {
                error 'Secrets détectés ! Le build est arrêté.'
            }
        }
    }
}
      stage('DP Check') {
    steps {
        dependencyCheck additionalArguments: '--scan ./src/main/java --format HTML --disableAssembly --data /var/lib/dependency-check/data',
                        odcInstallation: 'Dep-Check'
    }
}


      


    }

    post {
        always {
            // Archiver les fichiers générés (JAR/WAR) dans le répertoire target
            archiveArtifacts artifacts: '**/target/*.jar', allowEmptyArchive: true
        }
        success {
            // Notification de succès
            echo 'Le build a réussi et les tests ont été validés !'
        }
        failure {
            // Notification d'échec
            echo 'Le build a échoué.'
        }
    }
}
