import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import Image from 'next/image'
import Link from 'next/link'

async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api('/products/featured')

  const products = await response.json()

  return products
}

export default async function Home() {
  const [highlightedProduct, ...otherProducts] = await getFeaturedProducts()

  return (
    <div className="grid max-h-[920px] grid-rows-6 grid-cols-9  gap-6">
      <Link
        href={`/product/${highlightedProduct.slug}`}
        className="col-span-6 group relative row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex items-end justify-center"
      >
        <Image
          src={highlightedProduct.image}
          width={860}
          height={860}
          quality={100}
          alt=""
          className="group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">{highlightedProduct.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {highlightedProduct.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>
      {otherProducts.map((product) => {
        return (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="col-span-3 relative group row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex items-end justify-center"
          >
            <Image
              src={product.image}
              width={860}
              height={860}
              quality={100}
              alt=""
              className="group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
              <span className="text-sm truncate">{product.title}</span>
              <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
                })}
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
