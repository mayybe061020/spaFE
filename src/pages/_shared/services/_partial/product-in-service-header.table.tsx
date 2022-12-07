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
          <th className="!text-center">Image</th>
          <th className='!text-center'>Name</th>
          <th className="!text-center">Dose</th>
          <th className="!text-center">Unit</th>
          <th className="!text-center">Uses</th>
          <th></th>
        </tr>
      </thead>
    </>
  );
}
