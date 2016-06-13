/**
 * RTP Server lib
 */

const dgram = require('dgram');

    const server = dgram.createSocket('udp4');


class RTPServer {

  /**
   * Constructor
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {integer} port    Port to listen to
   * @param  {integer} reorder How 'long' the buffer should be (in milliseconds)
   *                           The higher value, the more accurate the packet
   *                           order will be.
   * @return {RTPServer}       Self
   */
  constructor(port, reorder = 100) {
    this._port = port;
    this._reorder = reorder;

    this._buffer = new Buffer([0, 1, 2]);

    this._server = null;

    // Events
    this._onError = () => {};
  }

  /**
   * Starts the server by binding the events and listening to port
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {void}
   */
  listen() {
    this._server = dgram.createSocket('udp4');

    // Handle errors
    this._server.on('error', err => {
      this._onError(err);
    });

    // Handle incoming data
    this._server.on('message', (msg, rinfo) => {
      console.log(`Server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
      this._onData(msg);
    });

    // For debugging
    this._server.on('listening', () => {
      const address = this._server.address();
      console.log(`Server listening ${address.address}:${address.port}`);
    });

    this._server.bind(this._port);
  }

  /**
   * Gets executed whenever there is new incoming data
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {Buffer} data Incoming data
   * @return {void}
   */
  _onData(data) {
    console.log(`Got incoming: ${data}`);
  }

  /**
   * Subscribe to errors in the stream
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {Function}  cb Callback method
   * @return {RTPServer}    Self
   */
  onError(cb) {
    this._onError = cb;
    return this;
  }


  /**
   * Subscribe to the RTP data stream
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {Buffer} Data buffer
   */
  subscribe() {
    /**
     * Treat the buffer as a queue, when new packets come in, push out the
     * oldest (order the ones in the buffer by RTP seq number).
     */
  }
}

module.exports = RTPServer;
