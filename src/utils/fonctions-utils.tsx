import { count } from "console";
import { ChangeEvent } from "react";
import { RecettesIngredients, UniteMesureEnum } from "../models/RecetteIngredient";

/****************** fonction Camelize qui transforme en CamelCase ************************/
export function camelize(titre: string) {
  const tab: string[] = titre.split(" ");
  return tab.map(word => word.replace((word.charAt(0)), () => word.charAt(0).toUpperCase())).join(" ")

}
/****************** fonction qui permet de rechercher par term ************************/
export const handleSearchTerm = (e: ChangeEvent<HTMLInputElement>, setSearchTerm: any) => {
  let value = e.target.value;
  value.length > 2 ? (setSearchTerm(value)) : (setSearchTerm(""))
}



