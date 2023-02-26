
import { FunctionComponent, useEffect, useState } from "react";
import Pagination from 'react-bootstrap/Pagination';
import { getAllRecette } from "../services/RecetteService";
import '../css/pagination-composant.css'


type Props = {
    click?: any

}
const PaginationComposant: FunctionComponent<Props> = ({ click }) => {
    const [pagesTotal, setPagesTotal] = useState<number>(0);
    const [nombreItems, setNombreItems] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);

    useEffect(() => {
        getAllRecette().then(data => setNombreItems(data.data.length));
        setPagesTotal(Math.ceil(nombreItems / 6));
    }, [nombreItems]);

    let items = [];

   for (let page = -1; page <= pagesTotal; page++) {
        if (page === pagesTotal) {
            items.push(<Pagination.Next key={-2} active={page === currentPage} onClick={() => { click(-2); setCurrentPage(pagesTotal) }} />)
        } else if (page === -1) {
            items.push(<Pagination.Prev key={page} active={page === currentPage} onClick={() => { click(page); setCurrentPage(page) }} />)
        }
        else if (page <= 5 || (page > pagesTotal - 5) && (page < pagesTotal)) {
            items.push(
                <Pagination.Item className="ms-1 me-1" key={page} active={page === currentPage} onClick={() => { click(page); setCurrentPage(page) }}>
                    {page + 1}
                </Pagination.Item>,
            );
        } else if (page === 6) {
            items.push(<Pagination.Ellipsis />);
        }
    }

    return (
        <>
            <Pagination
                size="lg"
                className="d-flex justify-content-center mt-5"
            >{items}
            </Pagination>
        </>
    )
}

export default PaginationComposant;


