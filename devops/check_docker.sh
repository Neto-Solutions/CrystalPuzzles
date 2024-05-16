#!/bin/bash

# Function to check the availability of a program
check_command() {
    command -v "$1" > /dev/null 2>&1
}

# Check the Docker
if check_command docker; then
    echo "Docker is installed."

    # Check if the Docker daemon is running
    if docker info > /dev/null 2>&1; then
        echo "Docker daemon is running."
    else
        echo "Docker daemon is not running. Please start Docker."
    fi
else
    echo "Docker is not installed. Please install Docker."
    ./install_docker_docker-compose.sh
fi

#  Check the Docker Compose
if check_command docker-compose; then
    echo "Docker Compose is installed."
elif check_command docker compose; then
    echo "Docker Compose (new version) is installed."
else
    echo "Docker Compose is not installed. Please install Docker Compose."
fi

