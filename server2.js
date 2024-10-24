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
// logger middleware
const logger = (req, res, next) => {
	console.log(`${req.method} ${req.url}`);
	next();
};
// json middleware
const jsonMiddleware = (req, res, next) => {
	res.setHeader('Content-Type','application/json')
	next();
}
const server = createServer((req, res) => {
	logger(req, res, () => {
		jsonMiddleware(req, res, () => {
			if (req.url === "/api/users" && req.method === "GET") {
				res.end(JSON.stringify(users));
			}
			if (req.url.match(/\api\/users\/([0-9]+)/) && req.method === "GET") {
				const id = req.url.split("/")[3];
				const user = users.find((user) => user.id === parseInt(id));
				if (user) {
					res.end(JSON.stringify(user));
				} else {
					res.statusCode = 404;
					res.end(JSON.stringify({ message: "user not found" }));
				}
			}
		});
	});
});

server.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
