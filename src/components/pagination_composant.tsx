
import { FunctionComponent, useEffect, useState } from "react";
import Pagination from 'react-bootstrap/Pagination';
import { getAllRecette } from "../services/RecetteService";
import '../css/pagination-composant.css'


type Props = {
    click?: any

}
const PaginationComposant: FunctionComponent<Props> = ({ click}) => {
    const [pagesTotal, setPagesTotal] = useState<any>(0);
    const [nombreItems, setNombreItems] = useState<any>();
    const [currentPage, setCurrentPage] = useState<any>(0);

    useEffect(() => {
        getAllRecette().then(data => setNombreItems(data.data.length));
        setPagesTotal(Math.ceil(+nombreItems / 6));


    }, [nombreItems]);

    


    let selected = currentPage;
    let items = [];



    for (let page = -1; page <= pagesTotal; page++) {

        if (page === -1) {
            items.push(<Pagination.Prev key={page} active={page === selected} onClick={() => {click(page) ;setCurrentPage(page)}} />)
        
        }
        else if (page <= 5 || (page > pagesTotal - 5) && (page < pagesTotal)) {
            items.push(
                <Pagination.Item className="ms-1 me-1" key={page} active={page === selected} onClick={() =>{click(page); setCurrentPage(page)}}>
                    {page + 1}
                </Pagination.Item>,
            );
        } else if (page === 6) {
            items.push(<Pagination.Ellipsis />);

        } else if (page === pagesTotal) {
            items.push(<Pagination.Next key={-2}  active={page === selected} onClick={() => {click(-2) ;setCurrentPage(pagesTotal)}} />)

        }
    

    }

    return (

        <>
            <Pagination  size="lg" className="d-flex justify-content-center mt-5" >{items}</Pagination>
        </>

    )

}

export default PaginationComposant;


