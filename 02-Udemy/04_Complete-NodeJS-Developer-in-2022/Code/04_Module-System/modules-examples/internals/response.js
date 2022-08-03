const decrypt = data => {
  return 'decrypted data';
};

const read = data => {
  return decrypt(data);
};

module.exports = {read};
