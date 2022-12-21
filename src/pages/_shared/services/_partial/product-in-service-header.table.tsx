export default function ProductInServiceHeaderTable() {
  return (
    <>
      <colgroup>
        <col className={"w-14 border-r border-l"} />
        <col className={"w-24"} />
        <col />
        <col className={"w-20"} />
        <col className={"w-20"} />
        <col className={"w-28"} />
        <col className={"w-14 border-r"} />
      </colgroup>
      <thead>
        <tr className={'border-y'}>
          <th className="!text-center">No.</th>
          <th className="!text-center">Hình ảnh</th>
          <th className='!text-center'>Tên</th>
          <th className="!text-center">Liều lượng</th>
          <th className="!text-center">Đơn vị</th>
          <th className="!text-center">Sử dụng</th>
          <th></th>
        </tr>
      </thead>
    </>
  );
}
