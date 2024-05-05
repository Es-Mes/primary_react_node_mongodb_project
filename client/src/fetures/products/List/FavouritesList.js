import { useEffect ,useState} from "react"
import "./productsList.css"
import Search from "../../../component/search/Search"
import { useGetAllProductsQuery, useDeleteProductMutation } from "../ProductsApiSlice"
import { Link, useSearchParams } from "react-router-dom"
import useGetFilePath from "../../../hooks/useGetFilePath"

const FavouritesList = () => {
    // let favouritesList = JSON.parse(localStorage.getItem("favouritesList")) || [];
    let  [favouritesList,setFavourites] = useState(JSON.parse(localStorage.getItem("favouritesList")) || []);


    useEffect(()=>{

    },[favouritesList])

    document.addEventListener("DOMContentLoaded", () => {
        if (favouritesList==[]) {
           return<>Add your favourites products!</>
        }

    })

    const { getFilePath } = useGetFilePath()

    const removeItem = (name)=>{
        const newList = favouritesList.filter(p=>p.name!==name)
        setFavourites(newList)
        alert("המוצר הוסר בהצלחה")
        saveList()
      }
      const removeAll = ()=>{
        setFavourites([])
        alert("המוצרים הוסרו בהצלחה")
        saveList()
      }
      const saveList = ()=>{
        localStorage.setItem("favouritesList", JSON.stringify(favouritesList))
      }
    return <>
    <h1>FavouritesList</h1>
    {/* <button onClick={removeItem}>c</button> */}
    <div className="products-list">
            {/* <div className="products-list-top">
                <Search placeholder={"חיפוש לפי שם מוצר"} />
                <Link to="/dash/products/add" className="products-list-add-btn">
                    הוספת מוצר
                </Link>
            </div> */}
            <div className="products">
            <button onClick={()=>{removeAll()}}>removeAll</button>

                {favouritesList.map(product => (
                    <div className="single" style={{ backgroundImage: `url(${getFilePath(product.image)})`}} key={product._id}>
                        <Link to={`/dash/products/${product.barcod}`} className="products-list-btn products-list-view"><img src={getFilePath(product.image)} alt="" className="products-list-product-image" /></Link>
                        <div className="details">
                            <div className="details-wr">
                                {product.barcod}<br/>
                                {product.name}<br/>
                                {product.company}<br/>
                                {product.sellingPrice}</div>
                                <button onClick={()=>{removeItem(product.name)}}>removeItem</button>

                            {/* <div className="products-list-btns">
                                <button onClick={() => { deleteClick(product) }} className="products-list-btn products-list-delete">delete</button></div> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    
    </>
    }



export default FavouritesList