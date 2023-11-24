import data from './data.json'

export function GET() {
  const featuredProducts = data.products.filter(
    (product) => product.featured === true,
  )

  return Response.json(featuredProducts)
}
