import CategorySection from "./categorySection"
import HeadSeaction from "./headSection"
import LatestSection from "./latestSection"
import StatisticSection from "./statsSection"


const Home = () => {
    return (
        <>
            <HeadSeaction />
            <LatestSection />
            <CategorySection />
            <StatisticSection />
        </>
    )
}

export default Home