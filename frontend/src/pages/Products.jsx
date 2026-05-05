import React, { useState, useEffect } from "react";
import FilterSidebar from "@/components/ui/FilterSidebar";
import ProductCard from "@/components/ui/ProductCard";
import { toast } from "sonner";
import axios from "axios";
import { Loader2, PackageX } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector, useDispatch } from "react-redux"; // useDispatch import kiya
import { setProducts as setReduxProducts } from "@/redux/productSlice"; // Redux action import kiya

export default function Products() {
  const dispatch = useDispatch();
  // Redux se sabhi products le aao
  // const { allproducts } = useSelector((store) => store.product);
  const { allproducts = [] } = useSelector((store) => store.product || {});
  // Local state jo screen par dikhegi (Filtered Products)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sorting State
  const [sortOrder, setSortOrder] = useState("");

  // Filters State (Sidebar se jo aayega)
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    brand: "ALL",
    minPrice: 0,
    maxPrice: 999999,
  });

  // 1. API Fetch - Data lakar Redux me daalna
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:8080/api/v1/product/getallproducts",
        );

        let fetchedProducts = [];
        if (Array.isArray(res.data)) {
          fetchedProducts = res.data;
        } else if (res.data && Array.isArray(res.data.products)) {
          fetchedProducts = res.data.products;
        } else if (res.data && Array.isArray(res.data.data)) {
          fetchedProducts = res.data.data;
        }

        // 🌟 Data aate hi use Redux me save kar do
        dispatch(setReduxProducts(fetchedProducts));
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error(err.response?.data?.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    getAllProducts();
  }, [dispatch]);

  // 2. FILTERING LOGIC 🌟 - Jab bhi filters, sortOrder, ya allproducts change honge
  useEffect(() => {
    let result = [...allproducts]; // Redux wale data ki copy banai

    // A. Search Filter (Naam me dhoondo)
    if (filters.search) {
      result = result.filter((item) =>
        (item.productName || item.name || "")
          .toLowerCase()
          .includes(filters.search.toLowerCase()),
      );
    }

    // B. Category Filter
    if (filters.category !== "All") {
      result = result.filter(
        (item) =>
          (item.category || "").toLowerCase() ===
          filters.category.toLowerCase(),
      );
    }

    // C. Brand Filter
    if (filters.brand !== "ALL") {
      result = result.filter(
        (item) =>
          (item.brand || "").toLowerCase() === filters.brand.toLowerCase(),
      );
    }

    // D. Price Range Filter
    result = result.filter((item) => {
      const itemPrice = item.productPrice || item.price || 0;
      return itemPrice >= filters.minPrice && itemPrice <= filters.maxPrice;
    });

    // E. Sorting Logic (Low to High / High to Low)
    if (sortOrder === "LowToHigh") {
      result.sort(
        (a, b) =>
          (a.productPrice || a.price || 0) - (b.productPrice || b.price || 0),
      );
    } else if (sortOrder === "HighToLow") {
      result.sort(
        (a, b) =>
          (b.productPrice || b.price || 0) - (a.productPrice || a.price || 0),
      );
    }

    // Filtered data ko local state me set kar do (UI update ho jayega)
    setProducts(result);
  }, [filters, allproducts, sortOrder]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-24 pb-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {" "}
        {/* gap-7 ko gap-6 kar diya thoda aur paas laane ke liye */}
        {/* Sidebar */}
        <div className="w-full md:w-[220px] shrink-0">
          {" "}
          {/* md:w-1/4 ki jagah fix width aur shrink-0 lagaya */}
          <FilterSidebar onFilterChange={setFilters} />
        </div>
        {/* Main Products Section */}
        <div className="flex flex-col flex-1">
          {/* Header Area (Sorting) */}
          <div className="flex justify-end mb-6">
            {/* 🌟 onValueChange add kiya taaki select karne par sortOrder update ho */}
            <Select onValueChange={(value) => setSortOrder(value)}>
              <SelectTrigger className="w-[200px] bg-white shadow-sm border-gray-200">
                <SelectValue placeholder="Sort by Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="LowToHigh">Low to High</SelectItem>
                  <SelectItem value="HighToLow">High to Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Conditional Rendering */}
          {loading ? (
            <div className="flex flex-col items-center justify-center h-[50vh]">
              <Loader2 className="h-12 w-12 animate-spin text-pink-600 mb-4" />
              <p className="text-lg font-medium text-gray-700">
                Loading amazing products...
              </p>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <Card className="flex flex-col items-center justify-center h-[40vh] shadow-xl rounded-2xl border-none">
              <CardContent className="flex flex-col items-center pt-6">
                <PackageX className="h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-bold text-gray-800">
                  No products found
                </h3>
                <p className="text-gray-500 mt-2 text-center max-w-sm">
                  We couldn't find any products matching your criteria. Try
                  adjusting your filters.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
