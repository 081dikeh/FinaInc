import PageTitle from "../../components/layout/PageTitle"
import { Plus, Package, CheckCircle } from "lucide-react"
import StatCard from "../../components/layout/StatCard"
import iconBadge1 from "../../assets/ecommercepage-assets/Icon Badge1.png"
import iconBadge2 from "../../assets/ecommercepage-assets/Icon Badge2.png"
import iconBadge3 from "../../assets/ecommercepage-assets/Icon Badge3.png"
import iconBadge4 from "../../assets/ecommercepage-assets/Icon Badge4.png"

const AddProductBtn = () => (
    // function to add product    
    <button
        className="flex items-center gap-2 bg-primary-light text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
    > 
        <Plus /> 
        Add Product
    </button>
    
)

const FilterBtn = ({ title }) => (
    <button
        className="text-brand-200">
        {title}
    </button>
)
const productStatData = [
    {
        title: "Total Products",
        titleIcon: iconBadge1,
        value: "6,650",
        isPositive: true,
        change: "+8%",
    },
    {
        title: "Published",
        titleIcon: iconBadge2,
        value: "1,100",
        isPositive: false,
        change: "+5%",
    },
    {
        title: "In Draft",
        titleIcon: iconBadge4,
        value: "$1,250",
        isPositive: true,
        change: "+8%",
    },
    {
        title: "Out of Stock",
        titleIcon: iconBadge3,
        value: "1,100",
        isPositive: true,
        change: "+5%",
    }
]


const Product = () => {
  return (
    <section className="w-full min-w-7xl font-Geist">
        <div className="flex justify-between items-end mb-6">
            <PageTitle title="Product" navigationRoute="Ecommerce / Product" />
            <AddProductBtn />
        </div>

        <div className="grid grid-cols-4 gap-4">
            {productStatData.map((stat, index) => (
                <div key={index}>
                    <StatCard {...stat} />
                </div>
            ))}
        </div>

        <div className="flex gap-4 mt-6 font-semibold text-sm text-brand-500">
            <FilterBtn title="All Status" />
            <FilterBtn title="Published" />
            <FilterBtn title="Out of Stock" />
            <FilterBtn title="Draft" />
        </div>

    </section>
  )
}

export default Product