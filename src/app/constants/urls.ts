import {environment} from "../../environments/environment";

const {CAR_API, JPH_API} = environment;

const cars = `${CAR_API}/cars`
const users = `${JPH_API}/users`

const urls = {
  cars: {
    base: cars,
    byId: (id: number): string => `${cars}/${id}`
  },
  users: {
    base: users,
    byId: (id: number): string => `${users}/${id}`

  }
}

export {
  urls
}
