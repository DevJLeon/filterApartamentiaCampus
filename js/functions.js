import {
  $createDepartmentForm,
  $routesContainer,
  $fragment,
  $routeTemplate,
  $addPointBtn,
  $createRouteInputs,
  $closeModalBtn1,
  $closeModalBtn2,
  URL,
  $createCityForm
} from "./domVars.js";

export function addPointInput(){
        const newPoint = document.createElement("div");
    
        newPoint.setAttribute("class","form-floating")
        newPoint.innerHTML = `
        <div class="form-floating">
            <input type="text" name="pointName" class="form-control" id="pointName" placeholder="Punto" required>
            <label for="floatingPassword">Punto</label>
        </div>
        `;
    
        $createRouteInputs.appendChild(newPoint);
};

export function resetPointsForm(){
    $createRouteInputs.innerHTML = `
    <div class="form-floating mb-3">
        <input type="text" name="routeName" class="form-control" id="routeName floatingInput-Route" placeholder="Ruta del Sol" required>
        <label for="floatingInput">Nombre ruta</label>
    </div>
    <div class="form-floating">
        <input type="text" name="pointName" class="form-control" id="pointName" placeholder="Punto" required>
        <label for="floatingPassword">Punto</label>
    </div>
    `
};



export async function cargarDepartamentos(){
    console.log("Está cargando la funcion")
    try{
        const resDepartamentos = fetch(`${URL}/Departamentos`);
        const resCiudades = fetch(`${URL}/Ciudades`);
    
        const [responseDepartamentos, responseCiudades] = await Promise.all([resDepartamentos, resCiudades]);
    
        const jsonDepartamentos = await responseDepartamentos.json();
        const jsonCiudades = await responseCiudades.json();
    
        const departamentos = jsonDepartamentos;
        const puntos = jsonCiudades;

        console.log(departamentos)
        console.log(puntos)

        departamentos.forEach(ruta => {
            let $clone = document.createElement("div"),
            $routeNodes = document.createElement("div"),
            $nodesTag = document.createElement("div"),
            $pointsUl = document.createElement("ul"),
            $botones = document.createElement("div"),
            $addCity = document.createElement("input")


            $clone.setAttribute("class","row-xl route");
            $routeNodes.setAttribute("class","route-nodes");
            $nodesTag.setAttribute("class","nodes-tag");
            $nodesTag.innerHTML="puntos:";
            $pointsUl.setAttribute("class","points-list")
            $botones.setAttribute("class","botones")
            $addCity.innerHTML="Añadir Ciudad"

            $routeNodes.appendChild($nodesTag)

            $clone.innerHTML=`
            <img class="route-icon" src="${ruta.bandera}" alt="">
            <div class="container route-info justify-content-center">
                <span class="route-title bold">Ruta:</span><br>
                <div class="route-name">${ruta.nomDepartamento}</div>
            </div>
            `

            puntos.forEach(ciudad =>{
                if (ciudad.departamentoId == ruta.id){
                    let nomPunto = ciudad.nomCiudad,
                    puntoLista = document.createElement("li");
                    puntoLista.innerHTML = nomPunto
                    $pointsUl.appendChild(puntoLista);
                }
            }) 

            $addCity.setAttribute("type","button")
            $addCity.setAttribute("data-id",`${ruta.id}`)
            $addCity.setAttribute("value","Añadir ciudad")
            $addCity.setAttribute("class","addCityBtn btn")
            $addCity.setAttribute("data-bs-toggle","modal")
            $addCity.setAttribute("data-bs-target","#addCityModal")

            $pointsUl.appendChild($addCity)

            $botones.innerHTML=`
                <input type="button" data-id="${ruta.id}" data-name="${ruta.nomDepartamento}" data-accion="Eliminar" value="Eliminar" class="delete btn-guardar bg-danger border-0 rounded bg-secondary px-2">
                <input type="button" data-id="${ruta.id}" data-bs-toggle="modal" data-bs-target="#modalModificar"  data-accion="Actualizar" value="Actualizar" class="edit btn-guardar bg-warning border-0 rounded bg-secondary px-2">
            `

            $routeNodes.appendChild($pointsUl)
            $clone.appendChild($routeNodes)
            $clone.appendChild($botones)


            
            
            $fragment.appendChild($clone);
        });
        $routesContainer.appendChild($fragment);
    } catch(err){
        alert(err)
        console.log(err)
    }

};

export async function addDepartment(e) {
    e.preventDefault();

    let departmentName = $createDepartmentForm.routeName.value,
    flagIcon = $createDepartmentForm.pointName.value;

     try{
        let optionsCity = {
            method:"POST",
            headers:{
                "Content-type":"application/json; chatset=utf-8"
            },
            body:JSON.stringify({
                nomDepartamento:departmentName,
                bandera:flagIcon
            })
        };
        fetch(`${URL}/Departamentos`,optionsCity);
        fetch(`${URL}/Ciudades`);
    }catch(error){
        console.log("Error del modal formulario: "+error)
    }
    $createDepartmentForm.reset();
}

export async function editRoute(e){
    if(e.target.matches(".edit")){
        console.log("Edit Button Working")
    }
}

export async function deleteRoute(e){
    if(e.target.matches(".delete")){
        console.log("Delete Button Working")
        const deleteId = e.target.getAttribute("data-id")
        console.log(deleteId)
        /* try{
            let optionsCity = {
                method:"DELETE",
                headers:{
                    "Content-type":"application/json; chatset=utf-8"
                },
                body:JSON.stringify({
                    nomDepartamento:departmentName,
                    bandera:flagIcon
                })
            };
            fetch(`${URL}/Departamentos/${deleteId}`,optionsCity);
            fetch(`${URL}/Ciudades`);
        }catch(error){
            console.log("Error del modal formulario: "+error)
        } */
        
    }
}

export function resetCreateCityForm(e){
    if(e.target.matches(".close-modal-btn")){
        const $createCityInputsDiv =$createCityForm.querySelector(".createCityInputs");
        $createCityInputsDiv.innerHTML = `
        <div class="form-floating mb-3">
            <input type="text" name="routeName" class="form-control" id="cityName floatingInput-City" placeholder="BucaraGod" required>
            <label for="routeName">Nombre Ciudad</label>
        </div>
        <div class="form-floating">
            <input type="text" name="cityPicture" class="form-control" id="cityPicture" placeholder="" required>
            <label for="cityPicture">Foto Ciudad</label>
        </div>
        `
    }

};

export async function createCity(e){
    if(e.target.matches(".addCityBtn")){
        console.log("CreateCity Button Working")
        const cityId = e.target.getAttribute("data-id")
        console.log(cityId)
        const $createCityInputsDiv =$createCityForm.querySelector(".createCityInputs")
        const $relatedCity = document.createElement("div")
        $relatedCity.setAttribute("class","form-floating")

        $relatedCity.innerHTML = `
        <input type="text" name="routeName" class="form-control" id="relatedCity" floatingInput-City" placeholder="BucaraGod" value="${cityId}" required disabled>
        <label for="routeName">Ciudad Relacionada</label>
        `

        $createCityInputsDiv.appendChild($relatedCity)
        
        /* try{
            let optionsCity = {
                method:"DELETE",
                headers:{
                    "Content-type":"application/json; chatset=utf-8"
                },
                body:JSON.stringify({
                    nomDepartamento:departmentName,
                    bandera:flagIcon
                })
            };
            fetch(`${URL}/Departamentos/${deleteId}`,optionsCity);
            fetch(`${URL}/Ciudades`);
        }catch(error){
            console.log("Error del modal formulario: "+error)
        } */
        
    }
}