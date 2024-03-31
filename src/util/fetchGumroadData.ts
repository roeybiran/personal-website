export default async function fetchGumroadData(gumroadID: string): Promise<{ price: string, purchaseURL: string }> {
  const {
    product: { formatted_price: price, short_url: purchaseURL },
  } = await fetch(`https://api.gumroad.com/v2/products/${gumroadID}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.GUMROAD_ACCESS_TOKEN}`,
    },
  }).then((v) => v.json());
  return  { price, purchaseURL }
}
