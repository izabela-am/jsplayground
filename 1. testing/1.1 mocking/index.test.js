const { rejects, deepStrictEqual } = require('assert');

const { constants } = require('./src/constants');
const { File } = require('./src/index');

(async () => {
  {
    const path = './mocks/populatedFile-invalid.csv';
    const reject = new Error(constants.error.INVALID_FILE_LENGTH);
    const response = File.csvToJson(path);

    await rejects(response, reject);
  }
  {
    const path = './mocks/headerless-invalid.csv';
    const reject = new Error(constants.error.INVALID_FILE_FIELDS);
    const response = File.csvToJson(path);

    await rejects(response, reject);
  }
  {
    const path = './mocks/emptyFile-invalid.csv';
    const reject = new Error(constants.error.INVALID_FILE_LENGTH);
    const response = File.csvToJson(path);

    await rejects(response, reject);
  }
  {
    const path = './mocks/populatedFile-valid.csv';
    const response = await File.csvToJson(path);
    const expected = [
      {
        "id": 123,
        "name": "Izabela",
        "profession": "Software Engineer",
        "birthDate": 1998
      },
      {
        "id": 456,
        "name": "Chiclete",
        "profession": "Doggo",
        "birthDate": 2018
      },
      {
        "id": 789,
        "name": "Hermione",
        "profession": "Wizard",
        "birthDate": 2004
      }
    ];

    deepStrictEqual(JSON.stringify(response), JSON.stringify(expected));
  }
})();