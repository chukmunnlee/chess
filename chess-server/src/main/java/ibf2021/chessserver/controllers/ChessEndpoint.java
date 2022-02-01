package ibf2021.chessserver.controllers;

import java.net.URI;
import java.util.Date;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import ibf2021.chessserver.ChessserverApplication;
import ibf2021.chessserver.models.ChessMessage;
import ibf2021.chessserver.services.*;

import static ibf2021.chessserver.Constants.*;

public class ChessEndpoint extends TextWebSocketHandler {

	private final Logger logger = Logger.getLogger(ChessserverApplication.class.getName());

	private final ChessRepositoryService chessRepoSvc;

	public ChessEndpoint(ChessRepositoryService chessRepoSvc) {
		this.chessRepoSvc = chessRepoSvc;
	}

	@Override
	public void afterConnectionEstablished(WebSocketSession sess) throws Exception {
		final URI uri = sess.getUri();

		if (isNewGame(uri)) {
			Map<String, Object> attr = sess.getAttributes();
			String gid = chessRepoSvc.createGame(sess);
			attr.put(ATTR_GAMEID, gid);
			attr.put(ATTR_ORIENTATION, ORIENTATION_WHITE);

			try {
				TextMessage msg = new TextMessage(ChessMessage.createNewGame(gid).toJson());
				sess.sendMessage(msg);
				logger.info("Creating new game: %s".formatted(gid));
			} catch(Exception ex) {
				logger.log(Level.SEVERE, "afterConnectionEstablished", ex);
			}
		}
	}

	@Override
	public void afterConnectionClosed(WebSocketSession sess, CloseStatus status) throws Exception {
		Map<String, Object> attr = sess.getAttributes();
		String gid = (String)attr.get(ATTR_GAMEID);
		if (null == gid)
			return;
		chessRepoSvc.deleteGame(gid);
		logger.info("Delete game: %s".formatted(gid));
	}

	@Override
	public void handleMessage(WebSocketSession sess, WebSocketMessage<?> msg) throws Exception {
		System.out.printf("url path: %s\n", sess.getUri().getPath());
		System.out.printf("\tpayload: %s\n", msg.getPayload().toString());
		TextMessage resp = new TextMessage("hello world: %s".formatted((new Date()).toString()));
		sess.sendMessage(resp);
	}

	private boolean isNewGame(final URI uri) {
		String[] terms = uri.getPath().substring(1).split("/");
		return terms.length == 1;
	}
}
