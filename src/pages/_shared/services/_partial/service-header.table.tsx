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
          <th>Tên</th>
          <th className={"!text-center"}>Giá</th>
          <th>Miêu tả</th>
        </tr>
      </thead>
    </>
  );
};

export default ServiceHeaderTable;
