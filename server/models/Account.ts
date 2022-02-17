import mongoose, { Schema } from "mongoose";

const AccountSchema = new Schema<TAccount>({
  email: {
    type: String,
    required: [true, "please add a valid email address"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "please use a valid password"],
    trim: true,
  },
  phone_number: {
    type: String,
    required: [true, "please enter a valid phone number"],
    trim: true,
  },
});

export default AccountSchema;
