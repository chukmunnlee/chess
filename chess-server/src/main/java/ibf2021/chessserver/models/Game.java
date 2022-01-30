package ibf2021.chessserver.models;

import java.util.LinkedList;
import java.util.UUID;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.util.List;

public class Game {

	private final String gid;
	private List<WebSocketSession> players = new LinkedList<>();


	public Game() {
		gid = UUID.randomUUID().toString().substring(0, 8);
	}
	public Game(String gid) {
		this.gid = gid;
	}

	public String getGameId() { return this.gid; }

	public void addPlayer(WebSocketSession sess) {
		this.players.add(sess);
	}

	public boolean isStarted() {
		return (this.players.size() >= 2);
	}

	public void close() {
		players.stream()
			.forEach(sess -> {
				try { sess.close(); } catch (Exception ex) { }
			});
	}

	public void sendMessage(final String payload) {
		final TextMessage msg = new TextMessage(payload);
		players.forEach(p -> {
			try {
				p.sendMessage(msg);
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		});
	}

}
