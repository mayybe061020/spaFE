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
          <th className={"!text-center"}>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th className={"!text-center"}>Time of Use</th>
          <th className={"!text-center"}>Expire</th>
          <th className={"!text-center"}>Price</th>
        </tr>
      </thead>
    </>
  );
};

export default CourseHeaderTable;
