export default function Selector(provinces){
    var obj = provinces.obj;
    return(
        <option>{`${obj.name}`}</option>
    )
}