const ManagerHeaderTable = () => {
  return (
    <>
      <colgroup>
        <col className="w-14" />
        <col className="w-48" />
        <col className="w-40" />
        <col className="w-52" />
        <col />
      </colgroup>
      <thead className="bg-blue-600">
        <tr>
          <th className="!text-white">No.</th>
          <th className="!text-white">Tên</th>
          <th className="!text-white">SĐT</th>
          <th className="!text-white">Email</th>
          <th className="!text-white">Address</th>
        </tr>
      </thead>
    </>
  );
};

export default ManagerHeaderTable;
