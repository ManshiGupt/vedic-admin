import axios from 'axios'
import { myServerUrl } from '../support/api-helper'

//getting all user data
export const getAllUser = async () => {

    try {

        return await axios.get(`${myServerUrl.url}/all-users`)

    } catch (error) {

        console.log('Error while calling get-all-users', error)

    }
}