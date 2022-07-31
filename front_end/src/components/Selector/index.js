function ProvinceSelector(props) {
  var obj = props.obj;
  return <option value={obj.ProvinceID}>{obj.ProvinceName}</option>;
}

function DistrictSelector(props) {
  var obj = props.obj;
  return <option value={obj.DistrictID}>{obj.DistrictName}</option>;
}

function WardSelector(props) {
  var obj = props.obj;
  return <option value={obj.WardCode}>{obj.WardName}</option>;
}

export { ProvinceSelector, DistrictSelector, WardSelector };
