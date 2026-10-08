import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../contexts/ShopContext'
import Title from './Title'
import Card from './Card'

const RelatedProduct = ({ category, subcategory, currentProductId }) => {
    let { products } = useContext(shopDataContext);
    let [relatedProduct, setRelatedProduct] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) => category === item.category);
            productsCopy = productsCopy.filter((item) => subcategory === item.subcategory);
            productsCopy = productsCopy.filter((item) => currentProductId !== item._id);
            setRelatedProduct(productsCopy.slice(0, 4));
        }
    }, [products, category, subcategory, currentProductId]);

    return (
        <div className="w-full bg-gradient-to-b from-[#0c2025] via-[#0f2a31] to-[#141414] py-10 sm:py-14">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <Title text1={'RELATED'} text2={'PRODUCTS'} />

                {relatedProduct.length > 0 ? (
                    <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 lg:grid-cols-4 xl:grid-cols-4">
                        {
                            relatedProduct.map((item, index) => (
                                <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image1} />
                            ))
                        }
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16">
                        <p className="text-lg font-semibold text-[#a5faf7]/50">
                            No related products found
                        </p>
                        <p className="mt-2 text-sm text-white/30">
                            Check back later for more items
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RelatedProduct