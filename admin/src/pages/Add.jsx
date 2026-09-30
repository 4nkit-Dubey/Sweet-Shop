import React, { useState } from "react";
import bgimage from "../assets/background-image.png";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import uplodImage from "../assets/uploadImage.jpg";

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
  const [bestseller, setBestseller] = useState("false");
  const [quantity, setQunatity] = useState([]);

  return (
    <div
      className="relative h-screen w-full  bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <div className="overflow-x-hidden">
        <Nav />
        <Sidebar />
        <div>
          <form action="">
            <div>Add Product Page</div>
            <div>
              <p>Uplaod Images</p>
            </div>
            <div>
              <label htmlFor="image1">
                <img
                  src={image1 ? URL.createObjectURL(image1) : uplodImage}
                  alt=""
                />
                <input
                  type="file"
                  id="image"
                  hidden
                  onChange={(e) => setImage1(e.target.files[0])}
                />
              </label>
              <label htmlFor="image2">
                <img
                  src={image1 ? URL.createObjectURL(image1) : uplodImage}
                  alt=""
                />
                <input
                  type="file"
                  id="image"
                  hidden
                  onChange={(e) => setImage2(e.target.files[0])}
                />
              </label>
              <label htmlFor="image3">
                <img
                  src={image1 ? URL.createObjectURL(image1) : uplodImage}
                  alt=""
                />
                <input
                  type="file"
                  id="image"
                  hidden
                  onChange={(e) => setImage3(e.target.files[0])}
                />
              </label>
              <label htmlFor="image4">
                <img
                  src={image1 ? URL.createObjectURL(image1) : uplodImage}
                  alt=""
                />
                <input
                  type="file"
                  id="image"
                  hidden
                  onChange={(e) => setImage4(e.target.files[0])}
                />
              </label>
            </div>
            <div>
              <p>Product Name</p>
              <input
                type="text"
                placeholder="type name here...."
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
            <div>
              <p>Product Description</p>
              <textarea
                type="text"
                placeholder="type name here...."
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
            </div>

            <div>
              <div>
                <p>Product Category</p>
                <select
                  name=""
                  id=""
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option value="Sweets">Sweets</option>
                  <option value="Snacks">Snacks</option>
                </select>
              </div>
            </div>
            <div>
              <div>
                <p>Sub Category</p>
                <select
                  name=""
                  id=""
                  onChange={(e) => setSubCategory(e.target.value)}
                  value={subcategory}
                >
                  <option value="Deliverable">Deliverable</option>
                  <option value="NON-Deliverable">NON-Deliverable</option>
                </select>
              </div>
            </div>
            <div>
              <p>Product Price</p>
              <input
                type="number"
                placeholder="type name here...."
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
              />
            </div>
            <div>
              <p>Product Quantity</p>
              <div>
                <div
                  onClick={() =>
                    setQunatity((prev) =>
                      prev.includes("500g")
                        ? prev.filter((item) => item !== "500g")
                        : [...prev, "500g"],
                    )
                  }
                >
                  500g
                </div>
                <div
                  onClick={() =>
                    setQunatity((prev) =>
                      prev.includes("1kg")
                        ? prev.filter((item) => item !== "1kg")
                        : [...prev, "1kg"],
                    )
                  }
                >
                  1kg
                </div>
                <div
                  onClick={() =>
                    setQunatity((prev) =>
                      prev.includes("2kg")
                        ? prev.filter((item) => item !== "2kg")
                        : [...prev, "2kg"],
                    )
                  }
                >
                  2kg
                </div>
                <div
                  onClick={() =>
                    setQunatity((prev) =>
                      prev.includes("5kg")
                        ? prev.filter((item) => item !== "5kg")
                        : [...prev, "5kg"],
                    )
                  }
                >
                  5kg
                </div>
              </div>
            </div>
            <div>
              <input
                type="checkbox"
                id="checkbox"
                onChange={(e) => setBestseller(prev => !prev)}
                value={bestseller}
              />
              <label htmlFor="checkbox">Add To Bestseller</label>
            </div>

            <button>Add Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
