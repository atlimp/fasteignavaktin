up:
	docker-compose up -d

up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up	 -d

down:
	docker-compose down --remove-orphans

prebuild:
	./scripts/prebuild

build: prebuild
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml build
