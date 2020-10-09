import Person from '../../../models/Person';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import authConfig from '../../../config/auth'
const { UserInputError, AuthenticationError } = require('apollo-server');

const getToken = ({id, email}) => jwt.sign({ id, email },authConfig.secret,{
  expiresIn: '7d'
});

export default {
  Person: {
    fullName: (user) => `${user.firstName} ${user.lastName}`,
  },

  Query: {
    persons: () => Person.find(),
    person: (_, { id }) => Person.findById(id),
  },
   
  Mutation: {
    createPerson: async (_, { data }) => {
      const personCreate = await Person.create(data);
      const token = getToken(personCreate);
      return {
        id: personCreate._id,
        ...personCreate._doc,
        token
      };
    },

    updatePerson: async (_, { id, data }) => {
      const personUpdate = await Person.findOneAndUpdate(id, data, { new: true });
      return personUpdate;
    },
  
    deletePerson: async (_, { id }) => {
      const deleted = await Person.findOneAndDelete(id);
      return !!deleted;
    },

    login: async (_, { email, password }) => {
      
      const { errors, valid } = validateLogin(person.password, password);
      if (!valid) throw new UserInputError('Error', { errors });

      const user = await Person.findOne({email});
      if(!user) {
        throw new AuthenticationError('this user is not found!');
      }
      const isEqual = await bcrypt.compare(password, user.password);
  
      if(!isEqual){
        throw new AuthenticationError('Password is incorrect!');
      }

      const token = getToken(user);
      
      return { 
        id: user.id,
        ...user.doc, 
        token 
      };
    },
  },
};


   
  

