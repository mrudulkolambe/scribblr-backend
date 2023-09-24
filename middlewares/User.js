const jwt = require("jsonwebtoken");

const VerifyUserToken = async (req, res, next) => {
	try {
		const token = req.headers["authorization"]?.split(" ")[1];
		if(token){
			const data = await jwt.verify(token, process.env.JWT_SECRET);
			if(data && data.role === "user"){
				req["user"] = data
				next()
			}else{
				return res.json({
					error: true,
					message: "Unauthorized Access"
				})
			}
		}else{
			return res.json({
				error: true,
				message: "Unauthorized Access"
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message
		})
	}
}

module.exports = VerifyUserToken