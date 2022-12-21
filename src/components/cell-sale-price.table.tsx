import { FC, useEffect, useState } from "react";
import { Text } from "@mantine/core";
import { BasePriceModel } from "../model/_price.model";
import { formatPrice, isBetweenSale } from "../utilities/pricing.helper";

type cellProps = {
  priceModel: BasePriceModel;
  before?: JSX.Element;
  after?: JSX.Element;
};

type displayPriceType = {
  actualPrice: string;
  discountedFrom?: string;
  percentage?: number;
};

/**
 * TODO: calculate price based on date too.
 * @param priceModel
 * @param before
 * @param after
 * @constructor
 */
const SalePriceTableCell: FC<cellProps> = ({ priceModel, before, after }) => {
  const [displayPrice, setDisplayPrice] = useState<displayPriceType>({
    actualPrice: formatPrice(priceModel.price),
  });

  useEffect(() => {
    if (priceModel.discountPercent === null || !isBetweenSale(priceModel)) {
      // skip the process. The sale context is invalid
      // -> display price as not sale.
      setDisplayPrice({
        actualPrice: formatPrice(priceModel.price),
      });
      return;
    }

    setDisplayPrice({
      discountedFrom: formatPrice(priceModel.price),
      actualPrice: formatPrice(
        Math.round(
          (priceModel.price / 100) * (100 - priceModel.discountPercent)
        )
      ),
      percentage: priceModel.discountPercent,
    });
  }, [priceModel]);

  return (
    <div className="flex flex-col items-center justify-center space-y-1">
      {before}
      {displayPrice.percentage ? (
        <>
          <Text
            className={"leading-tight"}
            color={"dimmed"}
            strikethrough
            size={"xs"}
          >
            {displayPrice.discountedFrom}
          </Text>
          <Text>{displayPrice.actualPrice}</Text>
        </>
      ) : (
        <Text>{displayPrice.actualPrice}</Text>
      )}
      {after}
    </div>
  );
};

export default SalePriceTableCell;
