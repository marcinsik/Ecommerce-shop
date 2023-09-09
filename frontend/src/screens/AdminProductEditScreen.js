import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductsDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import AdminScreen from './AdminScreen'


function AdminProductEditScreen() {

    const { id } = useParams()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [subSubCategory, setSubSubCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            navigate(`/admin/productslist`)
        } else {
            // Check if 'product' is undefined or productId has changed
            if (!product || product._id !== Number(id)) {
                // Fetch the product details when it's not available or when the ID changes
                dispatch(listProductsDetails(id));
            } else {
                // product is available, set the state variables based on its properties
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setSubCategory(product.subCategory);
                setSubSubCategory(product.subSubCategory);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        }
    }, [dispatch, product, id, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: id,
            name,
            price,
            image,
            brand,
            category,
            subCategory,
            subSubCategory,
            countInStock,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', id)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/products/upload/', formData, config)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

    //displaying category name
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories from the API 
        axios.get('/api/categories/')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    //displaying subCategory name
    const [subcategories, setSubcategories] = useState([]);
    
    useEffect(() => {
        // Fetch categories from the API 
        axios.get('/api/subcategories/')
            .then(response => {
                console.log(response.data)
                setSubcategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    //displaying subSubCategory name
    const [subsubcategories, setSubSubCategories] = useState([]);
    
    useEffect(() => {
        // Fetch categories from the API 
        axios.get('/api/subsubcategories/')
            .then(response => {
                console.log(response.data)
                setSubSubCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);



    return (
        <div>
            <AdminScreen />
            <Link to='/admin/productslist'>
                Powrót
            </Link>

            <FormContainer>
                <h1>Edytowanie produktu</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label>Nazwa produktu</Form.Label>
                                <Form.Control

                                    type='name'
                                    placeholder='Nazwa'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='price'>
                                <Form.Label>Cena</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Cena'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group controlId='image'>
                                <Form.Label>Zdjęcie</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Zdjęcie'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>



                            </Form.Group>


                            <Form.Group controlId='brand'>
                                <Form.Label>Producent</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Producent'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='countinstock'>
                                <Form.Label>Ilość</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Ilość'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='category'>
                                <Form.Label>Kategoria główna</Form.Label>
                                <Form.Control
                                    as='select'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value=''></option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='subCategory'>
                                <Form.Label>Podkategoria 1 </Form.Label>
                                <Form.Control
                                    as='select'  
                                    value={subCategory}
                                    onChange={(e) => setSubCategory(e.target.value)}
                                >
                                    <option value=''></option>
                                    {subcategories.map(subcategory => (
                                    <option key={subcategory.id} value={subcategory.id}>
                                        {subcategory.name}
                                    </option>
                                    ))}
                                    
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='subSubCategory'>
                                <Form.Label>Podkategoria 2 </Form.Label>
                                <Form.Control
                                    as='select'  
                                    value={subSubCategory}
                                    onChange={(e) => setSubSubCategory(e.target.value)}
                                >
                                    <option value=''></option>
                                    {subsubcategories.map(cat => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                    
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label>Opis (edytor TODO)</Form.Label>
                                

                                    <textarea
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={12}
                                    cols={67}
                                    />
                                    
                                
                            </Form.Group>


                            <Button type='submit' variant='primary'>
                                Zapisz
                            </Button>

                        </Form>
                    )}

            </FormContainer >
        </div>

    )
}

export default AdminProductEditScreen