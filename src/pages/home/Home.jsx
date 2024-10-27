import Banner from "./banner/Banner";
import Collage from "./collage/Collage";
import HotOffer from "./hot offer/HotOffer";
import MedicalProducts from "./medical products/MedicalProducts";
import NewProducts from "./new products/NewProducts";
import Paths from "./paths/Paths";
import PopularProducts from "./popular products/PopularProducts";
import Products from "./products/Products";
import Statistics from "./stats/Statistics";
import UpcomingProducts from "./upcoming Products/UpcomingProducts";

const Home = () => {
    return (
        <div className="md:space-y-36 md:mb-20 space-y-14 mb-10">
            <Banner></Banner>
            <Paths></Paths>
            <Products></Products>
            <NewProducts></NewProducts>
            <Collage></Collage>
            <PopularProducts></PopularProducts>
            <HotOffer></HotOffer>
            <MedicalProducts></MedicalProducts>
            <Statistics></Statistics>
            <UpcomingProducts></UpcomingProducts>
        </div>
    );
};

export default Home;