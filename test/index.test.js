const chai = require('chai');
const expect = chai.expect;

const RTPServer = require('../');

describe('RTP Server', () => {
  describe('Constructor', () => {
    it('should set port and reorder', () => {
      const s = new RTPServer(8282, 123);
      expect(s._port).to.equal(8282);
      expect(s._reorder).to.equal(123);
    });

    it('should setup a default error function', () => {
      const s = new RTPServer(8282, 123);
      expect(typeof s._onError).to.equal('function');
    });
  });


});
