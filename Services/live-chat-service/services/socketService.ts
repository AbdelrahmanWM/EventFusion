import { Server } from 'socket.io';
import { IChatService } from 'live-chat-service/interfaces/IChatService';

export default class SocketService {

  private io: Server;
  private chatService: IChatService;

  constructor(io: Server, chatService: IChatService) {
    this.io = io;
    this.chatService = chatService;
    this.initializeSockets();
  }

  private initializeSockets() {
    this.io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('chatMessage', async (data: { eventID: string, username: string, userID: string, comment: string}) => {
        try {
          const newDate: string= new Date().toISOString();
          await this.chatService.addMessage(data.eventID, data.username, data.userID, data.comment, newDate);
          this.io.emit('newMessage', {username:data.username,userID:data.userID,comment:data.comment,date:newDate});
        } catch (err) {
          console.error('Error saving message:', err);
        }
      });

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
  }
}
