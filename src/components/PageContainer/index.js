import useUrlApi from "../../hooks/useUrlApi";
import loadingIcon from "../../assets/loading200px.svg";
import errorImg from "../../assets/david-ress-lvowu4IK6Mc-unsplash.jpg";
import NavSide from "../NavSide";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const PageContainer = ({children}) => {
    const [imgState, setNewUrl] = useUrlApi("https://source.unsplash.com/1920x1080/?architecture", "");
    const {userValues} = useContext(UserContext);
    return(
        <>
            <div className="home bg-no-repeat bg-center w-full h-full absolute top-0 -z-10 flex justify-center items-center">
                {imgState.isLoading && !imgState.isError ? <img src={loadingIcon} alt="Loading" className="w-12"/> : <img src={imgState.data} alt="Architecture Image" className="absolute h-full w-full top-0 object-cover z-0" />}
                {imgState.isError && <img src={errorImg} className="absolute h-full w-full top-0 object-cover z-0"></img>}
            </div>
            <div className="page-content relative h-full flex justify-end items-center bg-white bg-opacity-25">
                {userValues.isLogged && <NavSide></NavSide>}
                <div className="container mx-auto p-4">
                    {children}
                </div>
            </div>
        </>
    )
}

export default PageContainer;