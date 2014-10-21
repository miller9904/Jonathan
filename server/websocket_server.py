class JonathanWebSocket(websocket.WebSocketHandler):
    def on_message(self, message):
        if message == "test":
            self.write_message("{“header”: “Card Header”, “body”: “This is the body”}")