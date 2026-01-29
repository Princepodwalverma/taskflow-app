#!/bin/bash

# TaskFlow - Quick Start Script
# This script helps you quickly build and run the TaskFlow application

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Banner
echo -e "${BLUE}"
echo "╔════════════════════════════════════════╗"
echo "║        TaskFlow - Quick Start          ║"
echo "║    Modern Task Management App          ║"
echo "╚════════════════════════════════════════╝"
echo -e "${NC}"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: Docker is not installed.${NC}"
    echo "Please install Docker from https://docs.docker.com/get-docker/"
    exit 1
fi

echo -e "${GREEN}✓ Docker is installed${NC}"

# Check if Docker Compose is available
if command -v docker-compose &> /dev/null || docker compose version &> /dev/null; then
    echo -e "${GREEN}✓ Docker Compose is available${NC}"
    USE_COMPOSE=true
else
    echo -e "${YELLOW}⚠ Docker Compose not found, using Docker only${NC}"
    USE_COMPOSE=false
fi

echo ""
echo -e "${BLUE}Choose an option:${NC}"
echo "1) Build and run the application"
echo "2) Stop the application"
echo "3) View logs"
echo "4) Rebuild and restart"
echo "5) Remove all containers and images"
echo "6) Exit"
echo ""
read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        echo -e "${BLUE}Building and starting TaskFlow...${NC}"
        if [ "$USE_COMPOSE" = true ]; then
            docker-compose up -d --build
        else
            docker build -t taskflow-app .
            docker run -d -p 8080:80 --name taskflow taskflow-app
        fi
        echo -e "${GREEN}✓ TaskFlow is running!${NC}"
        echo -e "${BLUE}Access the app at: http://localhost:8080${NC}"
        ;;
    2)
        echo -e "${BLUE}Stopping TaskFlow...${NC}"
        if [ "$USE_COMPOSE" = true ]; then
            docker-compose down
        else
            docker stop taskflow 2>/dev/null || true
            docker rm taskflow 2>/dev/null || true
        fi
        echo -e "${GREEN}✓ TaskFlow stopped${NC}"
        ;;
    3)
        echo -e "${BLUE}Viewing logs (press Ctrl+C to exit)...${NC}"
        if [ "$USE_COMPOSE" = true ]; then
            docker-compose logs -f
        else
            docker logs -f taskflow
        fi
        ;;
    4)
        echo -e "${BLUE}Rebuilding and restarting TaskFlow...${NC}"
        if [ "$USE_COMPOSE" = true ]; then
            docker-compose down
            docker-compose up -d --build
        else
            docker stop taskflow 2>/dev/null || true
            docker rm taskflow 2>/dev/null || true
            docker build -t taskflow-app .
            docker run -d -p 8080:80 --name taskflow taskflow-app
        fi
        echo -e "${GREEN}✓ TaskFlow rebuilt and restarted!${NC}"
        echo -e "${BLUE}Access the app at: http://localhost:8080${NC}"
        ;;
    5)
        echo -e "${YELLOW}⚠ This will remove all TaskFlow containers and images${NC}"
        read -p "Are you sure? (y/N): " confirm
        if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
            echo -e "${BLUE}Cleaning up...${NC}"
            if [ "$USE_COMPOSE" = true ]; then
                docker-compose down -v
            else
                docker stop taskflow 2>/dev/null || true
                docker rm taskflow 2>/dev/null || true
            fi
            docker rmi taskflow-app 2>/dev/null || true
            echo -e "${GREEN}✓ Cleanup complete${NC}"
        else
            echo -e "${YELLOW}Cancelled${NC}"
        fi
        ;;
    6)
        echo -e "${GREEN}Goodbye!${NC}"
        exit 0
        ;;
    *)
        echo -e "${RED}Invalid option${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}Done!${NC}"
