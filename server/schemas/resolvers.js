
import { User, Chat } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('history');
      }
      throw AuthenticationError;
    },
    chat: async (parent, { _id }, context) => {
      if (context.user) {
        return Chat.findById(_id)
      }
      throw AuthenticationError
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      // First we create the user
      const user = await User.create({ username, email, password });
      // To reduce friction for the user, we immediately sign a JSON Web Token and log the user in after they are created
      const token = signToken(user);
      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      // Looks up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
      const user = await User.findOne({ email });

      // If there is no user with that email address, return an Authentication error stating so
      if (!user) {
        throw AuthenticationError
      }

      // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, return an Authentication error stating so
      if (!correctPw) {
        throw AuthenticationError
      }

      // If email and password are correct, sign user into the application with a JWT
      const token = signToken(user);

      // Returns an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },
    createChat: async (parent, args, context) => {
      console.log('user', context.user);
      if (context.user) {
        // this function creates the new chat
        const chat = await Chat.create({
          username: context.user.username
        })

// Then the new chat ID is stored in the users account
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { history: chat._id } },
          { new: true }
        )

        return chat

      }
      throw AuthenticationError;
    },
    createResponse: async (parent, args, context) => {
      if (context.user) {
        const openai =  new OpenAI({
          apiKey: process.env.OPEN_AI_APIKEY, // Defaults to process.env["OPENAI_API_KEY"]
        });
       
        
        const userResponseObj = {
          responseText: args.responseText,
          username: args.username,
        };      
        
        
        // Sends api call to chatgpt service, when the response is returned we will grab the response and update the chat again
        
        
        
        const userResponse = await Chat.findByIdAndUpdate(
          { _id: args.chatId }, //References Chat Id
          { $push: { responses: userResponseObj } }, // References the entire Response object, including the Id. Separated out as an object intentionally to avoid confusion with chat Id
          { new: true }
          );
          
          const chat =  await Chat.findOne({_id: args.chatId});
          
          // Loop through all the responses and create an array that gets passed into messages which should display all of the previous conversations in the new query
          const newResponseArray = chat.responses?.map((item)=> {
            console.log(item);
            let user;
            if(item.username === 'Code-Bot'){
              user = 'assistant'
            }else{
              user = 'user'
            }
            
            const newObj = {
              role: user,
              content: item.responseText
            }
            return newObj
          }) 
        
        // console.log('new respone',newResponseArray);
        
        const chatCompletion = await openai.chat.completions.create({
          messages:  newResponseArray,
          model: 'gpt-3.5-turbo',
        });
        
        const chatResponseObj = {
            responseText: chatCompletion.choices[0].message.content, //chat response
            username: 'Code-Bot'
          };

        const apiResponse = await Chat.findByIdAndUpdate(
            { _id: args.chatId }, //References Chat Id
            { $push: { responses: chatResponseObj } }, // References the entire Response object, including the Id. Separated out as an object intentionally to avoid confusion with chat Id
            { new: true }
          );
        
        return apiResponse
      }
      throw AuthenticationError;
    }
  },
};

export default resolvers;
