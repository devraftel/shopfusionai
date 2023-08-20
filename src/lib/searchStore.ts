export const getProducts = async (url: string) => {
  const response = await fetch(url);
  const products = await response.json();
  return products;
};

function isArray(value: unknown): value is Array<any> {
  return Array.isArray(value);
}

export const searchStore = async (query: string, storeApi: string) => {
  const dataa = (await getProducts(storeApi)) as any;

  const data = isArray(dataa) ? dataa : dataa.products;

  const lowerQuery = query.toLowerCase();

  const results = data.filter((product: any) =>
    product.title.toLowerCase().includes(lowerQuery)
  );

  return results;
};
