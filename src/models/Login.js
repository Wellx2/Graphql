import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const LoginSchema = new mongoose.Schema({
  
  email:{
    type:String,
    required:true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  CreatePets: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
  }
  
});

LoginSchema.pre('save', async function(next){
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
}); 

export default mongoose.model('Login', LoginSchema,'Login');