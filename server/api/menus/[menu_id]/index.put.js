import Menu from "~~/server/models/Menu.model";
export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const id = event.context.params?.menu_id;
	console.log('put')
	try {
		console.log("EDIT /api/menu/id")
		const res = await Menu.findByIdAndUpdate(id, body);
		return { message: "Menu "+id+" has been updated", res: res };
	} catch (e) {
        console.log(e)
	}
});
