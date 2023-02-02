
import { click } from "@testing-library/user-event/dist/click";
import { FunctionComponent, MouseEventHandler } from "react";
import Pagination from 'react-bootstrap/Pagination';
import { Recette } from "../models/recette";
import { getAllRecette } from "../services/RecetteService";


type Props={
    nombrePage?: number,
    nombreTotaldePage?: number,
    click?:any
    
}
const PaginationComposant: FunctionComponent<Props> = ({click}) =>{
    
    let selected = 1;
    let items = [];

    const handleClickPagination = async (nombre:number): Promise<any> =>{
       const recettes: Recette[] = await getAllRecette();
       let totalPages = (await getAllRecette()).length;
       let itemsParPages = 9;
       console.log("total pages " + totalPages)
       }
    

       for (let page = 1; page <= 7; page++) {
        
        
        items.push(
            <Pagination.Item key={page} active={page === selected} onClick={()=>click(page)}>
                {page}
            </Pagination.Item>,
        );
        
    }
    return (

        <>
            <Pagination size="lg" className="d-flex justify-content-center mt-2">{items}</Pagination>
        </>

    )

}

export default PaginationComposant;