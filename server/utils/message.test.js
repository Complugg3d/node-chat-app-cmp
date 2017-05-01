const expect = require('expect');
const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Erick';
    var text = 'Hello';
    var res = generateMessage(from, text);
    expect(res.from).toBe('Erick');
    expect(res.text).toBe('Hello');
    expect(res.createdAt).toBeA('number');
  });
});
