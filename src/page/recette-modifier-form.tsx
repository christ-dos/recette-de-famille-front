
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { TitreH2, TitreH5 } from "../components/children";
import { Form, Formulaire } from "../components/forms/form-recette";
import { FormGroupInputLabel, FormGroupInputSpan, InputSelect } from "../components/forms/InputsForm";
import Schema from "../components/forms/Schema-yup";
import IngredientLine from "../components/IngredientLine";
import StepPreparation from "../components/Step-preparation";
import styles from '../css/ajout-recette-page.module.css';
import { Ingredient } from "../models/Ingredient";
import { Recette } from "../models/recette";
import { RecetteIngredientId, RecettesIngredients, UniteMesureEnum } from "../models/RecetteIngredient";
import { getCategorieById } from "../services/CategorieService";
import { getAllIngredient } from "../services/IngredientService";
import { updateRecipe } from "../services/RecetteService";
import { difficultyOptions, categoriesOptions } from "../components/forms/InputsForm";
import { addNewLine, handleSearchTerm } from "../utils/fonctiosn-utils";


type Props = {
  recette: Recette
};

const RecetteEditForm: FunctionComponent<Props> = ({ recette }) => {

  const [recettesIngredients, setRecettesIngredients] = useState<RecettesIngredients[]>([]);
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
  const [count, setCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState<any>()
  const [preview, setPreview] = useState<string | undefined>()
  const [searchTerm, setSearchTerm] = useState("")
  const [form, setForm] = useState<Form>(Formulaire(recette));


  const { register, handleSubmit, formState: { errors }, formState } = useForm<Recette>({
    mode: 'onChange',
    resolver: yupResolver(Schema)
  });

  const { isSubmitted, isSubmitSuccessful } = formState


  useEffect(() => {
    getAllIngredient().then(allIngredients => setAllIngredients(allIngredients));
    setRecettesIngredients(recette.recettesIngredients)

  }, [recettesIngredients]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])


  function deleteLine(recetteIngredientId: RecetteIngredientId | undefined) {
    if (recettesIngredients.length > 1) {
      console.log("taille:" + recettesIngredients.length)

      const test = recettesIngredients.filter(recetteIngredient => (recetteIngredient.id?.ingredientId !== recetteIngredientId?.ingredientId)
        || recetteIngredient.id?.recetteId !== recetteIngredientId?.recetteId);
      console.table(test.map(ingredient => ingredient.ingredient));
      recettesIngredients.pop()
      setRecettesIngredients([...recettesIngredients])

    }
    console.log("id a supprimer", recetteIngredientId);
    console.log("click sur delete")
  }


  /*function getIngedientByName(name: string): Ingredient | undefined {
    const result = allIngredients.filter(x => x.name.toLowerCase() === name.toLowerCase())
    if (result) {
      return result[0];
    }
  }*/

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }
    setSelectedFile(e.target.files[0])
    setPreview(selectedFile)
  }

  /*const handleSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value.length > 2 ? (setSearchTerm(value)) : (setSearchTerm(""))
  }*/


  async function onSubmit(data: any) {
    console.log("datas:", data)

    if (selectedFile) {
      let blob = selectedFile.slice();

      let reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onload = function () {
        data.urlPicture = reader.result;
      }
    } else {
      data.urlPicture = form.urlPicture.value;
    }

    const resultCategorie = await getCategorieById(data.categorie);
    data.categorie = { id: resultCategorie.id, name: resultCategorie.name, urlPicture: resultCategorie.urlPicture }

    data.recettesIngredients.map((recIng: any) => {
      console.log(recIng.ingredient.name.toLowerCase())
      const ingredient = allIngredients.find(element => element.name === recIng.ingredient.name);
      if (ingredient) {
        const recetteIngredientId = { recetteId: data.id, ingredientId: ingredient?.id };
        recIng.ingredient = ingredient;
        recIng.id = recetteIngredientId;
      } else {
        const recetteIngredientId = { recetteId: data.id, ingredientId: 0 };
        recIng.id = recetteIngredientId;
      }
    });

    updateRecipe(data).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        console.log(response);
      }
    })
  }

  return (
    <>
      <TitreH2 titre={"Editer une Recette"} />
      {isSubmitSuccessful && <div className="alert alert-success mt-4">Recette mise à jour avec succés</div>}
      <form action="" onSubmit={handleSubmit(onSubmit)} className="border border-secundary shadow-lg">

        <main className="container" >
          <div className='row mx-4 my-2 pb-3 mt-3' style={{
            border: '1px 1px solidrgba(131,197,190,0.9)', backgroundColor: 'rgba(131,197,190,0.1)',
            boxShadow: '1px 1px 1px rgba(131,197,190,0.9)', borderRadius: '20px'
          }}>
            {/*************************** Titre *********************************/}
            <div className="d-flex justify-content-center">
              <div className="input-group-text  mt-5 w-50 ">
                <input type="text" hidden value={form.id.value} {...register("id")} />
                <span className="input-group-text me-1" id="inputGroup-sizing-default">Titre</span>
                <input type="text"
                  {...register("title")}
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  defaultValue={form.title.value}
                  id="title" />
              </div>
            </div>
            {<p className="text-danger d-flex justify-content-center">{errors.title?.message?.toString()}</p>}
            {/*************************** Choisir une image *********************************/}
            <div className="">
              <div className=" d-flex justify-content-center mt-3 mb-3" >
                <FormGroupInputLabel
                  register={register}
                  errors={errors}
                  type={"file"}
                  name={"urlPicture"}
                  id={"avatar"}
                  accept="image/png, image/jpeg"
                  onChange={onSelectFile}
                />
              </div>
              {<p className="text-danger d-flex justify-content-center">{errors.urlPicture?.message?.toString()}</p>}

              <div className=" d-flex justify-content-center mt-2">
                <figure >
                  <img className={styles.mystere}
                    src={selectedFile ? (preview) : (form.urlPicture.value)}
                    id="imgRecette" alt="image de la recette"
                    style={{ objectFit: 'cover' }} />
                </figure>
              </div>
            </div>
          </div>
        </main>
        <main className="container mt-4">
          <section className="row d-flex justify-content-center pt-3 px-2 mx-4 py-4 "
            style={{ backgroundColor: 'rgba(131,197,190,0.1)', boxShadow: '1px 1px 1px rgba(131,197,190,0.9)', border: '1px 1px solid rgba(131,197,190,0.9)', borderRadius: ' 20px' }}>
            <div className="col-12 col-md-12 col-lg-4 form-group d-flex flex-column justify-content-center ">

              {/************************** Infos Clefs (Selecteurs) ********************************/}
              <TitreH5
                titre={"Infos clés"}
                className={"custom-color-dore mb-3 ms-2"}
              />
              <InputSelect
                register={register}
                name={"difficultyLevel"}
                form={form}
                errors={errors?.difficultyLevel?.message?.toString}
                className={"form-select form-select-lg mb-3 w-50"}
                id={"difficultyLevel"}
                defaultValue={recette.difficultyLevel.toLowerCase()}
                array={difficultyOptions}
              />

              <InputSelect
                register={register}
                name={"categorie"}
                form={form}
                errors={errors?.categorie?.message?.toString}
                className={"form-select form-select-lg mb-3 w-50"}
                id={"categorie"}
                defaultValue={recette.categorie.id}
                array={categoriesOptions}
              />
              {/*************************** Les Durées *********************************/}
              <div className={styles.duree}>
                <TitreH5
                  titre={"Temps total"}
                  className={"custom-color-dore mb-3 ms-1"}
                />
                <FormGroupInputSpan
                  register={register}
                  errors={errors}
                  name={"totalTimePreparation"}
                  valeur={"Minutes"}
                  defaultValue={form.totalTimePreparation.value}
                  type="text"
                />
              </div>

              <div className={styles.duree}>
                <TitreH5
                  titre={"Temps de Préparation"}
                  className={"custom-color-dore mb-3 ms-1"}
                />
                <FormGroupInputSpan
                  register={register}
                  errors={errors}
                  name={"timePreparation"}
                  valeur={"Minutes"}
                  defaultValue={form.timePreparation.value}
                  type="text"
                />
              </div>

              <div className={styles.duree}>
                <TitreH5
                  titre={"Temps de cuisson"}
                  className={"custom-color-dore mb-3 ms-1"}
                />
                <FormGroupInputSpan
                  register={register}
                  errors={errors}
                  name={"cookingTime"}
                  valeur={"Minutes"}
                  defaultValue={form.cookingTime.value}
                  type="text"
                />
              </div>

              <div className={styles.duree}>
                <TitreH5
                  titre={"Temps de repos"}
                  className={"custom-color-dore mb-3 ms-1"}
                />
                <FormGroupInputSpan
                  register={register}
                  errors={errors}
                  name={"restTime"}
                  valeur={"Minutes"}
                  defaultValue={form.restTime.value}
                  type="text"
                />
              </div>

            </div>
            {/*************************** Le nombre de parts *********************************/}
            <div className="col-12 col-md-12 col-lg-7 ">
              <TitreH5
                titre={"Nombre de personnes"}
                className={"custom-color-dore mb-3 ms-1"}
              />
              <FormGroupInputSpan
                register={register}
                errors={errors}
                name={"numberOfPeople"}
                valeur={"Personne(s)"}
                defaultValue={form.numberOfPeople.value}
                type="text"
              />
              {/*************************** Les ingredients *********************************/}
              <TitreH5
                titre={"Ingrédients"}
                className={"custom-color-dore mt-4 ms-1"}
              />
              {recette.recettesIngredients.map((recettesIngredients, index) => (
                <IngredientLine
                  key={index}
                  name={'recettesIngredients'}
                  recettesIngredients={recettesIngredients}
                  click={() => deleteLine(recettesIngredients?.id)}
                  register={register}
                  index={index}
                  errors={errors}
                  searchTerm={searchTerm}
                  allIngredients={allIngredients}
                  handleSearchTerm={(e) => handleSearchTerm(e, setSearchTerm)} />
              ))}

              <Button className="mt-3 me-1"
                variant="secondary"
                type={"button"}
                onClick={() => addNewLine(recettesIngredients, setRecettesIngredients)}>
                +
              </Button>

            </div>

          </section>
        </main>
        <main className="container">
          {/*************************** Les étapes de préparations *********************************/}
          <section className="row">
            <StepPreparation register={register} name={"stepPreparation"} form={form} errors={errors} />
          </section>
        </main>
        <div className="d-flex justify-content-center mb-3">
          <Button className="mt-3 " variant="secondary" type={"submit"}>Valider</Button>
        </div>
      </form>

    </>
  );
}

export default RecetteEditForm;