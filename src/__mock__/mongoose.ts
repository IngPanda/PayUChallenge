// __mocks__/mongoose.ts
const mockMongoose = {
    connect: jest.fn().mockResolvedValue(undefined),
    connection: {
      on: jest.fn(),
      once: jest.fn(),
      close: jest.fn(),
    },
    model: jest.fn().mockReturnValue({
      create: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
    }),
  };
  
  export default mockMongoose;