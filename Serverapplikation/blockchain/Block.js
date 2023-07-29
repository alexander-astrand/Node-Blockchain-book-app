// block.js
const crypto = require('./hash');
const GENESIS_DATA = require('./config');
const BookData = require('./books');

class Block {
  constructor({ timestamp, data, hash, lastHash }) {
    this.timestamp = timestamp;
    this.data = new BookData(data); // Create an instance of BookData here
    this.hash = hash;
    this.lastHash = lastHash;
  }

  static genesis() {
    return new this({
      timestamp: GENESIS_DATA.timestamp,
      lastHash: GENESIS_DATA.lastHash,
      data: new BookData( {
        title: 'Book of Genesis',
        author: 'Moses',
        pages: 232
      }),
      hash: GENESIS_DATA.hash,
    });
  }

  static mineBlock({ lastBlock, data }) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    return new this({
      timestamp,
      lastHash,
      data: new BookData(data), // Create an instance of BookData here
      hash: crypto(timestamp, lastHash, data),
    });
  }

}

module.exports = Block;
