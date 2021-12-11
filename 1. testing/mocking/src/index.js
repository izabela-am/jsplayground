const { readFile } = require('fs/promises');

const { User } = require('./user');
const { constants } = require('./constants');

const DEFAULT = {
  maxLines: 3,
  fields: ['id', 'name', 'profession', 'age']
};

class File {
  static async csvToJson(path) {
    const fileContent = await File.getFileContent(path);

    const validation = File.isFileValid(fileContent);

    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const users = File.parse(fileContent);

    return users;
  }

  static async getFileContent(path) {
    return (await readFile(path)).toString('utf8');
  }

  static isFileValid(csv, options = DEFAULT) {
    const [header, ...content] = csv.split('\n');

    const isHeaderValid = header.trim() === options.fields.join(',').trim();

    if (!isHeaderValid) {
      return {
        error: constants.error.INVALID_FILE_FIELDS,
        valid: false
      }
    }

    const isContentValid = (
      content.length > 0 &&
      content.length <= options.maxLines
    );

    if (!isContentValid) {
      return {
        error: constants.error.INVALID_FILE_LENGTH,
        valid: false
      }
    }

    return { valid: true };
  }

  static parse(csvString) {
    const lines = csvString.trim().split('\r\n');
    const firstLine = lines.shift();
    const header = firstLine.split(',');

    const users = lines.map(line => {
      const columns = line.split(',');
      let user = {};

      for (const index in columns) {
        user[header[index]] = columns[index];
      }

      return new User(user);
    });
    // console.log(users);
    return users;
  }
}

module.exports = { File };