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
	res.setHeader("Content-Type", "application/json");
	next();
};
// Route handler for GET /api/users
const getUsershandler = (req, res) => {
	res.end(JSON.stringify(users));
};
// Route handler for GET /api/users/:id
const getUserByIdhandler = (req, res) => {
	const id = req.url.split("/")[3];
	const user = users.find((user) => user.id === parseInt(id));

	if (user) {
		res.end(JSON.stringify(user));
	} else {
		res.statusCode = 404;
		res.end(JSON.stringify({ message: "user not found" }));
	}
};
// Route handler Not Found
const notFoundHandler = (req, res) => {
	res.statusCode = 404;
	res.end(JSON.stringify({ message: "user not found" }));
};
//Route handler for Post /api/users
const createUserHandler = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
	});
	req.on("end", () => {
		const newUser = JSON.parse(body);
		users.push(newUser);
		res.statusCode = 201;
		res.end(JSON.stringify(newUser));
	});
};
const server = createServer((req, res) => {
	logger(req, res, () => {
		jsonMiddleware(req, res, () => {
			if (req.url === "/api/users" && req.method === "GET") {
				getUsershandler(req, res);
			} else if (req.url === "/api/users" && req.method === "POST") {
				createUserHandler(req, res);
			} else if (
				req.url.match(/\api\/users\/([0-9]+)/) &&
				req.method === "GET"
			) {
				getUserByIdhandler(req, res);
			} else {
				notFoundHandler(req, res);
			}
		});
	});
});

server.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
