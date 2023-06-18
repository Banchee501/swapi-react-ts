import { useHttp } from "../hooks/http.hook";
import { Character, Film, Planet } from "../utils/types";

const useStarWarsService = () => {
    const { request, clearError, process, setProcess } = useHttp();

    const _apiBase = "https://swapi.dev/api/";

    const getAllCharacters = async (page: number): Promise<Character[]> => {
        const res = await request(`${_apiBase}people/?page=${page}`);
        return res.results.map((char: Character) => char);
    };

    const getCharacter = async (id: string): Promise<Character> => {
        const res = await request(`${_apiBase}people/${id}`);
        return res as Character;
    };

    const getCharacterTitle = async (charUrl: string): Promise<string> => {
        const res = await request(charUrl);
        return res.name;
    };

    const getCharacterByName = async (name: string): Promise<Character[]> => {
        const res = await request(`${_apiBase}people/?search=${name}`);
        return res.results.map((char: Character) => char);
    };

    const getAllFilms = async (page: number): Promise<Film[]> => {
        const res = await request(`${_apiBase}films/?page=${page}`);
        return res.results.map((film: Film) => film);
    };

    const getFilmTitle = async (filmUrl: string): Promise<Film> => {
        const res = await request(`${filmUrl}`);
        return res as Film;
    };

    const getFilmTitles = async (films: string[]): Promise<Film[]> => {
        const titles = await Promise.all(films.map(getFilmTitle));
        return titles.filter((title) => title !== null);
    };

    const getAllPlanets = async (page: number): Promise<Planet[]> => {
        const res = await request(`${_apiBase}planets/?page=${page}`);
        return res.results.map((planet: Planet) => planet);
    };

    const getPlanetTitle = async (planetUrl: string): Promise<string> => {
        const res = await request(planetUrl);
        return res.name;
    };

    const getPlanetTitles = async (planets: string[]): Promise<Planet[]> => {
        const titles = await Promise.all(planets.map(getPlanetTitle));
        return titles.filter((name) => name !== null).map((name) => ({ name })) as Planet[];
    };

    const getCount = async (link: string) => {
        const res = await request(`${_apiBase}${link}/`);
        return res.count;
    };

    return {
        clearError,
        process,
        setProcess,
        getAllCharacters,
        getCharacter,
        getCharacterTitle,
        getCharacterByName,
        getAllFilms,
        getFilmTitle,
        getFilmTitles,
        getPlanetTitle,
        getAllPlanets,
        getPlanetTitles,
        getCount
    };
};

export default useStarWarsService;
