// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
// Base de fire Strore
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js"
// Base en teimepo real
import { } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCUNekKCAci9fgnpQ45MOsPaIO12SuQmz4",
    authDomain: "pruebaauditoria-27275.firebaseapp.com",
    projectId: "pruebaauditoria-27275",
    storageBucket: "pruebaauditoria-27275.appspot.com",
    messagingSenderId: "110528506682",
    appId: "1:110528506682:web:2d6177ce59f8037f03be03"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const dB = getFirestore();



export const crearProv = async (desc, name, prec) => {
    console.log("entra a la funcion Crear");
    console.log(desc, name, prec);
    // la "collection" conoexcion a la colecion como la base de datos listado
    //Conexcion a la base de dato "dB"
    //el nombre de la colecion donde vamos a guardar

    try {
        const docRef = await addDoc(collection(dB, "Product"), {
            DecriP: desc,
            Nombre: name,
            Precio: prec
        });
        console.log("Producto Creando with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding ProductoXXX: ", e);
    }
}

export const editarProv = async (id, desc, name, prec) => {
    console.log("entra a la funcion Editar");
    console.log(desc, name, prec);
    // la "collection" conoexcion a la colecion como la base de datos listado
    //Conexcion a la base de dato "dB"
    //el nombre de la colecion donde vamos a guardar

    try {
        const docRef = await updateDoc(doc(dB, "Product", id), {
            DecriP: desc,
            Nombre: name,
            Precio: prec
        });
        console.log("Proveedor Editando with ID: ", id);
    } catch (e) {
        console.error("Error Esitando ProductoXXX: ", e);
    }
}


///Lista Provedores con movimiento
export const OnListaPv = async (callback) => {
    console.log("Actualizando Producto");
    await onSnapshot(collection(dB, "Product"), callback);
}

///eliminar Proveedor
export const delProv = (id) => {
    console.log("Eliminando Proveedores");
    console.log(id);
    deleteDoc(doc(dB, "Product", id));
}

///Consulta a Editar Proveedor
export const editProv = async (id) => {
    console.log("Consultando Edicion Producto");
    const editDat = await getDoc(doc(dB, "Product", id));
    return editDat
}



