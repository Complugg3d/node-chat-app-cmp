const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject non string values', () => {
    var value = 56;
    var res = isRealString(value);
    expect(res).toBe(false);
  });

  it('should reject string with only spaces', () => {
    var value = '     ';
    var res = isRealString(value);
    expect(res).toBe(false);
  });

  it('should allow string with non-spaces chars', () => {
    var value = 'something';
    var res = isRealString(value);
    expect(res).toBe(true);
  });
});
