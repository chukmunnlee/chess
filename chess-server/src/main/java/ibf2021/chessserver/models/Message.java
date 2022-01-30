package ibf2021.chessserver.models;

import jakarta.json.Json;
import jakarta.json.JsonObjectBuilder;

import static ibf2021.chessserver.Constants.*;

public class Message {

	private final String cmd;
	private final String gid;

	public Message(String cmd, String gid) {
		this.cmd = cmd;
		this.gid = gid;
	}

	public String getGameId() { return this.gid; }
	public String getCommand() { return this.cmd; }

	public static Message createNewGame(String gid) {
		final Message m = new Message(CMD_NEW, gid);
		return m;
	}

	public String toJson() {
		final JsonObjectBuilder builder = Json.createObjectBuilder();
		builder.add(MSG_ATTR_CMD, this.cmd);

		return switch (this.cmd) {
			case CMD_NEW -> builder.add(MSG_ATTR_GID, this.gid).build().toString();
			default -> throw new IllegalArgumentException("Unknow message command: %s".formatted(this.cmd));
		};
	}
}
