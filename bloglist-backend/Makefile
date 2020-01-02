all: user1 user2

user1:
	curl -X POST -H "Content-Type: application/json" http://localhost:3003/api/users -d '{"name": "Test User", "username": "test", "password": "test"}'

user2:
	curl -X POST -H "Content-Type: application/json" http://localhost:3003/api/users -d '{"name": "Test User 2", "username": "test2", "password": "test2"}'
