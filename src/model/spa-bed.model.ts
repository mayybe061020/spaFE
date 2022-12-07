export type SpaBedModel = {
  id: number;
  name: string;
}

export type SpaBedCreateEntity = Omit<SpaBedModel, "id">;

export type SpaBedUpdateEntity = SpaBedModel;
