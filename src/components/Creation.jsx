import React from "react";

import '../css/creation.css'

var dog = {} //datos de la raza creada

//funcion para la conexion http
async function PostData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response; // parses JSON response into native JavaScript objects
}

function Creation(){
    const [input, setInput] = React.useState({name: '', min_heigh: '', max_heigh: '', min_weight: '', max_weight: '', life_years: '' })
    const [temperament, setTemperament] = React.useState({});
    const [errors, setErrors] = React.useState({});

    let temp_arr = []; //temperamentos que se han agregado

    //insercion de datos al arreglo de temperamentos
    Object.values(temperament).forEach(val => temp_arr.push(val))
    temp_arr.push('');

    //funcion para cambiar la informacion de los temperamentos
    const temp_change = function(e){
        setTemperament({...temperament, [e.target.id]: e.target.value })
    }

    //funcion para cambiar los datos de la raza a crear
    const handleInput = function(e){
        if(e.target.value !== ''){
            if(errors.hasOwnProperty(e.target.name)){
                delete errors[e.target.name];
            }
        }

        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    //Funcion para preparar los datos a enviar
    function prepare_Dog(){
        let filter_temperament = [];

        Object.values(temperament).forEach(val => {if(val !== '') filter_temperament.push(val)})

        console.log(temperament)
        console.log(filter_temperament)
        
        dog = {
            name: input.name,
            height: `${input.min_heigh}_${input.max_heigh}`,
            weight: `${input.min_weight}_${input.max_weight}`,
            years: input.life_years,
            temperament: filter_temperament,
        }
    }

    //Funcion para validar los datos y que no tenga errores
    function validation(){
        let errors = {};
        let flag = false;

        if(input.name === '') {errors.name = 'Name is required'; flag = true};

        if(input.min_heigh === '') {errors.min_heigh = 'Min Heigh is required'; flag = true};

        if(input.max_heigh === '') {errors.max_heigh = 'Max Heigh is required'; flag = true};

        if(input.min_weight === '') {errors.min_weight = 'Min Weight is required'; flag = true};

        if(input.max_weight === '') {errors.max_weight = 'Max Weight is required'; flag = true};

        if(input.min_heigh >= input.max_heigh) {errors.heigh = "Min Heigh can't be higer than Max Heigh"; flag = true};

        if(input.min_weight >= input.max_weight) {errors.weight = "Min Weight can't be higer than Max Weight"; flag = true};

        setErrors({...errors});

        if(flag){
            return false
        }else{
            return true;
        }
    }

    return(
        <div>
            <form action="" className="form_style" onSubmit={(e) => {
                e.preventDefault();
                if(validation()){
                    prepare_Dog();
                    PostData(`https://api-dogs-saultoscano.herokuapp.com/dog`, dog)
                }else{
                    alert('Hubo algun error en la informacion')
                }
            }}>
                <div>
                    <label htmlFor="">Nombre: </label>
                    <input name="name" type="text" required onChange={handleInput}/>
                    {errors.name && (<p className="error">{errors.name}</p>)}
                </div>
                <br />
                <div className="altura_peso_div">
                    <div>
                        <label htmlFor="">Altura: </label>
                        <input name="min_heigh" type="text" required placeholder="Min" onChange={handleInput}/>
                        <input name="max_heigh" type="text" required placeholder="Max" onChange={handleInput}/>
                    </div>
                    {errors.min_heigh && (<p className="error">{errors.min_heigh}</p>)}
                    {errors.max_heigh && (<p className="error">{errors.max_heigh}</p>)}
                    {errors.heigh && (<p className="error">{errors.heigh}</p>)}
                </div>
                <br />
                <div className="altura_peso_div">
                    <div>
                        <label htmlFor="">Peso: </label>
                        <input name="min_weight" type="text" required placeholder="Min" onChange={handleInput}/>
                        <input name="max_weight" type="text" required placeholder="Max" onChange={handleInput}/>
                    </div>
                    {errors.min_weight && (<p className="error">{errors.min_weight}</p>)}
                    {errors.max_weight && (<p className="error">{errors.max_weight}</p>)}
                    {errors.weight && (<p className="error">{errors.weight}</p>)}
                </div>
                <br />
                <div>
                    <label htmlFor="">Años de vida: </label>
                    <input name="life_years" type="text" onChange={handleInput}/>
                </div>
                <br />
                <div>
                    {temp_arr && temp_arr.map((val, index) => {

                        if(val !== '' || index === 0 || index === temp_arr.length - 1){
                            return(
                                <input key={index} id={index} placeholder="Temperamentos..." type="text" onChange={temp_change} value={temperament[index]}/>
                            )
                        }
                    })}
                </div>
                <br />
                <button onClick={() => {console.log(input)}}>Create Breed</button>
            </form>
        </div>
    )
}

export default Creation;