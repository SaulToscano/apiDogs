import Card from './Card'
import React from "react";
import { connect } from "react-redux";
import { getDogs, getBDDogs } from '../Redux/actions/index'

var counter = false;

function List({ getDogs, getBDDogs }){
    var [page, setPage] = React.useState({page: 1});
    const [checked, setChecked] = React.useState({ascendent: true, descendent: false})
    const [filter, setFilter] = React.useState({temperament: false, breed: false, input_filter: ''})

    //funcion para cambiar la pagina de la lista
    function change_page(position){
        if(position !== "next" || position !== "back"){
            setPage({...page, page: position})
        }

        if(position === "next"){
            setPage({...page, page: (parseInt(page.page) + 1)})
        }else if(position === "back"){
            if(page !== 1){
                setPage({...page, page: (parseInt(page.page) - 1)})
            }
        }
    }

    //funcion para ajustar el valor de ascendente y descendente
    const change_checked = function (e) {
        if (e.target.id === "radio_ascendent") {
            setChecked({
            ...checked,
            ascendent: true,
            descendent: false,
          });
        } else if (e.target.id === "radio_descent") {
            setChecked({
            ...checked,
            ascendent: false,
            descendent: true,
          });
        }
    };

    //Funcion para seleccionar algun filtro por temperamento o raza
    const change_filter = function (e) {
        if(e.target.id === 'temperament_filter'){
            setFilter({...filter, temperament: e.target.checked})
        }else if(e.target.id === 'breed_filter'){
            setFilter({...filter, breed: e.target.checked})
        }

        if(e.target.id === 'input_filter'){
            setFilter({...filter, input_filter: e.target.value})
        }
    }

    if(!counter){
        counter = true;
        getDogs();
        getBDDogs();
    }

    return(
        <div>
            {/*Busqueda input y botones*/}
            <div className="List_SearchBar">
                <input type="text" id='input_filter' onChange={change_filter}/>
                <div>
                    <label htmlFor="radio_ascendent">Ascendente: </label>
                    <input type="radio" name='order' id="radio_ascendent" onClick={change_checked} defaultChecked="true"/>
                    <label htmlFor="radio_descent">Descendente: </label>
                    <input type="radio" name='order' id="radio_descent" onClick={change_checked}/>
                </div>
                <div>
                    <label htmlFor="temperament_filter">Temperament</label>
                    <input type="checkbox" name='filter' id='temperament_filter' onChange={change_filter}/>
                    <label htmlFor="breed_filter">Breed</label>
                    <input type="checkbox" name='filter' id='breed_filter' onChange={change_filter}/>
                </div>
            </div>
            {/*Cards*/}
            <div>
                <Card page={page.page} ascendent={checked.ascendent} descendent={checked.descendent} temperament={filter.temperament} breed={filter.breed} input_filter={filter.input_filter}/>
            </div>
            {/*cambio de pagina*/}
            <div>
                <label onClick={() => change_page("back")}>{"<Prev"}</label>
                <input type="text" value={page.page} onChange={(e) => {change_page(e.target.value)}}/>
                <label onClick={() => change_page("next")}>{"Next>"}</label>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(List);