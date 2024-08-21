const httpRequest = jest.fn(() =>
    Promise.resolve({
      status: ``,
      data: []
    })); //to be assigned
    export default httpRequest;