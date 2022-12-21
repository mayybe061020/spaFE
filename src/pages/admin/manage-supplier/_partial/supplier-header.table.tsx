const SupplierHeaderTable = () => {
  return (
    <>
      <colgroup>
        <col className="w-14" />
        <col className="w-44" />
        <col className="w-32" />
        <col className="w-44" />
        <col />
      </colgroup>
      <thead className="bg-blue-600 text-sm">
        <tr>
          <th className="!py-2 !text-center !text-white">Thứ tự</th>
          <th className="!py-2 !text-center !text-white">Tên nhà cung ứng</th>
          <th className="!py-2 !text-center !text-white">Số điện thoại</th>
          <th className="!py-2 !text-center !text-white">Email</th>
          <th className="!py-2 !text-center !text-white">Địa chỉ</th>
        </tr>
      </thead>
    </>
  );
};

export default SupplierHeaderTable;
