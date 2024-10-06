import { Projet } from "./projet";
export interface Employe {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  projets: Projet[];
}
