//_____________________________________________________________________________________________
// Importacion de Modulos

    // BASE DE DATOS
    import {collection, 
            getDoc, 
            getDocs, 
            deleteDoc, 
            updateDoc, 
            addDoc,
            doc
        } from "firebase/firestore" 
    import {db} from "../firebase/config.js"
  
    // MODELO
    import {ProductModel} from "../models/product.model.js"
//_____________________________________________________________________________________________

// NOMBRE DE LA COLECCION DE DATOS (TABLA)
   const collectionName = "products"

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// INICIO DE CRUD

// OBTENER TODOS LOS PRODUCTOS
export const getProducts = async () => {
    const productsCol = collection(db, collectionName)
    const snashot = await getDocs(productsCol)
    if (snashot.empty) return []
    return snashot.docs.map( doc => new ProductModel({id: doc.id, ...doc.data()}))
}

// OBTENER UN PRODUCTO
export const getProduct = async (id) => {
    const docRef = doc(db, collectionName, id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) return null

    return new ProductModel({id: docSnap.id, ...docSnap.data()})
}

// CREAR UN PRODUCTO
export const createProduct = async (data) => {

    if (!data.descripcion || !data.precio ) {
        throw new Error("Datos obligatorios")
    }
    const productsCol = collection(db, collectionName)
    const docRef = await addDoc(productsCol,{
        nombre: data.nombre,
        precio: Number(data.precio),
        stock: Number(data.stock || 0),
        descripcion: data.descripcion || "",
        categoria: data.categoria || ""
    })

    
    return new ProductModel({id: docRef.id, ...data})
}

// ELIMINAR UN PRODUCTO
export const deleteProduct = async (id) => {
    const docRef = doc(db, collectionName, id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) return null
    
    const deleted = docSnap.data();

    await deleteDoc(docRef)

    return deleted
}

// ACTUALIZAR UN PRODUCTO
export const updateProduct = async (id, data) => {

    const docRef = doc(db, collectionName, id)

    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) return null

    const old = docSnap.data();

    const updated = {
        nombre: data.nombre || old.nombre,
        precio: Number(data.precio) || old.precio,
        stock: Number(data.stock || 0) || old.stock,
        descripcion: data.descripcion || old.descripcion,
        categoria: data.categoria || old.categoria
    };

    await updateDoc(docRef,updated)

    return {id, ...updated}
}

// FIN CRUD
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

