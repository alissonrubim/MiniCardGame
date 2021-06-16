class SocketController {
    setIO(io){
        this.io = io;
    }

    onConnect(socket){
        
    }

    post(action, data){
        this.io.emit(action, data);
    }
}

exports.socketController = new SocketController();
