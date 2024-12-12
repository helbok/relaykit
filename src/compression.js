'use strict';

const zlib = require('zlib');

const MIN_COMPRESS_BYTES = 256;
const COMPRESSION_LEVEL = 4;

function compress(text) {
  const input = Buffer.from(text, 'utf8');
  if (input.length < MIN_COMPRESS_BYTES) return text;
  return zlib.gzipSync(input, { level: COMPRESSION_LEVEL }).toString('base64');
}

function compressedSize(text) {
  return compress(text).length;
}

function decompress(packed) {
  if (typeof packed !== 'string' || packed.length === 0) return packed;
  try {
    return zlib.gunzipSync(Buffer.from(packed, 'base64')).toString('utf8');
  } catch (err) {
    return packed;
  }
}

module.exports = { compress, decompress, MIN_COMPRESS_BYTES, COMPRESSION_LEVEL };
