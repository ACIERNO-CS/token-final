import coin from "./fetch/coin"
import { useQuery } from "@tanstack/react-query"
import { Card, CardTitle, CardBody, CardSubtitle, Spinner, Button } from 'react-bootstrap'
import { useContext } from "react";
import { isMobileContext } from "./context";

export function Token({ token }) {
    const { name, tag } = token
    const { isMobile } = useContext(isMobileContext);
    
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: [`token_${name}`], 
        queryFn: () => coin.searchTokens(name.toLowerCase()),
        staleTime: 30 * 60000, // 30 minutes
        
    })
    console.log(isMobile);
    
    return <Card className={`${isMobile? 'col-8' : 'col-5'} mx-auto my-4`}>
        <CardTitle>{name}</CardTitle>
        <CardSubtitle>{tag}</CardSubtitle>
        <CardBody>{
            (isLoading)? <div ><Spinner animation="grow" role="status"/> Loading...</div> :
            (error)? <div>ERROR: {error.message}</div> :
            <div>
                <h5>${data.market_data.current_price.usd}</h5>
                <small className={data.market_data.price_change_24h > 0? 'text-success' : 'text-danger'}>
                    <i class={`bi bi-arrow-${data.market_data.price_change_24h > 0? 'up' : 'down'}-circle p-1`} /> 
                    {Math.abs(data.market_data.price_change_24h_in_currency.usd)}
                </small>
            </div>
        }</CardBody>
        <CardSubtitle>
            <Button className="w-100" onClick={refetch}><i class="bi bi-arrow-clockwise" /> Refresh</Button>
        </CardSubtitle>
    </Card>
}