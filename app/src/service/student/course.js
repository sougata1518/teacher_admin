import { privateAxios,publicAxios } from "../helper";


export const search_courses = (query,page=1) => {
    return publicAxios.get(`/search/${query}/${page}`).then(response=>response.data);
}

