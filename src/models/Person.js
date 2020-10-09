import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const PersonSchema = new mongoose.Schema({
  
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  cpf: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

});

PersonSchema.pre('save', async function(next){
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
}); 

export default mongoose.model('Person', PersonSchema,'Person');