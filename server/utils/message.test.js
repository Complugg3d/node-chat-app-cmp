const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

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

describe('generateLocationMessage', () => {
  it('should generate correct location message', () => {
    var from = 'Erick';
    var lat = 1;
    var lng = 2;
    var url = `https://www.google.com/maps?q=${lat},${lng}`;
    var location = generateLocationMessage(from, lat, lng);

    expect(location.createdAt).toBeA('number');
    expect(location).toInclude({
      from,
      url
    });
  });
});
