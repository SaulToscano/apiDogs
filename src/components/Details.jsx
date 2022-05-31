import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogs, getBDDogs } from '../Redux/actions/index';

import '../css/details.css'

var counter = false;

function Details({ getDogs, getBDDogs, dogs }){
    const { id } = useParams();
    let arr_id = id.split('_')

    let dog = []; //variable del perro a mostrar

    if(!counter){
        counter = true;
        getDogs();
        getBDDogs();
    }

    //busca el perro por su id y añade sus datos en el arreglo
    if(dogs){
        if(arr_id[0] !== 'DB'){
            if(dogs.apiDogs){
                dogs.apiDogs.forEach(element => {
                    if(element.id === parseInt(arr_id[0])){
                        dog.push(element);
                        console.log(dog);
                        return;
                    }
                })
            }
        }else if (arr_id[0] === 'DB'){
            console.log('soy DB')
        }
    }

    return(
        <div>
            {dog && dog.map(dog => {
                let temperament_list = '';
                if(dog.temperament !== undefined){
                    let temperament = dog.temperament.split(", ")
                    temperament_list = temperament.map((t, index) => {
                        return <li key={index}>{t}</li>
                    })
                }

                return(
                    <div className="Detail_Main_Div">
                        <img src={dog.image.url} alt="" />
                        <span>{dog.name}</span>
                        <ul>{temperament_list}</ul>
                        <span>Altura:</span>
                        <span>{dog.height.metric}</span> {/*altura*/}
                        <br />
                        <span>Peso:</span>
                        <span>{dog.weight.metric}</span> {/*Peso*/}
                        <br />
                        <span>Años de vida</span>
                        <span>{dog.life_span}</span> {/*vida*/}
                    </div>
                )
            })}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      dogs: state,
    };
};
  
function mapDispatchToProps(dispatch) {
    return {
        getDogs: (dog) => dispatch(getDogs(dog)),
        getBDDogs: (dog) => dispatch(getBDDogs(dog)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);