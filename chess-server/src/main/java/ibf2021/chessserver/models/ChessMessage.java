package ibf2021.chessserver.models;

import jakarta.json.Json;
import jakarta.json.JsonObjectBuilder;

import static ibf2021.chessserver.Constants.*;

public class ChessMessage {

	private final String cmd;
	private final String gid;
	private String src;
	private String dst;

	public ChessMessage(String cmd, String gid) {
		this.cmd = cmd;
		this.gid = gid;
	}

	public String getGameId() { return this.gid; }
	public String getCommand() { return this.cmd; }

	public void setSrc(String src) { this.src = src; }
	public String getSrc() { return this.src; }

	public void setDst(String dst) { this.dst = dst; }
	public String getDst() { return this.dst; }

	public static ChessMessage createNewGame(String gid) {
		final ChessMessage m = new ChessMessage(CMD_NEW, gid);
		return m;
	}

	public String toJson() {
		final JsonObjectBuilder builder = Json.createObjectBuilder();
		builder.add(MSG_ATTR_CMD, this.cmd);

		return switch (this.cmd) {
			case CMD_NEW -> 
				builder.add(MSG_ATTR_GID, this.gid).build().toString();

			default -> 
				throw new IllegalArgumentException("Unknow message command: %s".formatted(this.cmd));
		};
	}
}
