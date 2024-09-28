const mockMongoose = {
  connect: jest.fn().mockResolvedValue(undefined),
  connection: {
      on: jest.fn(),
      once: jest.fn(),
      close: jest.fn(),
  },
  model: jest.fn().mockReturnValue({
      create: jest.fn().mockResolvedValue({
          _id: 'mockedTransactionId',
          amount: 100,
          status: 'processed',
          // Add other fields as necessary
      }),
      find: jest.fn().mockResolvedValue([
          {
              _id: 'mockedTransactionId1',
              amount: 100,
              status: 'processed',
          },
          {
              _id: 'mockedTransactionId2',
              amount: 50,
              status: 'refunded',
          },
      ]),
      findById: jest.fn().mockResolvedValue({
          _id: 'mockedTransactionId',
          amount: 100,
          status: 'processed',
      }),
      // Add other methods as necessary
  }),
};

export default mockMongoose;