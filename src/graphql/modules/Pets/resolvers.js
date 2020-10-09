import Pet from '../../../models/Pet';
import Person from '../../../models/Person';

export default {
  Pet:{   
    owner: (pet) => Person.findById(pet.owner),
  },

  Query: {
    pets: () => Pet.find(),
    pet: (_, { id }) => Pet.findById(id),
  },

  Mutation: {
    createPet: (_, { data }) => Pet.create(data),
    updatePet: (_, { id, data }) => Pet.findOneAndUpdate(id, data, { new: true }),
    deletePet: async (_, { id }) => {
      const deleted = await Pet.findOneAndDelete(id);
      return !!deleted;
    },
  },
};
