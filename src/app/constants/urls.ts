import {environment} from "../../environments/environment";

const {API} = environment;

const auth = `${API}/auth`
const cars = `${API}/cars`

const urls = {
  auth: {
    login: auth,
    refresh: `${auth}/refresh`,
    me: `${auth}/me`,
  },
  cars
}

export {
  urls
}
