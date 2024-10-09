import { Table } from "antd";
import { useRef, useState } from "react";
import { PATRON_PAGE_SIZE } from "../../utils/constants";
import categoriesCols from "./categoriesCols";
import { prepareCategoriesTableData } from "../Table/tableUtils";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllData } from "../../services/apiBooks";
import { LoadingOutlined } from '@ant-design/icons';
import { toast } from "react-hot-toast";
import { Flex, Spin } from 'antd';

const CategoriesTable = () => {
    const {
        data: samples,
        isLoading,
        error,
      } = useQuery({
        queryFn: () => getAllData()  ,
        queryKey: ["samples"],
      });

    // const handleError = () => {
    //     const { response } = error;
    //     toast.error(response?.data.message || "Opps, cannot perform this action");
    // }
    const searchInput = useRef(null);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const navigate = useNavigate();

    if (isLoading) {
        return <>
            <Flex className='flex justify-center' >
                <Spin className='' indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} />
            </Flex >
        </>
    }
    console.log(samples)

    const handleEdit = (id) => {
        navigate(`/category/${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Deleting patron with id: ${id} `);
    };

    const columns = categoriesCols(
        searchInput,
        searchText,
        setSearchText,
        searchedColumn,
        setSearchedColumn,
        handleEdit,
        handleDelete
    );
    // const emptyRowsCount = Math.max(
    //     0,
    //     PATRON_PAGE_SIZE - (categories.length % PATRON_PAGE_SIZE)
    // );
    // const dataWithEmptyRows = prepareCategoriesTableData(categories, emptyRowsCount);
    return (

        <>
            {
                console.log(samples)
            }
        
        {
        }

            {/* {
                isLoading ? (
                    <Flex className='flex justify-center' >
                        <Spin className='' indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} />
                    </Flex >
                ) : (

                    error ? (handleError()) : (
                        <Table
                            columns={columns}
                            dataSource={dataWithEmptyRows}
                            pagination={{
                                pageSize: PATRON_PAGE_SIZE,
                                showQuickJumper: true,
                            }}
                        />
                    )


                )
            } */}



        </>
        // <>

        // </>
    );
}

export default CategoriesTable