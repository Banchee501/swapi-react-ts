import { Helmet } from "react-helmet";

import PlanetsList from "../components/PlanetsList/PlanetsList";

const PlanetsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of our films"
                />
                <title>Planets page</title>
            </Helmet>
            <PlanetsList />
        </>
    )
}

export default PlanetsPage;