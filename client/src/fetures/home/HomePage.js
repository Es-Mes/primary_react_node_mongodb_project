
import "./homePage.css"
import Search from "../../component/search/Search"
import { useGetAllProductsPublicQuery } from "../products/ProductsApiSlice"
import { Link, useSearchParams } from "react-router-dom"
import useGetFilePath from "../../hooks/useGetFilePath"
import "../products/List/productsList.css"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { resetProducts } from "../products/productsSlice"
import Carousel from "./Carousel"
import CategoriesCarousel from "./CategoriesCarousel"
// import ScrollCarousel from 'scroll-carousel-react';
// import Carousel from 'react-bootstrap/Carousel';



const images = [
    {
        url: "http://localhost:1234/uploads/baby.jpg",
        width: 320,
        height: 174,
        isSelected: true,
        caption: "After Rain (Jeshu John - designerspics.com)",
    },
    {
        url: "http://localhost:1234/uploads/sea.jpg",
        width: 320,
        height: 174,
        isSelected: true,
        caption: "After Rain (Jeshu John - designerspics.com)",
    },
    {
        url: "http://localhost:1234/uploads/baby.jpg",
        width: 320,
        height: 174,
        isSelected: true,
        caption: "After Rain (Jeshu John - designerspics.com)",
    },
    {
        url: "http://localhost:1234/uploads/sea.jpg",
        width: 320,
        height: 212,
        tags: [
            { value: "Ocean", title: "Ocean" },
            { value: "People", title: "People" },
        ],
        alt: "Boats (Jeshu John - designerspics.com)",
    },
    {
        url: "http://localhost:1234/uploads/baby.jpg",
        width: 320,
        height: 212,
    },
];

const HomePage = () => {
    const { data: products, isError, error, isLoading, isSuccess } = useGetAllProductsPublicQuery()
    const [searchParams] = useSearchParams()
    const company = searchParams.get("company");
    console.log("company=", company);
    const q = searchParams.get("q") || company
    console.log("q=", q);
    const { getFilePath } = useGetFilePath()
    const [arrWordsSearch, setArrWordsSearch] = useState([])

    // const dispatch = useDispatch()
    let filteredData = products
    const dispatch = useDispatch()

    useEffect(() => {
        if (isSuccess) {
            dispatch(resetProducts(products))
        }

    }, [isSuccess])

    useEffect(() => {
        if (isSuccess) {
            let filtered = !q ? [...products] : arrWordsSearch;
            setArrWordsSearch(filtered);
        }
    }, [q, isSuccess]);

    useEffect(() => {
        if (q) {
            const arrWords = q.split(" ");
            const wordsMap = {};
            arrWords.forEach((word) => {
                if (word !==" ")
                    wordsMap[word] = [];
            });

            if (isSuccess) {
                products.forEach((prod) => {
                    arrWords.forEach((word) => {
                        if (prod.searchDetails.indexOf(word) > -1) {
                            wordsMap[word].push(prod);
                        }
                    });
                });
                let newArr = Object.values(wordsMap).flat();
                setArrWordsSearch(newArr);
            }
        }
    }, [q, isSuccess]);

    if (isLoading) return <div className="errorPage">loading...</div>
    if (isError) return <div className="errorPage">מצטערים, שגיאה זמנית.</div>

    return (
        <div className="products-list">
            <div className="products-list-top">
                <Search placeholder={"חיפוש כללי"} />
                <Link to="/login" className="products-list-add-btn">
                    כניסת משתמשים
                </Link>
                <Link to="/regist" className="products-list-add-btn">
                    הרשמה
                </Link>
            </div>
            {/* <ScrollCarousel
            autoplay={true}
            autoplaySpeed={0}
            speed={0}
            margin={20}
            onReady={() => console.log('I am ready')}
         >
            {images.map((item) => (
               <div key={item} className='bg-blue-300/20 border-2 border-blue-300/70 rounded h-36 w-48'>
                  <img className="carouselImg" src={item.url} alt={item.alt}/>
               </div>
            ))}
         </ScrollCarousel> */}
          <img className="bigImage" src="./baby.jpg" alt="Image 1" />
         <h2>קטגוריות</h2>
         <CategoriesCarousel/>
         
            {arrWordsSearch?.length < 1 && <div className="errorPage">נראה שאין מוצרים העונים על התנאי שלך, נסה לחפש חיפוש מורחב יותר.</div>}
            <div className="products">
                {arrWordsSearch.map(product => (
                    <div className="single" key={product._id}>
                        <div className="products-list-product"></div>
                        <Link to={`/public/${product.barcod}`} className="products-list-btn products-list-view"><img src={getFilePath(product.image)} alt="" className="products-list-product-image" /></Link>
                        <div className="details">
                            {product.name}
                            {product.company}
                            {product.sellingPrice}
                            {/* כמות:{product.amount} */}
                            {(product.amount === 0) && (
                                <div className="azal">
                                    אזל במלאי
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {/* קרוסלה!!!
            <Carousel className="carousel" show={3.5} slide={3} swiping={true}>
                <div className="carouselDiv" style={{ background: "#2d66c3" }}>We love Web 🌐</div>
                <div className="carouselDiv" style={{ background: "#f44336" }}>We love Developers 👩🏻‍💻</div>
                <div className="carouselDiv" style={{ background: "#2d66c3" }}>We love Web 🌐</div>
                <div className="carouselDiv" style={{ background: "#f44336" }}>We love Developers 👩🏻‍💻</div>
                <div className="carouselDiv" style={{ background: "#2d66c3" }}>We love Web 🌐</div>
                <div className="carouselDiv" style={{ background: "#f44336" }}>We love Developers 👩🏻‍💻</div>
                <div className="carouselDiv" style={{ background: "#2d66c3" }}>We love Web 🌐</div>
                <div className="carouselDiv" style={{ background: "#f44336" }}>We love Developers 👩🏻‍💻</div>
                <div className="carouselDiv" style={{ background: "#2d66c3" }}>We love Web 🌐</div>
                <div className="carouselDiv" style={{ background: "#f44336" }}>We love Developers 👩🏻‍💻</div>
            </Carousel> */}
          <h3>המותגים שלנו</h3>
            <Carousel/>
        </div>
    )
}

export default HomePage
