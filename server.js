import http from "http";
const PORT = 8001;
const server = http.createServer((req, res) => {
	res.setHeader("Content-Type", "text/html");
	res.end('hieewiri wjfioj weiofj weio ');
});
server.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
