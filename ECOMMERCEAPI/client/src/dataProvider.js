import { stringify } from 'query-string';
import { fetchUtils } from 'react-admin';

const apiUrl = 'http://localhost:5000/api'; // Update with your API URL

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  // Add your custom headers if needed
  // options.headers.set('Custom-Header', 'custom-value');

  return fetchUtils.fetchJson(url, options);
};

const dataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json.map(resource => ({ ...resource, id: resource._id })),
      total: parseInt(headers.get('content-range').split('/').pop(), 10),
    }));
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: { ...json, id: json._id },
    })),

  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ json }) => ({
      data: json.map(resource => ({ ...resource, id: resource._id })),
    }));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json.map(resource => ({ ...resource, id: resource._id })),
      total: parseInt(headers.get('content-range').split('/').pop(), 10),
    }));
  },

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...json, id: json._id },
    })),

  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json._id },
    })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
    }).then(({ json }) => ({
      data: { ...json, id: json._id },
    })),

  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: 'DELETE',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },
};

export default dataProvider;
