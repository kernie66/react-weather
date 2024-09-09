import { experimental_createPersister } from '@tanstack/query-persist-client-core';

export default function queryPersister(
  maxAge,
  prefix = 'weather-query'
) {
  let maxAgeSetting = 1000 * 60 * 60 * 24 * 10; // 10 days default

  if (Number(maxAge)) {
    maxAgeSetting = Number(maxAge);
  }

  return experimental_createPersister({
    storage: window.localStorage,
    maxAge: maxAgeSetting,
    prefix: prefix,
  });
}
