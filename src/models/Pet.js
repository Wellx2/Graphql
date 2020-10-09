import mongoose from 'mongoose';

const PetSchema = new mongoose.Schema({
  
  petName: {
    type: String,
    required: true,
  },
  
  breed: {
    type: String,
    required: true,
  },

  color: {
    type: String,
    required: true,
  },

  size: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
    required: true,
   }

});

export default mongoose.model('Pet', PetSchema,'Pet');