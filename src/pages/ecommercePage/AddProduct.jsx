import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Video, X, Plus, Trash2 } from "lucide-react";
import PageTitle from "../../components/layout/PageTitle";
import { addProduct } from "../../data/ecomercemockData/poroductData";

const inputClass =
  "w-full px-4 py-2.5 border-2 border-[#E0E2E7] rounded-xl text-sm text-brand-500 focus:outline-none focus:ring-2 focus:ring-primary-light";
const labelClass = "text-sm font-semibold text-brand-400 mb-1.5 block";

const tabs = ["General", "Media", "Pricing", "Inventory", "Variation", "Shipping"];
const categories = ["Headphones", "Mouse", "Keyboard", "Watch", "Camera", "Smartphone", "Tablet", "Laptop"];

export default function AddProduct() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("General");
  const [thumbnail, setThumbnail] = useState(null);
  const [variants, setVariants] = useState([{ type: "", value: "", qty: "" }]);
  const [form, setForm] = useState({
    productName: "",
    description: "",
    basePrice: "",
    sku: "",
    quantity: "",
    category: categories[0],
    status: "Draft",
    isPhysical: true,
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const completion = useMemo(() => {
    const fields = [form.productName, form.description, form.basePrice, form.sku, form.quantity];
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  }, [form]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setThumbnail(URL.createObjectURL(file));
  };

  const updateVariant = (idx, field, value) => {
    setVariants((prev) =>
      prev.map((v, i) => (i === idx ? { ...v, [field]: value } : v))
    );
  };

  const addVariant = () =>
    setVariants((prev) => [...prev, { type: "", value: "", qty: "" }]);

  const removeVariant = (idx) =>
    setVariants((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.productName || !form.basePrice) return;
    addProduct({
      productName: form.productName,
      productImage: thumbnail,
      sku: form.sku,
      category: form.category,
      price: form.basePrice,
      stock: form.quantity,
      status: form.status,
    });
    navigate("/ecommerce/product");
  };

  const TabButton = ({ tab }) => (
    <button
      type="button"
      onClick={() => setActiveTab(tab)}
      className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
        activeTab === tab
          ? "text-primary-light border-primary-light"
          : "text-brand-300 border-transparent hover:text-brand-500"
      }`}
    >
      {tab}
    </button>
  );

  return (
    <section className="w-full min-w-7xl font-Geist pb-24">
      <div className="flex justify-between items-end mb-6">
        <PageTitle title="Add Product" navigationRoute="Product / Add Product" />
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/ecommerce/product")}
            className="flex items-center gap-2 border-2 border-[#E0E2E7] text-brand-400 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            <X size={18} />
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-primary-light text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      <div className="flex gap-4 border-b border-gray-100 mb-6">
        {tabs.map((tab) => (
          <TabButton key={tab} tab={tab} />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
        <div className="col-span-2 flex flex-col gap-6">
          {/* General */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-semibold text-brand-500">General Information</h3>
            <div>
              <label className={labelClass}>Product Name</label>
              <input
                className={inputClass}
                placeholder="Type product name here..."
                value={form.productName}
                onChange={handleChange("productName")}
              />
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                className={inputClass}
                rows={4}
                placeholder="Type product description here..."
                value={form.description}
                onChange={handleChange("description")}
              />
            </div>
          </div>

          {/* Media */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-semibold text-brand-500">Media</h3>
            <div>
              <label className={labelClass}>Photo</label>
              <label
                htmlFor="product-photo"
                className="border-2 border-dashed border-[#E0E2E7] rounded-xl flex flex-col items-center justify-center gap-2 py-8 cursor-pointer hover:border-primary-light transition-colors"
              >
                {thumbnail ? (
                  <img src={thumbnail} alt="Product" className="w-24 h-24 object-cover rounded-lg" />
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-brand-800 flex items-center justify-center text-primary-light">
                      <Image size={18} />
                    </div>
                    <p className="text-xs text-brand-100">
                      Drag and drop image here, or click add image
                    </p>
                  </>
                )}
                <span className="text-xs font-semibold text-primary-light bg-brand-800 px-4 py-2 rounded-lg mt-1">
                  + Add Image
                </span>
                <input
                  id="product-photo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div>
              <label className={labelClass}>Video</label>
              <div className="border-2 border-dashed border-[#E0E2E7] rounded-xl flex flex-col items-center justify-center gap-2 py-8">
                <div className="w-10 h-10 rounded-full bg-brand-800 flex items-center justify-center text-primary-light">
                  <Video size={18} />
                </div>
                <p className="text-xs text-brand-100">
                  Drag and drop video here, or click add video
                </p>
                <span className="text-xs font-semibold text-primary-light bg-brand-800 px-4 py-2 rounded-lg mt-1">
                  + Add Video
                </span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-semibold text-brand-500">Pricing</h3>
            <div>
              <label className={labelClass}>Base Price ($)</label>
              <input
                type="number"
                className={inputClass}
                placeholder="Type base price here..."
                value={form.basePrice}
                onChange={handleChange("basePrice")}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Discount Type</label>
                <select className={inputClass}>
                  <option value="">Select a discount type</option>
                  <option>Percentage</option>
                  <option>Fixed Amount</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Discount Percentage (%)</label>
                <input className={inputClass} placeholder="Type discount percentage..." />
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-semibold text-brand-500">Inventory</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>SKU</label>
                <input
                  className={inputClass}
                  placeholder="Type product SKU here..."
                  value={form.sku}
                  onChange={handleChange("sku")}
                />
              </div>
              <div>
                <label className={labelClass}>Barcode</label>
                <input className={inputClass} placeholder="Product barcode..." />
              </div>
              <div>
                <label className={labelClass}>Quantity</label>
                <input
                  type="number"
                  className={inputClass}
                  placeholder="Type product quantity..."
                  value={form.quantity}
                  onChange={handleChange("quantity")}
                />
              </div>
            </div>
          </div>

          {/* Variation */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-semibold text-brand-500">Variation</h3>
            {variants.map((v, idx) => (
              <div key={idx} className="grid grid-cols-3 gap-4 items-end">
                <div>
                  <label className={labelClass}>Variation Type</label>
                  <select
                    className={inputClass}
                    value={v.type}
                    onChange={(e) => updateVariant(idx, "type", e.target.value)}
                  >
                    <option value="">Select a variation</option>
                    <option>Color</option>
                    <option>Size</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Variation</label>
                  <input
                    className={inputClass}
                    placeholder="Variation..."
                    value={v.value}
                    onChange={(e) => updateVariant(idx, "value", e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    className={inputClass}
                    placeholder="Quantity..."
                    value={v.qty}
                    onChange={(e) => updateVariant(idx, "qty", e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeVariant(idx)}
                    className="p-2.5 bg-[#FCE0E0] rounded-xl flex-shrink-0"
                  >
                    <Trash2 size={18} color="#F16363" />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addVariant}
              className="text-sm font-semibold text-primary-light hover:underline w-fit"
            >
              + Add Variant
            </button>
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-semibold text-brand-500">Shipping</h3>
            <label className="flex items-center gap-2 text-sm font-medium text-brand-500">
              <input
                type="checkbox"
                checked={form.isPhysical}
                onChange={(e) => setForm((p) => ({ ...p, isPhysical: e.target.checked }))}
                className="w-4 h-4 accent-primary-light"
              />
              This is a physical product
            </label>
            <div className="grid grid-cols-4 gap-4">
              {["Weight", "Height", "Length", "Width"].map((f) => (
                <div key={f}>
                  <label className={labelClass}>{f}</label>
                  <input className={inputClass} placeholder={`${f}...`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6 h-fit">
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-semibold text-brand-500">Category</h3>
            <div>
              <label className={labelClass}>Product Category</label>
              <select className={inputClass} value={form.category} onChange={handleChange("category")}>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Product Tags</label>
              <select className={inputClass}>
                <option value="">Select tags</option>
                <option>New</option>
                <option>Featured</option>
                <option>Sale</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-brand-500">Status</h3>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-50 text-orange-500">
                {form.status}
              </span>
            </div>
            <div>
              <label className={labelClass}>Product Status</label>
              <select className={inputClass} value={form.status} onChange={handleChange("status")}>
                <option>Draft</option>
                <option>Published</option>
                <option>Out of Stock</option>
              </select>
            </div>
          </div>
        </div>
      </form>

      {/* Bottom completion bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-8 py-4 flex items-center justify-between shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3 w-1/3">
          <span className="text-sm font-semibold text-brand-400 whitespace-nowrap">
            Product Completion <span className="text-primary-light">{completion}%</span>
          </span>
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-light rounded-full transition-all"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/ecommerce/product")}
            className="flex items-center gap-2 border-2 border-[#E0E2E7] text-brand-400 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            <X size={18} />
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-primary-light text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>
    </section>
  );
}
