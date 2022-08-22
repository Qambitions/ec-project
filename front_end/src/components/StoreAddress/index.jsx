export default function StoreAddress({ name, address, phone }) {
  return (
    <div>
      <h5>{name}</h5>
      <p>{address}</p>
      <p>{phone}</p>
    </div>
  );
}
