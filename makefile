run:
	npm run dev
build:
	npm run build
deploy:
	scp -i ~/.ssh/id_rsa -P 22 -r out/* ubuntu@129.226.77.115:/opt/zoechat