const HeaderTable = () => {
  return (
    <>
      <colgroup>
        <col className="w-14" />
        <col />
        <col className="w-40" />
        <col className="w-28" />
        <col className="w-32" />
        <col className="w-32" />
      </colgroup>
      <thead className="bg-blue-600 text-sm">
        <tr>
          <th className="!py-2 !text-center !text-white">ID</th>
          <th className="!py-2 !text-center !text-white">Khách Hàng</th>
          <th className="!py-2 !text-center !text-white">NV Sale</th>
          <th className="!py-2 !text-center !text-white">Trạng Thái</th>
          <th className="!py-2 !text-center !text-white">Thời Gian</th>
          <th className="!py-2 !text-center !text-white">Giá</th>
        </tr>
      </thead>
    </>
  );
};

export default HeaderTable;
