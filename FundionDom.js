import { crearProv, OnListaPv, delProv, editProv, editarProv } from "./baseConect.js";


window.addEventListener('DOMContentLoaded', async () => {
    console.log("carga de ventana");

    // const ListaPv = await listaProveddores();
    // Pintarlista(ListaPv);
    // console.log(ListaPv);

    await OnListaPv((newList) => {
        Pintarlista(newList);
    })
});


///Fuenciones Crear
const btFcreaarPv = document.getElementById('BtnCrPv');
btFcreaarPv.addEventListener('click', () => {
    CrearPV();
});

function CrearPV() {
    const parDes = document.getElementById("DisCrPV");
    const parNom = document.getElementById("NombreCrPv");
    const parPre = document.getElementById("ValorCrPv");

    if (parDes.value, parNom.value, parPre.value) {
        console.log("hay datos");
        crearProv(parDes.value, parNom.value, parPre.value);

        parDes.value = "";
        parNom.value = "";
        parPre.value = "";
    } else {
        console.log("No hay datos");
    }

}

///Funiones Editar
const btFEditarPv = document.getElementById('BtnEdiPv');
btFEditarPv.addEventListener('click', () => {
    EditarPV();
});

function EditarPV() {
    const parID = document.getElementById("IdEdPV");
    const parDes = document.getElementById("DesEdPV");
    const parNom = document.getElementById("NombreEdPv");
    const parPre = document.getElementById("ValorEdPv");

    if (parDes.value, parNom.value, parPre.value) {
        console.log("hay datos");
        editarProv(parID.value, parDes.value, parNom.value, parPre.value);

    parDes.value = "";
    parNom.value = "";
    parPre.value = "";
    } else {
        console.log("No hay datos");
    }


}

///Funcion Pintar lista proveedores
async function Pintarlista(lista) {
    const tablaProv = document.getElementById('CuerpoTab');

    let htmlTabl = " ";

    await lista.forEach((doc) => {
        const data = doc.data();
        htmlTabl += `
                    <tr>
                        <th scope="row">##</th>
                        <td>${data.Nombre}</td>
                        <td>${data.DecriP}</td>
                        <td>${data.Precio}</td>
                        <td>
                            <button id=""BtnEdPv value="${doc.id}" type="button" class="BotEdiPv btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#EditarProv" onclick="">
                                <i class="bi bi-pencil-square" style="font-size: 20px; "></i>
                            </button>
                            <button id="BtnBrPv" value="${doc.id}" type="button" class="BotEliPv btn btn-primary" onclick="">
                                <i class="bi bi-trash-fill" style="font-size: 20px; "></i>
                            </button>
                        </td>
                    </tr>
        `
    });

    tablaProv.innerHTML = htmlTabl;

    const btnElimPv = tablaProv.querySelectorAll('.BotEliPv');
    eliminarPv(btnElimPv);


    const editPv = tablaProv.querySelectorAll('.BotEdiPv');
    editarPv(editPv)
}

function eliminarPv(params) {
    params.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log("Eliminar Proveedor");
            delProv(btn.value);
        });
    });
}

//Buscar datos Form provedores
function editarPv(params) {
    params.forEach(async btn => {
        btn.addEventListener('click', async (e) => {
            console.log("Editar Proveedor");

            try {
                console.log("Codigo: ", btn.value);
                const derEdPV = await editProv(btn.value)
                console.log("Salio de consulta editar");
                console.log(derEdPV.data());
                pintarEdit(btn.value, derEdPV.data());
            } catch (error) {
                console.log("Error consultando", error);
            }
        });
    });
}

//Cargar datos Form provedores
function pintarEdit(id, params) {
    const parID = document.getElementById("IdEdPV");
    const parDes = document.getElementById("DesEdPV");
    const parNom = document.getElementById("NombreEdPv");
    const parPre = document.getElementById("ValorEdPv");

    parID.value = id
    parDes.value = params.DecriP
    parNom.value = params.Nombre
    parPre.value = params.Precio
}