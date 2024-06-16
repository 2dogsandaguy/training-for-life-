const { User, Journal, Bill, Investment } = require("../models");
const bcrypt = require("bcrypt");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .populate("journals")
          .populate("bills")
          .populate("investments")
          .select("-__v -password");
        console.log("User Data:", userData);
        return userData;
      }
      throw new AuthenticationError();
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError();
      }
      const correctPw = await bcrypt.compare(password, user.password);
      if (!correctPw) {
        throw new Error("AuthenticationError: incorrect password");
      }

      const token = signToken(user);
      return { token, user };
    },
    setJournal: async (_, { journal, createdAt }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not authenticated");
      }

      try {
        const journalEntry = await Journal.create({ journal, createdAt });
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $push: { journals: journalEntry._id } },
          { new: true }
        ).populate("journals");
        return updatedUser;
      } catch (error) {
        console.error("Error setting journal:", error);
        throw new Error("Error setting journal");
      }
    },
    deleteJournal: async (_, { journalId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not authenticated");
      }

      try {
        await Journal.findByIdAndDelete(journalId);
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { journals: journalId } },
          { new: true }
        ).populate("journals");
        return updatedUser;
      } catch (error) {
        console.error("Error deleting journal:", error);
        throw new Error("Error deleting journal");
      }
    },
    setBill: async (parent, { category, customCategory, amount, date }, context) => {
      if (context.user) {
        const newBill = await Bill.create({
          category,
          customCategory,
          amount,
          date,
          userId: context.user._id,
        });

        await User.findByIdAndUpdate(context.user._id, { $push: { bills: newBill._id } });
        
        return newBill;
      }
      throw new AuthenticationError('Not logged in');
    },
    deleteBill: async (parent, { billId }, context) => {
      if (context.user) {
        const bill = await Bill.findById(billId);
        if (bill.userId.toString() !== context.user._id) {
          throw new AuthenticationError('Not authorized');
        }
        await Bill.findByIdAndDelete(billId);
        await User.findByIdAndUpdate(context.user._id, { $pull: { bills: billId } });

        return bill;
      }
      throw new AuthenticationError('Not logged in');
    },
    setInvestment: async (parent, { type, url, amount, date }, context) => {
      if (context.user) {
        try {
          const newInvestment = await Investment.create({
            type,
            url,
            amount,
            date,
            userId: context.user._id,
          });

          await User.findByIdAndUpdate(context.user._id, { $push: { investments: newInvestment._id } });
          
          return newInvestment;
        } catch (error) {
          console.error("Error saving investment entry:", error);
          throw new ApolloError('Error saving investment entry');
        }
      }
      throw new AuthenticationError('Not logged in');
    },
    deleteInvestment: async (parent, { investmentId }, context) => {
      if (context.user) {
        const investment = await Investment.findById(investmentId);
        if (investment.userId.toString() !== context.user._id) {
          throw new AuthenticationError('Not authorized');
        }
        await Investment.findByIdAndDelete(investmentId);
        await User.findByIdAndUpdate(context.user._id, { $pull: { investments: investmentId } });

        return investment;
      }
      throw new AuthenticationError('Not logged in');
    },
  },
};

module.exports = resolvers;
