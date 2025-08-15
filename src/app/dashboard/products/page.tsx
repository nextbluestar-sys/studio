import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { products } from "@/lib/data"
  import { Camera, ShieldCheck, Siren, PhoneCall, Video } from "lucide-react"
  
  const productIcons: { [key: string]: React.ReactNode } = {
    "prod-001": <Camera className="h-8 w-8 text-primary" />,
    "prod-002": <ShieldCheck className="h-8 w-8 text-primary" />,
    "prod-003": <Siren className="h-8 w-8 text-primary" />,
    "prod-004": <PhoneCall className="h-8 w-8 text-primary" />,
    "prod-005": <Video className="h-8 w-8 text-primary" />,
  }
  
  export default function ProductsPage() {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Browse and manage company products.
          </p>
        </div>
  
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
                {productIcons[product.id]}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }
  