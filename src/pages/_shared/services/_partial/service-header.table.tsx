const ServiceHeaderTable = () => {
  return (
    <>
      <colgroup>
        <col className={"w-14"} />
        <col className={"w-64"} />
        <col className={"w-32"} />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th className={"!text-center"}>Price</th>
          <th>Description</th>
        </tr>
      </thead>
    </>
  );
};

export default ServiceHeaderTable;
