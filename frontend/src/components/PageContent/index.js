import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import NavSide from "../NavSide";

const PageContent = ({ children }) => {
	const { isLogged } = useContext(UserContext);
	return (
		<div className='page-content relative h-full flex justify-end items-center'>
			{isLogged && (
				<div className='hidden lg:block fixed left-0 shadow-lg overflow-hidden rounded-r-2xl'>
					<NavSide></NavSide>
				</div>
			)}
			<div className='container mx-auto p-4'>{children}</div>
		</div>
	);
};

export default PageContent;
