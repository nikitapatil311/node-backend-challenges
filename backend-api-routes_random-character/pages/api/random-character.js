import { Chance } from "chance";

const chance = new Chance();
const Character = {
  firstName: chance.first(),
  lastName: chance.last(),
  twitter: chance.twitter(),
};
export default function handler(request, response) {
  const obj = Character;
  response.status(200).json(obj);
}
