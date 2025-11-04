.PHONY: help install dev build up down logs clean restart backend-logs frontend-logs db-shell backend-shell frontend-shell

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install dependencies for both frontend and backend
	@echo "Installing backend dependencies..."
	cd backend && npm install
	@echo "Installing frontend dependencies..."
	cd frontend && npm install

dev: ## Start development environment
	docker compose up -d

build: ## Build all containers
	docker compose build

up: ## Start all containers in detached mode
	docker compose up -d

down: ## Stop all containers
	docker compose down

logs: ## Show logs from all containers
	docker compose logs -f

backend-logs: ## Show backend logs
	docker compose logs -f backend

frontend-logs: ## Show frontend logs
	docker compose logs -f frontend

restart: ## Restart all containers
	docker compose restart

clean: ## Stop containers and remove volumes
	docker compose down -v

db-shell: ## Access PostgreSQL shell
	docker compose exec postgres psql -U postgres -d appdb

backend-shell: ## Access backend container shell
	docker compose exec backend sh

frontend-shell: ## Access frontend container shell
	docker compose exec frontend sh

prod-build: ## Build for production
	@echo "Building backend..."
	cd backend && npm run build
	@echo "Building frontend..."
	cd frontend && npm run build

test-backend: ## Run backend tests
	docker compose exec backend npm test

test-frontend: ## Run frontend tests
	docker compose exec frontend npm test

migrate: ## Run database migrations
	docker compose exec backend npm run migration:run

migrate-create: ## Create a new migration (use name=YourMigrationName)
	docker compose exec backend npm run migration:create -- -n $(name)

seed: ## Seed the database
	docker compose exec backend npm run seed