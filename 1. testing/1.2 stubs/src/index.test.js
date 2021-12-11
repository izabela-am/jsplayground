const sinon = require('sinon');

const tatooine = require('../mocks/tatooine.json');
const alderaan = require('../mocks/alderaan.json');

const { Service } = require('./index');
const { deepStrictEqual } = require('assert');

const apiUrl1 = 'https://swapi.dev/api/planets/1/';
const apiUrl2 = 'https://swapi.dev/api/planets/2/';

(async () => {
  const service = new Service();
  const stub = sinon.stub(service, service.makeRequest.name);

  stub.withArgs(apiUrl1).resolves(tatooine);
  stub.withArgs(apiUrl2).resolves(alderaan);

  {
    const expected = {
      name: 'Tatooine',
      diameter: '10465',
      appearedIn: 5
    }

    const response = await service.getPlanet(apiUrl1);

    deepStrictEqual(response, expected);
  }
  {
    const expected = {
      name: 'Alderaan',
      diameter: '12500',
      appearedIn: 2
    }

    const response = await service.getPlanet(apiUrl2);

    deepStrictEqual(response, expected);
  }
})();