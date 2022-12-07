import { BasePriceModel } from "./_price.model";
import { ServiceModel } from "./service.model";

export interface CourseModel<serviceType extends number | ServiceModel = number>
  extends BasePriceModel {
  id: number;
  name: string;
  // the amount of time to use the course per purchase.
  timeOfUse: number;
  // expire in number of days.
  duration: number;
  image?: string;
  description: string;

  services: serviceType[];
}

export interface CourseCreateEntity<
  serviceType extends number | ServiceModel = number
> extends Omit<
    CourseModel<serviceType>,
    "id" | "image" | "discountStart" | "discountEnd"
  > {
  image?: File;
  discountStart?: Date | null;
  discountEnd?: Date | null;
}

export interface CourseUpdateEntity<
  serviceType extends number | ServiceModel = number
> extends Omit<
    CourseModel<serviceType>,
    "image" | "discountStart" | "discountEnd"
  > {
  image?: File | string;
  discountStart?: Date | null;
  discountEnd?: Date | null;
}
