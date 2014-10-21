

from tornado import websocket, web, ioloop


class JonathanWebSocket(websocket.WebSocketHandler):
	def on_message(self, message):
		if message == "test":
			self.write_message('{"header": "Card Header", "body": "This is the body"}')

	
	def check_origin(self, origin):
		return True

app = web.Application([
	(r'/Jonathan', JonathanWebSocket)
])

if __name__ == '__main__':
	app.listen(8888)
	ioloop.IOLoop.instance().start()