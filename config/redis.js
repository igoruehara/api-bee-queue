// const redis = require("redis");

// const client = redis.createClient();

// client.get("allpersons", function(err, reply) {
// 	if (reply) {
// 		console.log("redis");
// 		console.log(reply);
// 	} else {
// 		console.log("db");

// 		client.set("allpersons", JSON.stringify({ teste: "teste" }));
// 		client.expire("allpersons", 20);
// 	}
// });

module.exports = {
	port: 6379,
	host: "redisTestee"
};
