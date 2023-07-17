import {addDepartment,resetCreateCityForm,createCity,editRoute,deleteRoute,cargarDepartamentos,addPointInput,resetDepartmentsForm} from "../js/functions.js";
import {  $createDepartmentForm,
    $addPointBtn,
    $closeModalBtn1,
    $closeModalBtn2,
    } from "../js/domVars.js"


$addPointBtn.addEventListener("click", addPointInput);

$closeModalBtn1.addEventListener("click", resetDepartmentsForm);

$closeModalBtn2.addEventListener("click", resetDepartmentsForm);

document.addEventListener("click", resetCreateCityForm);


// API FETCH (GET)

document.addEventListener("DOMContentLoaded",cargarDepartamentos)

//Create Department (POST)

$createDepartmentForm.addEventListener("submit",addDepartment)

//Edit Route (PUT)

//document.addEventListener("click",editRoute)

//Delete Route (DELETE)

document.addEventListener("click",deleteRoute)

//Create City (POST)

document.addEventListener("click",createCity)

