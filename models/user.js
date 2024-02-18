import mongoose from 'mongoose';
import { models } from 'mongoose';
const userSchema = new mongoose.Schema(
	{
		fullname: {
			type: String,
			required: [true, 'fullname is required'],
		},
	},
	{
		email: {
			type: String,
			required: [true, 'email is required'],
			unique: true,
		},
	},
	{
		city: { type: String, required: [true, 'city is required'] },
	},
	{
		username: {
			type: String,
			required: [true, 'address is required'],
		},
	},
	{ password: { type: String, required: true } },
	{ timestamps: true },
);
const User = models.User || mongoose.model('User', userSchema);

export default User;
