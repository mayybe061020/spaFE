const CourseHeaderTable = () => {
  return (
    <>
      <colgroup>
        <col className={"w-14"} />
        <col className={"w-28"} />
        <col className={"w-44"} />
        <col />
        <col className={"w-20"} />
        <col className={"w-20"} />
        <col className={"w-28"} />
      </colgroup>
      <thead>
        <tr>
          <th className={"!text-center"}>No.</th>
          <th className={"!text-center"}>Hình ảnh</th>
          <th>Tên</th>
          <th>Miêu tả</th>
          <th className={"!text-center"}>Số lần sử dụng</th>
          <th className={"!text-center"}>Thời hạn</th>
          <th className={"!text-center"}>Giá</th>
        </tr>
      </thead>
    </>
  );
};

export default CourseHeaderTable;
