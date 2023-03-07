export default interface Player {
  id: string; 
  name: string;
  color: string;
  lifeCount: number; 
  active: boolean;
  winner ? : boolean;
}
