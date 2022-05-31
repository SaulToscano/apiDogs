import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import img_default from '../pics/Dogs_Home.jpg'

import '../css/card.css'

function Card({dogs, page, ascendent, descendent, temperament, breed, input_filter}){
    let arr_api = []; //arreglo de los datos
    let navigate = useNavigate(); //para navegar entre paginas

    //funcion para entrar a los detalles del perro
    function dog_details(id){
        let path = `/Dog_List/${id}`;

        navigate(path);
    }

    //Funcion que acomoda el arreglo Ascendente o descendente
    function ArrSort(array) {
        function swap(arr, xp, yp) {
          var temp = arr[xp];
          arr[xp] = arr[yp];
          arr[yp] = temp;
        }
    
        if (ascendent) {
          for (let c = 0; c < array.length - 1; c++) {
            for (let i = 0; i < array.length - c - 1; i++) {
              let string1 = array[i].name;
              let string2 = array[i + 1].name;
              if (string1.localeCompare(string2) > 0) {
                swap(array, i, i + 1);
              }
            }
          }
        }
    
        if (descendent) {
          for (let c = 0; c < array.length - 1; c++) {
            for (let i = 0; i < array.length - c - 1; i++) {
              let string1 = array[i].name;
              let string2 = array[i + 1].name;
              if (string1.localeCompare(string2) < 0) {
                swap(array, i, i + 1);
              }
            }
          }
        }
    }

    //Funcion que filtra por temperameno o raza
    function ArrFilter(array){
        if(temperament){
            if(input_filter !== ''){
                let aux = []

                array.forEach(element => { //element = object
                    if(element.temperament.includes(input_filter)){
                        aux.push(element);
                    }
                });

                return aux;
            }
        }else if(breed){
            if(input_filter !== ''){
                let aux = []

                array.forEach(element => { //element = object
                    if(element.breed_group && element.breed_group.includes(input_filter)){
                        aux.push(element);
                    }
                });

                return aux;
            }
        }

        return array;
    }

    //Aplica las funciones de Acomodar y filtrar el arreglo
    if(dogs && dogs.apiDogs){
        ArrSort(dogs.apiDogs);
        arr_api = ArrFilter(dogs.apiDogs);
        console.log(arr_api);
    }
    
    return(
        <div>
            {/*perros de la DB*/}
            <div className="Card_Api_Main_Div">
                {dogs && dogs.dbDogs && dogs.dbDogs.map((dog, index) => {

                    if(index >= ((page - 1) * 5) && index < (page * 5)){
                        let height = dog.height.split('_');
                        let weight = dog.weight.split('_');

                        return(
                            <div key={index} className='Card_Style' onClick={() => {dog_details(`DB_${dog.id}`)}}>
                                <img src={img_default} alt="Default Image" />
                                <span>{dog.name}</span>
                                <br />
                                <span>Height</span>
                                <span>{height[0]} - {height[1]}</span>
                                <br />
                                <span>Weight</span>
                                <span>{weight[0]} - {weight[1]}</span>
                                <br />
                                <span>Life years</span>
                                <span>{dog.years}</span>
                            </div>
                        )
                    }
                })}
            </div>
            {/*Perros de la Api*/}
            <div className="Card_Api_Main_Div">
                {arr_api && arr_api.map((dog, index) => {
                    let temperament_list = '';
                    if(dog.temperament !== undefined){
                        let temperament = dog.temperament.split(", ")
                        temperament_list = temperament.map((t, index) => {
                            return <li key={index}>{t}</li>
                        })
                    }

                    if(index >= ((page - 1) * 8) && index < (page * 8)){
                        return(
                            <div key={index} className='Card_Style' onClick={() => {dog_details(dog.id)}}>
                                <img src={dog.image.url} alt="" />
                                <span>{dog.name}</span>
                                <br />
                                <span>Temperament</span>
                                <ul>{temperament_list}</ul>
                                <span>Weight</span>
                                <span>{dog.weight.metric}</span>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      dogs: state,
    };
};


export default connect(mapStateToProps)(Card);



