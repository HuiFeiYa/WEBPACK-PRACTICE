const mockAxios = jest.genMockFromModule('axios');

// this is the key to fix the axios.create() undefined error!
mockAxios.create = jest.fn(() => mockAxios);
mockAxios.get = jest.fn(() => Promise.resolve({ data: {} }));
mockAxios.post = jest.fn(() => Promise.resolve({ data: {} }));
mockAxios.put = jest.fn(() => Promise.resolve({ data: {} }));
mockAxios.delete = jest.fn(() => Promise.resolve({ data: {} }));
mockAxios.all = jest.fn(() => Promise.resolve());
// mockAxios.interceptors={
//           response:{
//             use:jest.fn()
//           },
//           request:{
//             use:jest.fn()
//           }
//         }
console.log('inner' , mockAxios)
module.exports = mockAxios