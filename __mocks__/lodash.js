const lodash = jest.genMockFromModule('lodash')
lodash.getName = ()=>'dd'
module.exports = lodash