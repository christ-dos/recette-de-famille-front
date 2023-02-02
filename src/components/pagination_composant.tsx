
import { FunctionComponent, MouseEventHandler } from "react";
import Pagination from 'react-bootstrap/Pagination';


type Props={
    numeroPage?: number,
    nombreTotaldePage?: number,
    //click: MouseEventHandler
}
const PaginationComposant: FunctionComponent<Props> = ({ }) =>{
    let selected = 1;
    let items = [];
    for (let page = 1; page <= 7; page++) {
        items.push(
            <Pagination.Item key={page} active={page === selected}>
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