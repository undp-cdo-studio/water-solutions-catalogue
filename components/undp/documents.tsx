import { DownloadIcon, ExternalLinkIcon } from "lucide-react"

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  // More products...
]

export default function Example({documents}:{documents:string[]}) {
  return (
    <div className="grid place-items-center">
      <div className="mx-auto max-w-2xl px-4 py-4 lg:max-w-6xl lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Documents</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-gray-300 border-2 border-gray-200">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-none bg-gray-200 lg:aspect-none  lg:h-80">
                <img
                  alt={product.imageAlt}
                  src={"/assets/publication.svg"}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="px-2 py-4 flex justify-between flex-align items-center ">
                <div>
                  <h3 className="text-sm">
                    <a href={product.href} className="inline-flex items-center font-bold ">
                      <span aria-hidden="true" className="absolute inset-0 " />
                       DOWNLOAD
                       <DownloadIcon className="pl-2 text-undp-red"/>
                    </a>
                  </h3>
                </div>
                <p className="text-sm font-bold inline-flex items-center hover:opacity-50">
                  READ MORE
                  <ExternalLinkIcon className="pl-2 text-undp-red"/>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
