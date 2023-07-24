import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { json, useLocation } from "react-router-dom";
import axios from "axios";
export const AppContext = createContext(null);

const sampleProducts = [
  {
    id: 1,
    title: "Men Horse Leather Jacket Pull Up",
    description:
      "The Men's Horse Leather Jacket features a classic and tailored fit, providing a sleek and flattering silhouette. It may come in various styles, such as a zip-up or button-front closure, and often includes practical elements like multiple pockets for storage convenience.",
    category: "men's clothing",
    image: "img_2019.png",
    price: 1000,
    rate: 4,
    count: 120,
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    image: "img_2023.png",
    price: 1100,
    rate: 4,
    count: 250,
  },
  {
    id: 3,
    title: "Mens Casual Slim Fit",
    description:
      "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    category: "men's clothing",
    image: "img_2001.png",
    price: 800,
    rate: 3,
    count: 400,
  },
  {
    id: 4,
    title: "DANVOUY Womens T Shirt Casual Cotton Short",
    description:
      "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
    category: "women's clothing",
    image: "img_2002.png",
    price: 650,
    rate: 3,
    count: 100,
  },
  {
    id: 5,
    title: "Opna Women's Short Sleeve Moisture",
    description:
      "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
    category: "women's clothing",
    image: "img_2003.png",
    price: 400,
    rate: 4,
    count: 100,
  },
  {
    id: 6,
    title: "MBJ Women's Solid Short Sleeve Boat Neck V",
    description:
      "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
    category: "women's clothing",
    image: "img_2004.png",
    price: 500,
    rate: 4,
    count: 100,
  },
  {
    id: 7,
    title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    description:
      "\"Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
    category: "women's clothing",
    image: "img_2005.png",
    price: 2000,
    rate: 4,
    count: 600,
  },
  {
    id: 8,
    title: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    description:
      "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
    category: "women's clothing",
    image: "img_2006.png",
    price: 1500,
    rate: 3,
    count: 300,
  },
  {
    id: 9,
    title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    description:
      "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
    category: "women's clothing",
    image: "img_2007.png",
    price: 3000,
    rate: 3,
    count: 300,
  },
  {
    id: 10,
    title: "UNIFIT Men's Dri-Fit Round Neck T-Shirts Casual Sports Jogging Fitness Uf-03001",
    description:
      "This T-shirt is likely made from moisture-wicking, breathable, and quick-drying fabric. Dri-Fit is a proprietary technology developed by Nike, known for its ability to draw sweat away from the body, helping you stay dry and comfortable during physical activities.",
    category: "men's clothing",
    image: "img_2008.png",
    price: 250,
    rate: 4,
    count: 100,
  },
  {
    id: 11,
    title: "UNIFIT Plain Round Neck Unisex Poly Cotton T-Shirts Uf-03228",
    description:
      "These plain round neck t-shirts are wardrobe essentials that can be effortlessly paired with jeans, shorts, skirts, or layered under jackets and sweaters. They are suitable for everyday wear, sports, gym sessions, and other casual occasions, providing comfort and style in one package.",
    category: "men's clothing",
    image: "img_2009.png",
    price: 500,
    rate: 4,
    count: 100,
  },
  {
    id: 12,
    title: "Men's shirt TENCEL",
    description:
      "The Men's TENCEL Shirt is a stylish and eco-friendly clothing option for the modern man. Crafted from TENCEL fabric, this shirt boasts a luxurious softness and smooth texture, offering a comfortable and breathable wearing experience. The TENCEL fabric's moisture-wicking properties help keep the wearer cool and dry throughout the day, making it ideal for warm weather and active lifestyles.",
    category: "men's clothing",
    image: "img_2010.png",
    price: 1500,
    rate: 4,
    count: 100,
  },
  {
    id: 13,
    title: "Men's knit sweater",
    description:
      "The Men's Knit Sweater is a versatile and stylish addition to any wardrobe, providing both warmth and a classic, timeless look. Crafted from soft and cozy materials like wool, cotton, or a blend of fibers, this knit sweater offers comfort and insulation during colder months or chilly evenings. Its knit construction adds texture and depth to the design, giving it a sophisticated and refined appearance.",
    category: "men's clothing",
    image: "img_2011.png",
    price: 2200,
    rate: 4,
    count: 100,
  },
  {
    id: 14,
    title: "Ladies Tunic Dress Seersucker",
    description:
      "The tunic dress style is known for its loose and flowing silhouette, allowing for ease of movement and a flattering fit for various body shapes. It typically extends past the hips, offering a comfortable and relaxed drape. Some seersucker tunic dresses may come with a self-tie or fabric belt at the waist to accentuate the figure and add a touch of femininity.",
    category: "women's clothing",
    image: "img_2012.png",
    price: 2500,
    rate: 4,
    count: 100,
  },
  {
    id: 15,
    title: "Ladies Blouse V-neck",
    description:
      "The V-neck design makes this blouse a versatile wardrobe staple that can be easily paired with different bottoms. It can be worn with tailored trousers or a pencil skirt for a professional office look, providing a sophisticated touch while keeping a professional appearance. For a more casual ensemble, the blouse can be matched with jeans or shorts, creating a chic and relaxed outfit for social gatherings or outings.",
    category: "women's clothing",
    image: "img_2013.png",
    price: 850,
    rate: 4,
    count: 100,
  },
  {
    id: 16,
    title: "Men's Shirt Jacket, Demin",
    description:
      "This shirt jacket has become a timeless wardrobe essential that effortlessly blends style and functionality. Whether dressing for a casual day out, a weekend gathering, or a night at a local bar, the Men's Denim Shirt Jacket offers a versatile and fashion-forward option for the modern man.",
    category: "men's clothing",
    image: "img_2014.png",
    price: 950,
    rate: 4,
    count: 100,
  },
  {
    id: 17,
    title: "Ladies Blazer Single Breasted",
    description:
      "The blazer's tailored fit and silhouette ensure a flattering appearance, hugging the body in a sophisticated manner without feeling overly restrictive. The shoulders are typically padded or softly structured, giving the jacket its iconic shape.",
    category: "women's clothing",
    image: "img_2015.png",
    price: 3000,
    rate: 4,
    count: 100,
  },
  {
    id: 18,
    title: "Ladies Knitted Coat Shawl Collar",
    description:
      "The Ladies' Knitted Coat with Shawl Collar can be styled in various ways. For a chic and casual look, pair it with jeans or leggings, adding ankle boots for a trendy ensemble. For a more dressed-up outfit, layer it over a dress or a skirt with tights, creating an elegant and polished look.",
    category: "women's clothing",
    image: "img_2016.png",
    price: 1200,
    rate: 4,
    count: 100,
  },
  {
    id: 19,
    title: "Men Jacket Schladminger Loden",
    description:
      "The Schladminger Loden Jacket often includes practical features such as multiple pockets, providing ample storage for small essentials like keys, wallets, or gloves. The front closure may consist of buttons or a combination of buttons and a zipper, ensuring a secure and stylish closure.",
    category: "men's clothing",
    image: "img_2017.png",
    price: 1800,
    rate: 4,
    count: 190,
  },
  {
    id: 20,
    title: "Breton Kaban Jacket Men",
    description:
      "The Breton Kaban Jacket often includes practical features such as flap pockets, providing functional storage space for small essentials like keys, wallets, or a mobile phone. The generous cut of the jacket allows for ease of movement, making it comfortable for daily wear and outdoor activities.",
    category: "men's clothing",
    image: "img_2018.png",
    price: 2700,
    rate: 4,
    count: 100,
  },
];

