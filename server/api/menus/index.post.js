import User from "~/server/models/User.model";
import Menu from "~~/server/models/Menu.model";
export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const authHeader = event.req.headers.authorization;
	if (!authHeader) {
		throw createError({ statusCode: 401, message: 'Unauthorized: No token provided' });
	}
	const token = authHeader.split(' ')[1];
	let isAdmin;
	try{
		const decoded = verifyToken(token);
		const {email} = decoded;
		// console.log(config.adminEmail)
		// console.log(email)
		if(email===config.adminEmail){
			const user = await User.findOne({  email });
			isAdmin = user.isAdmin;
		}
		console.log('is admin')
		
	}catch (error){
		throw createError({ statusCode: 401, message: 'Invalid or expired token' });
	}
	if(isAdmin){
		
		const body = await readBody(event);
		// console.log(token);
		try {
			console.log("POST /api/menu/")
			const response = await Menu.create(body);
			return { message: "Menu created", res: response };
		} catch (e) {
			console.log(e)
		}
	}
   
});
