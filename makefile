
PROJECT := basic-devtools
DOCKER_HUB_PATH := parveshchaudhary/$(PROJECT)
VERSION := $(shell git rev-parse HEAD)

dockerise:
	docker build -t $(DOCKER_HUB_PATH):$(VERSION) .

publish_image:
	docker push $(DOCKER_HUB_PATH):$(VERSION)