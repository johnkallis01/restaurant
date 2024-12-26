import  User  from '~~/server/models/User.model';
import bcrypt from 'bcrypt';
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { firstName, lastName, phone, email, password } = body
  if (!email || !password || !firstName || !lastName || !phone ) {
    throw createError({ statusCode: 400, message: 'All fields are required' })
  }

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    console.log('user exists')
    throw createError({
      statusCode: 409,
      statusMessage: "user already exists" 
    })
  }

  // Hash the password using the hashPassword utility from @nuxt/auth-utils
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = new User({ firstName, lastName, phone, email, password: hashedPassword })
  await newUser.save()

  return { message: 'User registered successfully', exists: false }
})