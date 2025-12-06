import {db} from "../firebase/config.js"
import {ProductModel} from "../models/product.model.js"
import {collection, getDoc, getDocs, deleteDoc, updateDoc, addDoc} from "firebase/firestore"

const collectionName = "productos"

export const getAllProducts = async () => {
    const productsCol = collection(db, collectionName)
    const snashot = await getDocs(productsCol)

    if (snashot.empty) return []

    return snashot.docs.map( doc => new ProductModel({id: doc.id, ...doc.data()}))
}

export const getproductById = async () => {
    const docRef = collection(db, collectionName, id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists) return null

    return new ProductModel({id: doc.id, ...doc.data()})
}

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

export const deleteProduct = async (id) => {
    const docRef = collection(db, collectionName, id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists) return null

    await deleteDoc(docRef)

    return true
}

export const updateProduct = async (id, data) => {
    const docRef = collection(db, collectionName, id)

    const docSnap = await getDoc(docRef)

    if (!docSnap.exists) return null

    await updateDoc(docRef,data)

    return {id, ...docSnap.data(), ...data}
}
