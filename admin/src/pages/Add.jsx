import { useContext, useState } from "react";
import { FaCheck } from "react-icons/fa";
import bgimage from "../assets/background-image.png";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import uplodImage from "../assets/uploadImage.jpg";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";

const quantityOptions = ["1pcs","100g", "500g", "1kg", "2kg"];

// Shared classes so every field looks the same
const labelClass = "mb-1.5 block text-sm font-semibold text-[#e3b566]";
const fieldClass =
  "w-full rounded-lg border border-[#e3b566]/40 bg-black/30 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-[#e3b566] focus:ring-2 focus:ring-[#e3b566]/40 sm:text-base";

const Add = () => {
  let [image1, setImage1] = useState(false);
  let [image2, setImage2] = useState(false);
  let [image3, setImage3] = useState(false);
  let [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Sweets");
  const [subcategory, setSubCategory] = useState("Deliverable");
  const [price, setPrice] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [quantity, setQunatity] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  let {serverUrl} = useContext(authDataContext);

  const imageSlots = [
    { id: "image1", file: image1, setFile: setImage1 },
    { id: "image2", file: image2, setFile: setImage2 },
    { id: "image3", file: image3, setFile: setImage3 },
    { id: "image4", file: image4, setFile: setImage4 },
  ];

  const toggleQuantity = (size) =>
    setQunatity((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size],
    );

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (imageSlots.some(({ file }) => !file)) {
      setErrorMessage("Please upload all four product images.");
      return;
    }

    if (quantity.length === 0) {
      setErrorMessage("Please select at least one product quantity.");
      return;
    }

    setLoading(true);
    try {
      let formData = new FormData();
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subcategory);
      formData.append("price", price);
      formData.append("bestSeller", bestseller);
      formData.append("quantity", JSON.stringify(quantity));

      let result = await axios.post(serverUrl + "/api/product/addproduct", formData, { withCredentials: true });

      console.log(result.data);

      if (result.data){
        setName("");
        setDescription("");
        setCategory("Sweets");
        setSubCategory("Deliverable");
        setPrice("");
        setBestseller(false);
        setQunatity([]);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      }
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error);
      setErrorMessage(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Unable to add product. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="fixed inset-0 overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <Nav />
      <Sidebar />

      <main className="absolute bottom-0 left-16 right-0 top-20 overflow-y-auto overflow-x-hidden md:left-[18%]">
        <div className="px-4 py-6 sm:px-6 lg:px-10">
          <form
            action=""
            onSubmit={handleAddProduct}
            className="mx-auto w-full max-w-4xl rounded-2xl border-2 border-dashed border-[#e3b566]/70 p-4 shadow-2xl backdrop-blur-sm sm:p-6 lg:p-8"
          >
            {/* Heading */}
            <div className="mb-6 border-b border-dashed border-[#e3b566]/40 pb-4">
              <h1 className="font-serif text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Add product
              </h1>
              <p className="mt-1 text-sm text-white/70">
                Fill in the details below to add a new item to your menu.
              </p>
            </div>

            {/* Images */}
            <div className="mb-6">
              <p className={labelClass}>Upload images</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {imageSlots.map((slot, index) => (
                  <label
                    key={slot.id}
                    htmlFor={slot.id}
                    className="group relative block aspect-square cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-[#e3b566]/60 bg-black/30 transition hover:border-[#e3b566]"
                  >
                    <img
                      src={
                        slot.file ? URL.createObjectURL(slot.file) : uplodImage
                      }
                      alt={`Product image ${index + 1}`}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-black/60 py-1 text-center text-xs font-medium text-white">
                      {slot.file ? "Change image" : `Image ${index + 1}`}
                    </span>
                    <input
                      type="file"
                      id={slot.id}
                      accept="image/*"
                      hidden
                      onChange={(e) => slot.setFile(e.target.files[0])}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Name */}
            <div className="mb-5">
              <label htmlFor="name" className={labelClass}>
                Product name
              </label>
              <input
                type="text"
                id="name"
                placeholder="e.g. Kaju Katli"
                className={fieldClass}
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-5">
              <label htmlFor="description" className={labelClass}>
                Product description
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Write a short description of the product..."
                className={`${fieldClass} resize-y`}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
            </div>

            {/* Category / Sub category / Price */}
            <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label htmlFor="category" className={labelClass}>
                  Product category
                </label>
                <select
                  id="category"
                  className={fieldClass}
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option value="Sweets">Sweets</option>
                  <option value="Snacks">Snacks</option>
                </select>
              </div>

              <div>
                <label htmlFor="subcategory" className={labelClass}>
                  Sub category
                </label>
                <select
                  id="subcategory"
                  className={fieldClass}
                  onChange={(e) => setSubCategory(e.target.value)}
                  value={subcategory}
                >
                  <option value="Deliverable">Deliverable</option>
                  <option value="NON-Deliverable">NON-Deliverable</option>
                </select>
              </div>

              <div className="sm:col-span-2 lg:col-span-1">
                <label htmlFor="price" className={labelClass}>
                  Product price (₹)
                </label>
                <input
                  type="number"
                  id="price"
                  min="0"
                  placeholder="e.g. 450"
                  className={fieldClass}
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  required
                />
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-5">
              <p className={labelClass}>Product quantity</p>
              <div className="flex flex-wrap gap-3">
                {quantityOptions.map((size) => {
                  const selected = quantity.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleQuantity(size)}
                      className={`flex min-w-22 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 px-4 py-2 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e3b566] focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 active:scale-95 ${
                        selected
                          ? "border-[#e3b566] bg-[#e3b566] text-[#3b0d0d] shadow-lg shadow-[#e3b566]/30"
                          : "border-white/30 bg-black/30 text-white/80 hover:border-[#e3b566]/70 hover:text-white"
                      }`}
                    >
                      {selected && <FaCheck className="text-xs" />}
                      {size}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-white/60">
                {quantity.length
                  ? `Selected: ${quantity.join(", ")}`
                  : "Tap to select one or more sizes."}
              </p>
            </div>

            {/* Bestseller */}
            <label
              htmlFor="checkbox"
              className="mb-6 flex w-full cursor-pointer items-center gap-3 rounded-lg border border-[#e3b566]/40 bg-black/30 px-4 py-3 text-sm font-medium text-white transition hover:border-[#e3b566] sm:w-fit sm:text-base"
            >
              <input
                type="checkbox"
                id="checkbox"
                className="h-5 w-5 cursor-pointer accent-[#e3b566]"
                checked={bestseller}
                onChange={() => setBestseller((prev) => !prev)}
              />
              Add to bestseller
            </label>

            {/* Submit */}
            {errorMessage && (
              <p className="mb-4 text-sm text-red-300" role="alert">
                {errorMessage}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#7f1d1d] px-8 py-3 text-base font-semibold text-white shadow-md ring-1 ring-[#e3b566]/50 transition hover:bg-[#681818] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e3b566] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {loading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              )}
              {loading ? "Adding product…" : "Add product"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Add;
