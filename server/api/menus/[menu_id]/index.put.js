import User from "~/server/models/User.model";
import Menu from "~~/server/models/Menu.model";
export default defineEventHandler(async (event) => {
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
		const user = await User.findOne({  email });
		isAdmin = user.isAdmin;
		console.log('is admin')
		// console.log('user', user)
	}catch (error){
		throw createError({ statusCode: 401, message: 'Invalid or expired token' });
	}
	// console.log(isAdmin)
	if(isAdmin){
		console.log('edit /api/menu/id')
		const body = await readBody(event);
			
		const id = event.context.params?.menu_id;
		// console.log('put', id)
		try {
			console.log("EDIT /api/menu/id")
			const res = await Menu.findByIdAndUpdate(id, body);
			if (!res) {
				throw createError({ statusCode: 404, message: 'Menu not found' });
			}
			return { message: "Menu "+body._id+" has been updated", res: res };
		} catch (e) {
			console.log(e)
		}
	}
	
});
