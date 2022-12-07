const ProductHeaderTable = () => {
  return (
    <>
      <colgroup>
        <col className="w-14" />
        <col className="w-32" />
        <col />
        <col className="w-32" />
        <col className="w-28" />
        <col className="w-32" />
      </colgroup>

      <thead className="font-semibold">
        <tr>
          <th className={"p-2 !text-center"}>No.</th>
          <th className={"p-2 !text-center"}>Ảnh</th>
          <th className={"py-2 pr-2"}>Tên sản phẩm</th>
          <th className={"p-2"}>Liều Lượng</th>
          <th className={"p-2 !text-center"}>Giá</th>
          <th className={"p-2 !text-center"}>Đ/V Cung Ứng</th>
        </tr>
      </thead>
    </>
  );
};

export default ProductHeaderTable;
