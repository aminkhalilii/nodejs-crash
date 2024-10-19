import http from "http";
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
	// res.setHeader("Content-Type", "text/html");
	// res.statusCode = 200;
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(JSON.stringify({ message: "hello world" }));
});
server.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
