import mongoose, { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema<TUser>({
  id: {
    type: Number,
    required: [true, 'please add an ID for the User'],
  },
  fullname: {
    type: String,
    required: [true, 'please add a name for the User'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'please add an image URL'],
    trim: true,
  },
});

export default UserSchema;
