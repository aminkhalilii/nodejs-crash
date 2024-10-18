import http from "http";
const PORT = 8001;
const server = http.createServer((req, res) => {
	res.write("Hello World");
	res.end();
});
server.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
