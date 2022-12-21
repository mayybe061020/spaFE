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
          <th>Tên</th>
          <th className={"!text-center"}>Giới tính</th>
          <th className={"!text-center"}>Số điện thoại</th>
          <th className={"!text-center"}>Ngày sinh</th>
        </tr>
      </thead>
    </>
  );
};

export default ListHeaderTable;
