import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import PageContainer from "../../components/PageContainer";
import Card from "../../components/Card";
import Table from "../../components/Table";

const AllData = () => {
    const {userValues} = useContext(UserContext);
    const cols = [
        {
            header: "Name",
            accessor: "name"
        },
        {
            header: "Email",
            accessor: "email"
        },
        {
            header: "Password",
            accessor: "password"
        },
        {
            header: "Balance",
            accessor: "balance"
        },
        {
            header: "Logged In",
            accessor: "loggedin"
        }
    ]
    const data = userValues.users;
    return(
        <PageContainer>
            <Card title="All Data" compClass="w-full">
                <Table columns={cols} rows={data}/>
            </Card>
        </PageContainer>
    )
}

export default AllData;