import { ChangeEvent } from "react";

/****************** fonction Camelize qui transforme en CamelCase ************************/
export function camelize(titre: string){
    const tab : string[] = titre.split(" ");
  return  tab.map(word=>word.replace((word.charAt(0)), ()=>word.charAt(0).toUpperCase())).join(" ")
    
  }

