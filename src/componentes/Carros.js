import React from "react";

 export const Carros=()=>{
    return(
        <div className="row mt-5">
            <span>buscando</span>
             <Carrosres/>
        </div>
           
    );
 }
export const Carrosres=()=>{
    return(
        <div className="col-10 col-lg-4 mx-auto mb-5">
        <div className="card" style={{width:'18rem'}}>
            <img   className="card-img-top" />
            <div className="card-body">
                <h3 className="card-title text-uppercase">
                   Nombre
                </h3>
                <p className="card-text"></p>
                <p className="card-text fa fa-usd"></p><br></br>
               {/* <Link to='/Details' onClick={()=>value.handleDetail(id)} className="btn btn-primary">
                    Mas Info...
                </Link>
                <Link to='/Details' >
                    <button className="btn btn-primary" disabled={!loading}>Modificar</button>
    </Link>*/}
            </div>
        </div>
    </div>
    );
 }