const savedCheckoutCart = localStorage.getItem("reciept_items");

export const AppProvider = ({ children }) => {
  const location = useLocation();
  const route = "locaghost:8081/";
  const [products, setProducts] = useState(sampleProducts);
  const [productFilter, setProductFilter] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
    priceSort: "",
    categorySort: "",
  });

  const [cartData, setCartData] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [discount, setDiscount] = useState(0);

  const [loggedInName, setLoggedInName] = useState({
    first_name: "",
    last_name: "",
  });
  const [loggedInID, setLoggedInID] = useState(null);

  const [loading, setLoading] = useState(false);

  const [isAutorize, setIsAuthorize] = useState(false);
  const [isCartShown, setIsCartShown] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState({
    checkout_cart: JSON.parse(savedCheckoutCart) || [],
  });

  function showCart() {
    document.body.classList.add("modal-open");
    setIsCartShown(true);
  }

  function hideCart() {
    document.body.classList.remove("modal-open");
    setIsCartShown(false);
  }

  useEffect(() => {
    localStorage.setItem("reciept_items", JSON.stringify(checkoutItems.checkout_cart));
  }, [checkoutItems]);
  axios.defaults.withCredentials = true;

  async function getProducts() {
    try {
      const response = await axios.get(`${route}/products`, {
        params: {
          filters: productFilter,
        },
      });

      if (response.data.Status === "Success") {
        // console.log(JSON.stringify(response.data.Result, null, 2));
        // setProducts(response.data.Result);
      } else {
        console.log(response.data.Message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, [loggedInID, productFilter]);

  useEffect(() => {
    // axios
    //   .get(`${route}/products`)
    //   .then((res) => {
    //     if (res.data.Status === "Success") {
    //       setProducts(res.data.Result);
    //     } else {
    //       console.log(res.data.Message);
    //     }
    //   })
    //   .catch((err) => console.log(err));

    //get authetication logged in

    axios.get(`${route}`).then((response) => {
      if (response.data.Status === "success") {
        // console.log(response.data);
        setLoggedInName((prevData) => ({
          ...prevData,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
        }));
        setLoggedInID(response.data.id);
        setIsAuthorize(true);
      } else {
        setLoggedInID(false);
        setIsAuthorize(false);
      }
    });
  }, []);

  const fetchCartData = async () => {
    // setIsCartLoading(true);
    try {
      const response = await axios.get(`${route}/cart`, {
        params: { user_id: loggedInID },
      });

      if (response.data.Status === "success") {
        // console.log(response);
        setCartData(response.data.Result);
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
        // setIsCartLoading(false);
      } else {
        console.log(response.data.Message);
      }
    } catch (error) {
      console.log(error.Message);
    }
  };

  async function getOrders() {
    try {
      const response = await axios.get(`${route}/orders`, {
        params: {
          user_id: loggedInID,
        },
      });

      if (response.data.Status == "success") {
        setOrders(response.data.Result);
        return;
      }
      console.log(response.data.Message);
      return;
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    fetchCartData();
  }, [loggedInID]);

  async function getAddress() {
    try {
      const response = await axios.get(`${route}/user-address`, {
        params: { user_id: loggedInID },
      });

      if (response.data.Status === "success") {
        console.log(response);
        setAddresses(response.data.Result);
      } else {
        console.log(response.data.Message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function getTotal() {
    let total = 0;

    checkoutItems.checkout_cart.forEach((item) => {
      total += item.subtotal;
    });

    const discount_by = total * 0.15;
    return toPHCurrency(100);
  }

  // function getTotal() {
  //   let total = 0;

  //   checkoutItems.checkout_cart.forEach((item) => {
  //     total += item.subtotal;
  //   });

  //   const discount_by = total * 0.15;
  //   return toPHCurrency(total - discount_by);
  // }

  function toPHCurrency(number) {
    const currencyOptions = {
      style: "currency",
      currency: "PHP",
      currencyDisplay: "symbol",
    };

    return Number(number).toLocaleString("en-PH", currencyOptions);
  }

  function generateRandomProducts(category) {
    const shuffledProducts = products
      .filter((product) => product.category === category)
      .sort((a, b) => b.id - a.id);
    // .sort(() => 0.5 - Math.random());
    const selectedProducts = shuffledProducts.slice(0, 4);
    return selectedProducts;
  }

  return (
    <AppContext.Provider
      value={{
        generateRandomProducts,
        products,
        route,
        loggedInName,
        loggedInID,
        isAutorize,
        checkoutItems,
        setCheckoutItems,
        getTotal,
        loading,
        setLoading,
        cartData,
        setCartData,
        getAddress,
        addresses,
        setAddresses,
        toPHCurrency,
        fetchCartData,
        isCartShown,
        hideCart,
        showCart,
        setProductFilter,
        orders,
        setOrders,
        getOrders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
