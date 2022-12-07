const ListHeaderTable = () => {
  return (
    <>
      <colgroup>
        <col className={"w-14"} />
        <col />
        <col className={"w-24"} />
        <col className={"w-28"} />
        <col className={"w-32"} />
      </colgroup>

      <thead>
        <tr>
          <th className={"!text-center"}>No.</th>
          <th>Name</th>
          <th className={"!text-center"}>Gender</th>
          <th className={"!text-center"}>Phone</th>
          <th className={"!text-center"}>Date of Birth</th>
        </tr>
      </thead>
    </>
  );
};

export default ListHeaderTable;
