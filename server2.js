import { createServer } from "http";
const PORT = process.env.PORT || 3000;
let users = [
	{
		id: 1,
		name: "amin",
	},
	{
		id: 2,
		name: "kasra",
	},
	{
		id: 3,
		name: "hamed",
	},
];
const loger = (req, res, next) => {
	console.log(`${req.method} ${req.url}`);
	next();
};
const server = createServer((req, res) => {
	loger(req, res, () => {
		if (req.url === "/api/users" && req.method === "GET") {
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify(users));
		}
		if (req.url.match(/\api\/users\/([0-9]+)/) && req.method === "GET") {
			const id = req.url.split("/")[3];
			const user = users.find((user) => user.id === parseInt(id));
			if (user) {
				res.writeHead(200, { "Content-Type": "application/json" });
				res.end(JSON.stringify(user));
			} else {
				res.writeHead(404, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ message: "user not found" }));
			}
		}
	});
});

server.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
