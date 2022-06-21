export default function StoreAddress(store){
    const obj = store.obj;

    return(
        <div>
            <h5>{`${obj.name}`}</h5>
            <p>{`${obj.address}`}</p>
            <p>{`${obj.phone}`}</p>
        </div>
    )
}