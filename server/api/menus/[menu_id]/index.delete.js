import Menu from "~~/server/models/Menu.model";
import User from "~/server/models/User.model";
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
		// console.log(email)
		if(email===config.ADMIN_EMAIL){
			const user = await User.findOne({  email });
			isAdmin = user.isAdmin;
		}
		// console.log('user', user)
	}catch (error){
		throw createError({ statusCode: 401, message: 'Invalid or expired token' });
	}
	if(isAdmin){
		const id = event.context.params?.menu_id;
		try {
			console.log("DELETE /api/menu/id")
			const res = await Menu.findByIdAndDelete(id);
			return { message: "Menu "+id+" has been deleted", res: res };
		} catch (e) {
			console.log(e)
		}
	}
});
