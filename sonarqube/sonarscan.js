const scanner = require('sonarqube-scanner');
const dotenv = require('dotenv').config();

scanner(
    {
        serverUrl: 'http://localhost:9000',
        token: process.env.SONARQUBE_TOKEN,
        login: 'admin',
        options: {
            'sonar.projectName': 'Life-Maze',
            'sonar.projectDescription': "Conway's game of life",
            'sonar.projectKey': 'life-maze',
            'sonar.projectVersion': '0.0.1',
            'sonar.exclusions': '',
            'sonar.sourceEncoding': 'UTF-8',
            'sonar.password': '3301'
        }
    },
    () => process.exit()
)