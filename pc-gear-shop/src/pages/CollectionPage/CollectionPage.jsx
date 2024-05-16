import React, { useState, useEffect } from "react"
import { WrapperProducts, WrapperDiv } from './style';
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import * as CollectionService from '../../services/CollectionService'
import CardComponent from '../../components/CardComponent/CardComponent';

const CollectionPage = () => {

    const navigate = useNavigate();
    const params = useParams();
    const collectionName = params.name;

    // const [isFetchGetCollection, setIsFetchGetCollection] = useState(false)

    const { data: collection } = useQuery({
        queryKey: ['getCollectionByName'],
        queryFn: () => {
            // setIsFetchGetCollection(false)
            return CollectionService.getByName(collectionName)
        }
        // enabled: isFetchDeleteCollection && !!deleteId
    })

    // useEffect(() => {
    //     if (collection) {
    //         if (collection.status === 'OK') {
    //             console.log(collection.data)
    //         }
    //     }
    // }, [collection])

    return (
        <WrapperDiv>
            <WrapperProducts>
                {collection?.data?.productList?.map(product => (
                    <CardComponent key={product.id} {...product} />
                ))}
            </WrapperProducts>
        </WrapperDiv>
    )
}

export default CollectionPage