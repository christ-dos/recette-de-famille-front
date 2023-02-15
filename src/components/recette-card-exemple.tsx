import { FunctionComponent } from "react"
import { TitreH5 } from "./children";

const ExempleRecetteCard: FunctionComponent = () => {
    return (
        <main className="justify-content-center mt-4">
            <div  className=" col-12 col-md-10 col-lg-10 justify-content-center " >
                <div className="card mb-4 custom-bg-vert custom-shadow-card text-light scale">

                    <div className="row g-0">
                        <div className=" col-12 col-sm-6 image">
                            <img src='/images/calamars-a-la-portugaise.jpeg' className="img-fluid rounded-start " alt="image de la recette" />
                        </div>
                        <div className=" col-12 col-sm-6">
                            <div className="card-body text-light">
                                <TitreH5 titre="Calamars à la romaine" className="card-title overflow-elipsis" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    )

}

export default ExempleRecetteCard;