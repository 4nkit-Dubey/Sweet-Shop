import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../contexts/ShopContext';
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from '../components/RelatedProduct';

const ProductDetails = () => {
    let { productId } = useParams();
    let { products, currency } = useContext(shopDataContext)
    let [productData, setProductData] = useState(false)

    const [image, setImage] = useState('')
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const [size, setSize] = useState('')

    const fetchProductData = async () => {
        products.map((item) => {
            if (item._id == productId) {
                setProductData(item);
                setImage(item.image1);
                setImage1(item.image1);
                setImage2(item.image2);
                setImage3(item.image3);
                setImage4(item.image4);
                return null;
            }
        })
    }
    useEffect(() => {
        fetchProductData()
    }, [products, productId])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [productId])

    return productData ? (
        <div className="w-full min-h-screen bg-gradient-to-b from-[#0c2025] via-[#0f2a31] to-[#141414] overflow-x-hidden">

            {/* Spacer for fixed navbar */}
            <div className="h-[10vh] min-h-[80px] w-full shrink-0 sm:h-[12vh]" />

            {/* Main product section */}
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">

                    {/* Image gallery */}
                    <div className="flex min-w-0 flex-col gap-3 lg:flex-row-reverse lg:gap-4">
                        {/* Main image */}
                        <div className="mx-auto w-full max-w-lg min-w-0 flex-1 lg:max-w-none">
                            <div className="aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                                <img src={image} alt={productData.name} className="h-full w-full object-contain" />
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-2 sm:gap-3 lg:flex lg:w-20 lg:shrink-0 lg:flex-col lg:gap-4">
                            {[image1, image2, image3, image4].map((img, idx) => (
                                <button
                                    type="button"
                                    key={idx}
                                    onClick={() => setImage(img)}
                                    aria-label={`Show product image ${idx + 1}`}
                                    aria-pressed={image === img}
                                    className={`aspect-square w-full overflow-hidden rounded-xl border-2 transition-all duration-200 ${image === img ? 'border-[#a5faf7] ring-2 ring-[#a5faf7]/30' : 'border-white/10 hover:border-[#a5faf7]/50'}`}
                                >
                                    <img src={img} alt="" className="h-full w-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="flex min-w-0 flex-col gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-7 lg:p-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-[#c3f6ca] tracking-wide">
                            {productData.name.toUpperCase()}
                        </h1>

                        {/* Ratings */}
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-[#a5faf7]">
                                <FaStar className="text-[18px]" />
                                <FaStar className="text-[18px]" />
                                <FaStar className="text-[18px]" />
                                <FaStar className="text-[18px]" />
                                <FaStarHalfAlt className="text-[18px]" />
                            </div>
                            <span className="text-sm text-white/50">(167+)</span>
                        </div>

                        {/* Price */}
                        <p className="text-3xl font-bold text-[#a5faf7]">
                            {currency}{productData.price}
                        </p>

                        {/* Description */}
                        <p className="text-sm text-white/60 leading-relaxed">
                            {productData.description}
                        </p>

                        {/* Quantity / Size selector */}
                        <div className="flex flex-col gap-3">
                            <p className="text-sm font-semibold text-[#c3f6ca]">Select Quantity</p>
                            <div className="flex flex-wrap gap-2">
                                {
                                    productData.quantity.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSize(item)}
                                            className={`border border-white/20 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${item === size ? 'bg-[#a5faf7] text-[#0c2025]' : 'bg-black/40 text-[#c3f6ca] hover:bg-[#a5faf7]/10 hover:border-[#a5faf7]/50'}`}
                                        >
                                            {item}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <button className="w-full py-3 px-6 bg-[#a5faf7] text-[#0c2025] font-bold rounded-xl hover:bg-[#a5faf7]/90 transition-all duration-300 shadow-[0_0_15px_rgba(165,250,247,0.3)] hover:shadow-[0_0_20px_rgba(165,250,247,0.5)]">
                            Add To Cart
                        </button>

                        {/* Divider — separation line */}
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#a5faf7]/30 to-transparent" />

                        {/* Features */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 text-sm text-white/70">
                                <span className="w-2 h-2 rounded-full bg-[#a5faf7]" />
                                <span>100% pure & fresh</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-white/70">
                                <span className="w-2 h-2 rounded-full bg-[#a5faf7]" />
                                <span>Safe & Express Delivery</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-white/70">
                                <span className="w-2 h-2 rounded-full bg-[#a5faf7]" />
                                <span>Instant Customer Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details & Reviews section */}
            <div className="w-full bg-gradient-to-r from-[#141414] to-[#0c2025] py-10 sm:py-14">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Tabs */}
                    <div className="flex border-b border-white/10 mb-6">
                        <button className="pb-3 px-4 text-[#a5faf7] border-b-2 border-[#a5faf7] font-semibold text-sm sm:text-base">
                            Product Details
                        </button>
                        <button className="pb-3 px-4 text-white/50 font-semibold text-sm sm:text-base">
                            Reviews (153+)
                        </button>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-white/60 leading-relaxed mb-8">
                        {productData.description}
                    </p>

                    {/* Related products */}
                    <RelatedProduct
                        category={productData.category}
                        subcategory={productData.subcategory}
                        currentProductId={productData._id}
                    />
                </div>
            </div>

            {/* Bottom padding for mobile bottom nav */}
            <div className="h-[80px] shrink-0 lg:hidden" />
        </div>
    ) : (
        <div className="opacity-0"></div>
    )
}

export default ProductDetails