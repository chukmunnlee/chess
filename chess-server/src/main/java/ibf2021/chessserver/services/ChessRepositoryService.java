package ibf2021.chessserver.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.locks.*;
import java.util.function.Supplier;

import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import ibf2021.chessserver.models.Game;

@Service
public class ChessRepositoryService {

	final private Map<String, Game> games = new HashMap<>();
	final private ReadWriteLock rwLock = new ReentrantReadWriteLock(true);

	public ChessRepositoryService() {
		System.out.println(">>> chess repository service");
	}

	public String createGame(final WebSocketSession sess) {
		String gid = writeLock(() -> {
			final Game game = new Game();
			game.addPlayer(sess);
			games.put(game.getGameId(), game);
			return game.getGameId();
		});
		return gid;
	}

	public void deleteGame(final String gid) {
		writeLock(() -> {
			final Game g = games.remove(gid);
			if (null == g)
				return;
			g.close();
		});
	}

	public void addPlayerToGame(final String gid, final WebSocketSession sess) {
		writeLock(() -> {
			final Game g = games.get(gid);
			if (null == g)
				return;
			g.addPlayer(sess);
		});
	}

	public List<String> getOpenGames() {
		return readLock(() -> {
			return games.values().stream()
				.filter(g -> !g.isStarted())
				.map(g -> g.getGameId())
				.toList();
		});
	}

	public <T> T readLock(Supplier<T> supp) {
		final Lock lock = rwLock.readLock();
		try {
			lock.lock();
			return supp.get();
		} finally {
			lock.unlock();
		}
	}

	private String writeLock(Supplier<String> supp) {
		final Lock lock = rwLock.writeLock();
		try {
			lock.lock();
			return supp.get();
		} finally {
			lock.unlock();
		}
	}

	private void writeLock(Runnable command) {
		final Lock lock = rwLock.readLock();
		try {
			lock.lock();
			command.run();
		} finally {
			lock.unlock();
		}
	}


}
