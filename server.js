import http from "http";
import path from "path";
import url from "url";
import fs from "fs/promises";
const PORT = process.env.PORT || 3000;
const server = http.createServer(async (req, res) => {
	// res.setHeader("Content-Type", "text/html");
	// res.statusCode = 200;
	// res.writeHead(200, { "Content-Type": "application/json" });
	// res.end(JSON.stringify({ message: "hello world" }));
	const __filename = url.fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	try {
		if (req.method === "GET") {
			let filePath;
			if (req.url === "/") {
				filePath = path.join(__dirname, "public", "index.html");
			} else if (req.url === "/about") {
				filePath = path.join(__dirname, "public", "about.html");
			} else {
				throw new Error("Not found");
			}
			const data = await fs.readFile(filePath);
			res.setHeader("Content-Type", "text/html");
			res.write(data);
			res.end();
		} else {
			throw Error("Methid not allowed");
		}
	} catch (error) {
		console.log(error);

		res.writeHead(500, { "Content-Type": "text/plain" });
		res.end("Server error");
	}
});
server.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
